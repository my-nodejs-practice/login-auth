<template>
  <div class="login-form-wrap">
    <el-form ref="loginForm" :model="form" :rules="rules" status-icon class="form">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          show-password
          @keypress.native.enter="submit"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
        <!-- <el-button type="text"></el-button> -->
        <el-link
          type="primary"
          href="https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoaclfbe25fhhtdsutf&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http%3A%2F%2F127.0.0.1%3A3001%2Foauth%2Fredirect"
        >
          使用钉钉登录
        </el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/index';
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
      }
    };
  },
  // mounted () {
  //   console.log(this.$router);;
  // },
  methods: {
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          login(this.form).then(res => {
            console.log('[res]', res.data);
            this.$router.push('home');
          });
        }
      });
    }
  }
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
