<template>
  <div class="app-container">
    <!-- 搜索表单 Start -->
    <el-form :inline="true" label-width="68px">
      <el-form-item>
        <el-input v-model="queryParams.username" placeholder="请输入用户名称" size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="queryParams.phoneNum" placeholder="请输入手机号码" size="small" @keyup.enter.native="handleQuery"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="queryParams.status" placeholder="用户状态" size="small" @keyup.enter.native="handleQuery">
          <el-option
            v-for="dict in 4"
            :key="dict"
            :value="dict"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 搜索表单 End -->

  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      queryParams: {
        username: '',
        phoneNum: '',
        status: ''
      }
    }
  },
  methods: {
    handleQuery() {

    }
  }
}
</script>

<style scoped>

</style>