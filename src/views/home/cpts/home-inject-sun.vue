<template>
  <div class="home-inject-sun">
    依赖注入的孙组件
    <div
      class="content"
      @click="injectSunClick">
      依赖注入的Count: {{ injectInfo }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { injectInfoKey, injectInfoClass } from '../type'
  // import type { IInjectInfoAll } from '../type'
  import { inject } from 'vue'

  function injectSunClick() {
    updateInjectInfo()
  }

  // 1. 带有默认值的依赖注入
  // TODO: Vue 官方演示的是工厂函数的形式，但是这里只能用类的形式(否则类型错误不一致)，需要解决
  const { injectInfo, updateInjectInfo } = inject(injectInfoKey, new injectInfoClass())

  // 2.不带默认值的导致，因为导出值可能是 undefined，所以需要加上 as IInjectInfoAll
  // 但是这种情况下的类型系统是不安全的
  // const { injectInfo: injectInfo2, updateInjectInfo: updateInjectInfo2 } = inject(
  //   injectInfoKey
  // ) as IInjectInfoAll
</script>

<style scoped lang="scss"></style>
