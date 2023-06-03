<template>
  <el-button
    class="form-submit"
    @click="loginAction"
    type="primary"
    >登录
  </el-button>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['login'])

  // 登录方法
  const loginAction = () => {
    emit('login')
  }
</script>

<style scoped lang="scss">
  .form-submit {
    width: 300px;
    margin-left: 50px;
  }
</style>
