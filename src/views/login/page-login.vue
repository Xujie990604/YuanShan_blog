<template>
  <div class="page-login">
    <!-- 登录页面的表单组件 -->
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
  import LoginForm from './cpts/login-form.vue'
</script>

<style scoped lang="scss">
  .page-login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-image: url('@/assets/images/login-bg.svg');
  }
</style>
