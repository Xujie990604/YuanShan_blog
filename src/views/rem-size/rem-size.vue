<template>
  <div class="a"></div>
  <div class="b"></div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
</script>

<style scoped lang="scss">
  .a {
    width: 1080rem;
    height: 10px;
    background-color: red;
  }

  .b {
    width: 540rem;
    height: 10px;
    margin-top: 10px;
    background-color: yellow;
  }
</style>
