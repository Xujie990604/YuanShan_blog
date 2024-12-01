<template>
  <div
    class="base-page-title"
    :style="{ backgroundColor: bgColor }">
    <!-- 左侧 -->
    <slot name="left-icon">
      <img
        class="return-arrow"
        src="../../../assets/images/base-image/back.png"
        @click="goBack" />
    </slot>

    <!-- 中间部分 -->
    <slot name="default">
      <div class="page-title-text">{{ title }}</div>
    </slot>

    <!-- 右侧 -->
    <div
      v-if="isShowRight"
      class="right-icon">
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
  // TODO：运行时声明和基于类型声明的异同点
  const { title, bgColor = '#fff', isShowRight = true } = defineProps<IProps>()
</script>

<style scoped lang="scss">
  .base-page-title {
    display: flex;
    width: 100%;
    height: 44px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
  }

  .return-arrow {
    width: 24px;
    height: 24px;
    margin: 0 16px;
  }

  .page-title-text {
    font-size: 17px;
    color: #111f2c;
    text-align: center;
    flex: 1;
  }

  .right-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin: 0 16px;
  }
</style>
