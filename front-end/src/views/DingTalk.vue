<template>
  <div style="text-align: center; font-size: 14px; margin-top: 100px">登录中...</div>
</template>

<script>
import { setToken } from '@/utils/index';
export default {
  beforeCreate() {
    let { token } = this.$route.query;
    if (token) {
      setToken(token);
      // this.$store.dispatch('user/loginByDingtalk', this.$route.params);
      this.$message.success('登录成功！');
      // 跳到首页。
      this.$router.push('home');
    } else {
      // 无权限
      this.$router.push('/401');
    }
  }
};
</script>
