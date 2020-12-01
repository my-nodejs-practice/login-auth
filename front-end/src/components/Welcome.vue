<template>
  <h1>欢迎登录，{{ name }}!</h1>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped></style>
