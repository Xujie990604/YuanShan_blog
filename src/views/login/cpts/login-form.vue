<template>
  <div class="login-form">
    <!-- 欢迎语 -->
    <FormWelcome />
    <!-- 登录表单 -->
    <!-- TODO: 后续新增手机验证码登录 -->
    <FromAccountType ref="formAccountRef" />
    <!-- 登录按钮 -->
    <FormSubmit @login="login" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import FormWelcome from './form-welcome.vue'
  import FormSubmit from './form-submit.vue'
  import FromAccountType from './form-account-type.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  // 获取账号登录组件的 ref
  const formAccountRef = ref(null)

  // 登录事件
  const login = () => {
    formAccountRef.value.accountFromRef.validate((valid: any) => {
      // 表单数据验证失败
      if (!valid) {
        return
      }
      // 表单数据验证成功
      router.push('home')
    })
  }
</script>

<style scoped lang="scss">
  .login-form {
    width: 400px;
    height: 300px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 6px 6px 0 0;
  }
</style>
