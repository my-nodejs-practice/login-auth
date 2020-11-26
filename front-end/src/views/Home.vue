<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Welcome :name="username"></Welcome>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue';

export default {
  name: 'Home',
  components: {
    Welcome,
  },
  data() {
    return {
      username: 'lizhigao',
    };
  },
};
</script>
