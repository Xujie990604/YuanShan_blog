<template>
  <div class="login-form">
    <!-- 欢迎语 -->
    <FormWelcome />
    <!-- 登录表单 -->
    <!-- TODO: 后续新增手机验证码登录 -->
    <FromAccountType ref="formAccountRef" />
    <!-- 登录按钮 -->
    <FormSubmit @login="login" />
    {{ state }}
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRef, toRefs } from 'vue'
  import FormWelcome from './form-welcome.vue'
  import FormSubmit from './form-submit.vue'
  import FromAccountType from './form-account-type.vue'
  import { useRouter } from 'vue-router'
  import { userLogin } from '@/service/login/index'
  import { ElMessage } from 'element-plus'

  const router = useRouter()

  /**
   *  获取账号登录组件的 ref
   */
  const formAccountRef = ref<InstanceType<typeof FromAccountType> | null>(null)

  /**
   * 执行登录操作
   */
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
        //TODO: 登录成功之后调用接口获取用户的类型，并获取用户所拥有的的权限
        isHasUser
          ? router.push('/home')
          : ElMessage({
              message: '用户名或者密码错误',
              type: 'error',
            })
      })
    }
  }

  import { useUserPermissionStore } from '@/stores/userPermission/user-permisssion'
  import { renderUserPermissionListRouter } from '@/constant/permission-list-router'
  const userPermissionStore = useUserPermissionStore()
  import { storeToRefs } from 'pinia'
  const { userPermissionList, permissionList } = storeToRefs(userPermissionStore)
  // 自执行
  afterLoginMethod()
  // 调用登录接口之后需要做的事情
  async function afterLoginMethod() {
    await getUserInfo()
    await renderPermissionRouter()
  }
  /**
   * 获取用户类型和权限列表
   */
  async function getUserInfo() {
    // TODO: 用户的类型和权限应该调用接口获取

    // 1. 修改用户类型
    userPermissionList.value.userType = 'admin'
    // 2. 修改用户权限
    userPermissionList.value.permissionList = {
      user: ['stu-good', 'stu-simply', 'teacher-office', 'teacher-od'],
      car: ['car-big', 'car-smaller', 'outline-person', 'stu-parents'],
      salary: ['salary-teacher', 'salary-od', 'salary-security', 'salary-kitchen'],
    }
  }
  /**
   * 根据获取到的权限列表来渲染路由（后台管理系统）
   */
  async function renderPermissionRouter() {
    const renderRouterList = renderUserPermissionListRouter(permissionList.value)
    // 动态添加路由
    renderRouterList.forEach(routerInfo => {
      router.addRoute('BackHome', routerInfo)
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
