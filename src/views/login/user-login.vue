<template>
  <div class="user-login">
    <!-- 用户的登录表单 -->
    <loginForm></loginForm>
  </div>
</template>

<script lang="ts" setup>
import loginForm from './cpts/login-form.vue'
</script>

<style scoped lang="scss">
/* 登录页面 */
.user-login {
  position: relative;
  height: 100vh;
  background-image: url('../../assets/img/login_bg.jpg');
  background-repeat: no-repeat;

  // 登录表单
  .login-form {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
