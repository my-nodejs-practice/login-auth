<template>
  <div class="login-form-wrap">
    <el-form ref="loginForm" :model="form" :rules="rules" status-icon class="form">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
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
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.loginForm.validate(valid => {
        console.log(this.form);
        if (valid) {
          console.log(this.form);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    margin-top: 20vh;
    width: 400px;
    .el-button {
      width: 100%;
    }
  }
}
</style>
