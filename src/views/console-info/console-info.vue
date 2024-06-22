<template>
  <div class="">日志打印</div>
</template>

<script lang="ts" setup>
  import appLog from '@/hook/appLog'
  const Log = appLog()
  const data = {
    code: '200',
    message: {
      list: [
        {
          id: 1,
          name: '张三',
          age: 18,
        },
      ],
    },
  }
  Log.log('执行', '页面渲染')
  Log.info('user接口', data)
  Log.warn('警告信息', '未获取到用户列表')
  Log.error('执行错误', '用户信息获取失败')
</script>

<style scoped lang="scss"></style>
