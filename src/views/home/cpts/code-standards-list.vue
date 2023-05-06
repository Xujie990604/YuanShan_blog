<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-03-19 21:39:54
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\views\home\cpts\code-standards-list.vue
 * @Description:
-->
<template>
  <div class="code-standards-list">
    <i class="el-icon-document" />
    <a :href="item.link" target="_blank">{{ item.name }}</a>
  </div>
</template>

<script lang="ts" setup>
import type { propItem } from '../type'

interface propType {
  item: propItem
}

// 即显式声明类型的同时又能设置默认值
withDefaults(defineProps<propType>(), {
  item: () => {
    return { link: '', name: '' }
  }
})
</script>

<style scoped lang="scss">
.code-standards-list {
  display: flex;
  padding: 10px 20px 10px 20px;

  i {
    margin-right: 10px;
  }
  a {
    text-decoration: none;
  }
}
</style>
