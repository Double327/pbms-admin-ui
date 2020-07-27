<template>
	<div class="app-container">
		<!-- 搜索条件 -->
		<el-form :inline="true">
			<el-form-item label="菜单名称">
				<el-input
						v-model="queryParams.name"
						placeholder="请输入菜单名称"
						clearable
						size="small"
						@keyup.enter.native="getList"
				/>
			</el-form-item>

			<el-form-item>
				<el-button
						type="primary"
						icon="el-icon-search"
						@click="handleQuery"
				>搜索
				</el-button>
			</el-form-item>
		</el-form>

		<!-- 数据展示 -->
		<el-table
				v-loading="loading"
				:data="menuList"
				row-key="id"
				:tree-props="{children: 'children', hasChildren: 'hasChildren'}"
		>
			<el-table-column
					prop="name"
					label="菜单名称"
					:show-overflow-tooltip="true"
					width="160"
			>
			</el-table-column>

			<el-table-column
					prop="icon"
					label="图标"
					align="center"
					width="100"
			>
				<template slot-scope="scope">
					<svg-icon :icon-class="scope.row.icon"></svg-icon>
				</template>
			</el-table-column>

			<el-table-column
					prop="orderNum"
					label="排序"
					width="60"
			></el-table-column>

			<el-table-column
					prop="perms"
					label="权限标识"
					:show-overflow-tooltip="true"
			></el-table-column>

			<el-table-column
					prop="component"
					label="组件路径"
					:show-overflow-tooltip="true"
			></el-table-column>

			<el-table-column
					prop="status"
					label="状态"
			></el-table-column>

			<el-table-column
					prop="createTime"
					label="创建时间"
			></el-table-column>

			<el-table-column
					label="操作"
					align="center"
			>
				<template slot-scope="scope">
					<el-button
							size="mini"
							type="text"
							icon="el-icon-edit"
							@click="handleUpdate(scope.row)"
					>修改
					</el-button>

					<el-button
							size="mini"
							type="text"
							icon="el-icon-plus"
							@click="handleAdd(scope.row)"
					>新增
					</el-button>

					<el-button
							size="mini"
							type="text"
							icon="el-icon-delete"
							@click="handleDelete(scope.row)"
					>删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-row>
					<el-col :span="24">
						<el-form-item label="上级菜单">
							<treeselect
									v-model="form.parentId"
									:options="menuOptions"
									:normalizer="normalizer"
									:show-count="true"
									placeholder="选择上级菜单"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="菜单类型" prop="menuType">
							<el-radio-group v-model="form.menuType">
								<el-radio label="M">目录</el-radio>
								<el-radio label="C">菜单</el-radio>
								<el-radio label="F">按钮</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item v-if="form.menuType !== 'F'" label="菜单图标">
							<el-popover
									placement="bottom-start"
									width="460"
									trigger="click"
									@show="$refs['iconSelect'].reset()"
							>
								<IconSelect ref="iconSelect" @selected="selected"/>
								<el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
									<svg-icon
											v-if="form.icon"
											slot="prefix"
											:icon-class="form.icon"
											class="el-input__icon"
											style="height: 32px;width: 16px;"
									/>
									<i v-else slot="prefix" class="el-icon-search el-input__icon"/>
								</el-input>
							</el-popover>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="菜单名称" prop="menuName">
							<el-input v-model="form.name" placeholder="请输入菜单名称"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="显示排序" prop="orderNum">
							<el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item v-if="form.menuType !== 'F'" label="是否外链">
							<el-radio-group v-model="form.isFrame">
								<el-radio label="0">是</el-radio>
								<el-radio label="1">否</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item v-if="form.menuType !== 'F'" label="路由地址" prop="path">
							<el-input v-model="form.path" placeholder="请输入路由地址"/>
						</el-form-item>
					</el-col>
					<el-col :span="12" v-if="form.menuType === 'C'">
						<el-form-item label="组件路径" prop="component">
							<el-input v-model="form.component" placeholder="请输入组件路径"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item v-if="form.menuType !== 'M'" label="权限标识">
							<el-input v-model="form.perms" placeholder="请权限标识" maxlength="50"/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item v-if="form.menuType !== 'F'" label="显示状态">
							<el-radio-group v-model="form.visible">
								<el-radio label="0">显示</el-radio>
								<el-radio label="1">隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item v-if="form.menuType !== 'F'" label="菜单状态">
							<el-radio-group v-model="form.status">
								<el-radio label="0">正常</el-radio>
								<el-radio label="1">禁用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
    import {addMenu, deleteMenu, getMenuInfo, getMenuList} from "@/api/system/menu";
    import IconSelect from '@/components/IconSelect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import Treeselect from '@riophae/vue-treeselect';

    export default {
        name: "index",
        created() {
            this.getList();
        },
        components: {
            IconSelect,
            Treeselect
        },
        data() {
            return {
                loading: true,
                menuList: [],
                menuOptions: [],
                title: "",
                open: false,
                visibleOptions: [],
                statusOptions: [],
                queryParams: {
                    name: undefined,
                    visible: undefined,
                    status: undefined
                },
                form: {
                    id: undefined,
                    name: '',
                    parentId: 0,
                    menuType: '',
                    icon: '',
                    isFrame: false,
                    perms: '',
                    path: '',
                    orderNum: undefined,
                    visible: "0",
                    status: "0"
                },
                rules: {
                    name: [
                        {required: true, message: "菜单名称不能为空", trigger: "blur"}
                    ],
                    orderNum: [
                        {required: true, message: "菜单顺序不能为空", trigger: "blur"}
                    ],
                    path: [
                        {required: true, message: "路由地址不能为空", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            /** 转换菜单数据结构 */
            normalizer(node) {
                if (node.children && !node.children.length) {
                    delete node.children;
                }
                return {
                    id: node.id,
                    label: node.name,
                    children: node.children
                };
            },
            getTreeselect() {
                getMenuList().then(res => {
                    this.menuOptions = [];
                    const menu = {id: 0, name: '主类目', children: []};
                    menu.children = this.handleTree(res.data, 'id');
                    this.menuOptions.push(menu);

                });
            },
            /**
             *  图标选择
             */
            selected(name) {
                this.form.icon = name;
            },
            /**
             * 查询菜单列表
             */
            getList() {
                this.loading = true;
                getMenuList(this.queryParams).then(res => {
                    this.menuList = res.data;
                    this.loading = false;
                })
            },
            /**
             * 条件查询
             */
            handleQuery() {
                this.getList();
            },
            /**
             * 菜单信息更新
             * @param menu 菜单信息
             */
            handleUpdate(menu) {
                this.reset();
                this.getTreeselect();
                getMenuInfo(menu.id).then(res => {
                    this.form = res.data;
                    this.open = true;
                    this.title = '修改菜单信息';
                })
            },
            /**
             * 菜单信息添加
             * @param menu 菜单信息
             */
            handleAdd(menu) {
                this.reset();
                this.getTreeselect();
                this.form.parentId = menu.id;
                this.title = '新建菜单';
                this.open = true;
            },
            /**
             * 菜单信息删除
             * @param menu 菜单信息
             */
            handleDelete(menu) {
                this.$confirm('此操作将永久删除该菜单,是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteMenu(menu).then(res => {
                        if (res.code === 200) {
                            this.msgSuccess('删除成功!')
                        }
                    }).catch(error => {
                        this.msgError(error);
                    });
                })
            },
            /**
             * 提交表单对话框
             */
            submitForm() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.form.id !== undefined) {
                            console.log("菜单更新未完成")
                        } else {
                            addMenu(this.form).then(res => {
                                if (res.code === 200) {
                                    this.msgSuccess('新增成功!');
                                    this.open = false;
                                }
                            }).catch(error => {
                                this.msgError(error);
                            });
                        }
                    }
                })
            },
            /**
             * 关闭表单对话框
             */
            cancel() {
                this.open = false;
            },
            /**
             * 表单信息重置
             */
            reset() {
                this.form = {
                    id: undefined,
                    parentId: 0,
                    name: undefined,
                    icon: undefined,
                    menuType: "M",
                    perms: '',
                    path: '',
                    isFrame: "1",
                    visible: "0",
                    orderNum: undefined,
                    status: "0",
                }
            }
        }
    }
</script>

<style scoped>

</style>