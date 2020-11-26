<template>
  <div class="login-form-wrap">
    <el-form ref="loginForm" v-model="form" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <input type="text" placeholder="请输入用户名" v-model="form.username" />
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <input type="password" placeholder="请输入密码" v-model="form.password" />
      </el-form-item>
      <el-form-item prop="password">
        <button type="primary">登录</button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
