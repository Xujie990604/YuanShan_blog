<template>
  <div class="home-sun">透传的孙组件</div>
  <div
    class="text"
    @click="$emit('sun-click')">
    foo: {{ foo }}
  </div>
</template>

<script lang="ts" setup>
  interface IProps {
    foo?: {
      name: string
      age: number
    }
  }

  // 在当前页面使用 prop 声明了 foo 属性
  // 代表在当前页面中消费掉了这个属性
  withDefaults(defineProps<IProps>(), {
    foo: () => ({
      name: 'foo',
      age: 19,
    }),
  })

  // 在当前页面中使用 emit 声明 ‘sun-click’ 事件
  // 代表在当前页面消费掉了这个透传的事件
  defineEmits<{
    (e: 'sun-click'): void
  }>()
</script>

<style scoped lang="scss"></style>
