<template>
  <el-form
    ref="accountFromRef"
    :model="formData"
    :rules="rules"
    label-width="80px"
    label-position="left">
    <!-- 用户名 -->
    <el-form-item
      class="username-input input"
      label="用户名:"
      prop="username">
      <el-input
        v-model="formData.name"
        placeholder="请输入用户名"
        type="text" />
    </el-form-item>

    <!-- 密码 -->
    <el-form-item
      class="password-input input"
      label="密码:"
      prop="password">
      <el-input
        v-model="formData.password"
        placeholder="请输入密码"
        type="password"
        show-password />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import validator from '@/utils/formValidators'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'

  // 表单 Ref
  const accountFromRef = ref<FormInstance>()

  // 表单数据
  const formData = reactive({
    name: '',
    password: '',
  })

  // 表单验证规则
  const rules = reactive<FormRules>({
    name: validator({ required: true }),
    password: validator({ required: true, lengthRange: true }),
  })

  // 验证表单的数据是否符合校验
  async function validateFormData(): Promise<boolean> {
    let validateResult = false
    // validate 方法是异步的，所以必须加上 await 来保证 return 的数据是处理过的
    await accountFromRef.value.validate(isValid => {
      validateResult = isValid
      if (!validateResult) {
        ElMessage({
          message: '数据格式错误',
          type: 'error',
        })
      }
    })
    return validateResult
  }

  // 当前组件暴露的属性
  defineExpose({
    validateFormData,
    formData,
  })
</script>

<style scoped lang="scss">
  .el-form {
    margin-left: 20px;
    // 用户名和密码的样式
    .input {
      width: 320px;
      margin-bottom: 40px;
    }
  }
</style>
