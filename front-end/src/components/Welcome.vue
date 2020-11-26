<template>
  <h1>Welcome，{{ name }}!</h1>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'lizhigao',
    },
  },
};
</script>

<style lang="scss" scoped></style>
