<!-- eslint-disable vue/no-setup-props-destructure -->
<template>
  <div class="home-props-son">
    <h2>1. props emits 的使用</h2>
    <span>普通传值的子组件</span>

    <homePropsSun
      :userInfo="userInfo"
      :count="count"
      @update-user-info-sun="$emit('update-user-info')"
      @update-count-sun="$emit('update-count')"></homePropsSun>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'

  import homePropsSun from './home-props-sun.vue'

  interface IProps {
    userInfo: {
      name: string
      age: number
    }
    count: number
  }

  const props = withDefaults(defineProps<IProps>(), {
    userInfo: () => ({
      name: 'tom',
      age: 16,
    }),
    count: 0,
  })
  const { userInfo, count } = toRefs(props)

  defineEmits<{
    (e: 'update-user-info'): void
    (e: 'update-count'): void
  }>()
</script>

<style scoped lang="scss"></style>
