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
  import { userLogin } from '@/service/login/index'
  import { ElMessage } from 'element-plus'

  const router = useRouter()

  // 获取账号登录组件的 ref
  const formAccountRef = ref<InstanceType<typeof FromAccountType> | null>(null)

  // 登录事件
  const login = async () => {
    if (!formAccountRef.value) {
      return false
    }
    const validateResult = await formAccountRef.value.validateFormData()
    // 前端验证通过，则调用登录接口
    if (validateResult) {
      const data = formAccountRef.value.formData
      // 登录接口调用
      userLogin(data).then(result => {
        // 是否存在该用户
        const isHasUser = result.data.length > 0
        // 登录成功 ? 跳转路由 : 消息提示
        isHasUser
          ? router.push('/home')
          : ElMessage({
              message: '用户名或者密码错误',
              type: 'error',
            })
      })
    }
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
