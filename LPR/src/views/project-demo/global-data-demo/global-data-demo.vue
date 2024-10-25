<template>
  <div class="global-data-demo">
    <h2>使用全局变量</h2>
    <div class="data">{{ globalUser }}</div>

    <h2>使用全局组件</h2>
    <baseSearchBox></baseSearchBox>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'

// 注入全局变量
const globalUser = inject('globalUser')

// 使用全局组件中的数据
import { userName } from '../../../base-ui/search-box'
console.log(userName)

// 使用全局组件中的 TS 类型
import type { IDataInfo } from '../../../base-ui/search-box'
const data: IDataInfo = {
  name: 'foo',
  age: 18,
}
console.log(data);
</script>

<style scoped lang="scss"></style>
