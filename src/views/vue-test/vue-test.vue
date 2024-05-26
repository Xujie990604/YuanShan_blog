<template>
  <div class="vue-test">
    <span
      v-if="isShow"
      @click="handleClickName">
      {{ name + ' org' }}
    </span>
    <ul>
      <li
        v-for="item in userList"
        :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { ref, getCurrentInstance, onMounted } from 'vue'
  const instance = getCurrentInstance()
  onMounted(() => {
    console.log('当前组件实例', instance.ctx)
  })

  const isShow = ref(true)
  const name = ref('no One')
  const userList = reactive(['foo', 'bar', 'baz'])

  function handleClickName() {
    alert('click name')
  }
</script>

<style scoped lang="scss"></style>
