<template>
  <div class="base-page-title">
    <img
      @click="goBack"
      class="return-arrow"
      src="../../../assets/images/base-image/back.png"
    />
    <div class="page-title-text">{{ title }}</div>
    <div class="right-icon">
      <slot name="rightIcon"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  // 在历史记录中后退一页
  router.go(-1)
}

import type { IProps } from '../types/props'

// TODO: 宏函数为啥可以直接使用
// TODO： 运行时声明和基于类型声明的异同点
const { title } = defineProps<IProps>()
</script>

<style scoped lang="scss">
.base-page-title {
  display: flex;
  align-items: center;
  height: 44px;
  background-color: #fff;
}

.page-title-text {
  flex: 1;
  font-size: 17px;
  color: #111f2c;
  text-align: center;
}

.return-arrow {
  width: 24px;
  height: 24px;
  margin: 0 16px;
}

.right-icon {
  width: 24px;
  height: 24px;
  margin: 0 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
