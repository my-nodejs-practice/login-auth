<template>
  <div class="home">
    <Welcome :name="username"></Welcome>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue';
import { getUserInfo } from '@/api';
export default {
  name: 'Home',
  components: {
    Welcome
  },
  data() {
    return {
      username: ''
    };
  },
  async created() {
    const userInfo = await getUserInfo();
    this.username = userInfo.data.username;
  }
};
</script>
