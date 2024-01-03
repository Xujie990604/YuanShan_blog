<template>
  <!-- TODO: 登录表单找一个B站上的实例改一下，这也太丑了 -->
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
    //  1. 获取用户类型和权限列表
    await getUserInfo()
    //  2.根据获取到的权限列表来渲染路由（后台管理系统）
    await renderPermissionRouter()
  }
  //  获取用户类型和权限列表
  async function getUserInfo() {
    // TODO: 用户的类型和权限应该调用接口获取

    userPermissionList.value.userType = 'admin'
    // 如果修改 userPermissionList.permissionList 时，直接使用替换对象的方式
    // ! 则解构 permissionList 时要使用 storeToRefs 来进行解构，否则 permissionList 不是响应式的(原以为只有基本数据类型解构会丢失响应式)
    // ! 如果不解构使用，则数据也是正常的，不会丢失响应式
    // ! 只有既解构了，又没搭配 storeToRefs 时才会导致异常
    // ! 而且只有在 pinia 中使用才会出现这个问题，脱离 pinia 在普通页面中按照这种写法使用，不会出现问题(但是也值得研究，毕竟是整个替换引用值，为什么会没有问题)(用 computed 和 不用 computed 有差别吗？)
    // TODO：这个结论和我的预想不符合，需要研究。在看一下 pinia 官网的介绍和文章介绍，以及数据更改可否不通过函数直接更改, 没想到 computed 数值也可以更改，并且能影响上层数据，这是值得推荐的使用吗
    userPermissionList.value.permissionList = {
      user: ['stu-good', 'stu-simply', 'teacher-office', 'teacher-od'],
      car: ['car-big', 'car-smaller', 'outline-person', 'stu-parents'],
      salary: ['salary-teacher', 'salary-od', 'salary-security', 'salary-kitchen'],
    }
  }
  //  根据获取到的权限列表来渲染路由（后台管理系统）
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
