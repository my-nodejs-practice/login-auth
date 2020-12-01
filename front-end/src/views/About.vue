<template>
  <div class="about">
    <h3>关于{{ username }}</h3>
    <div v-if="username">
      <p><strong>年龄：</strong>{{ age }}</p>
      <p><strong>职业：</strong>{{ job }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getUserInfo } from '@/api';
export default {
  name: 'About',
  data() {
    return {
      username: '',
      age: '',
      job: ''
    };
  },
  async created() {
    const userInfo = await getUserInfo();
    // console.log('[userInfo]', userInfo);
    this.username = userInfo.data.username;
    this.age = userInfo.data.age;
    this.job = userInfo.data.job;
  }
};
</script>
