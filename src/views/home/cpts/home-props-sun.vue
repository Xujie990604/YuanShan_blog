<template>
  <div class="home-props-sun">
    <span>普通传值的孙组件</span>
    <div
      class="user-info"
      @click="updateUserInfo">
      userInfo: {{ userInfo }}
    </div>
    <div
      class="count"
      @click="updateCount">
      count: {{ count }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'

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

  const emits = defineEmits<{
    (e: 'update-user-info-sun'): void
    (e: 'update-count-sun'): void
  }>()

  function updateUserInfo() {
    emits('update-user-info-sun')
  }

  function updateCount() {
    emits('update-count-sun')
  }
</script>

<style scoped lang="scss"></style>
