<template>
  <!-- 分别使用三种方式来体会 普通传值，透传，依赖注入带来的好处 -->
  <div class="my-home">Mouse Position is at : {{ x }} {{ y }}</div>

  <!-- 1. props emit 的方式来实现跨层级传值，事件 -->
  <homePropsSon
    :userInfo="userInfo"
    :count="count"
    @update-user-info="userInfo.age++"
    @update-count="count++"></homePropsSon>

  <!-- 2. 透传的方式来实现跨层级传值，事件 -->
  <homeAttrsSon
    :foo="foo"
    :bar="bar"
    @sun-click="handleSunClick"></homeAttrsSon>

  <!-- 3. 依赖注入的方式来实现跨层级传值，事件 -->
  <homeInjectSon></homeInjectSon>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'

  // 组合函数的使用
  import { useMouse } from './hooks/hook-mouse'
  // 鼠标在当前页的坐标
  const { x, y } = useMouse()
  // 1. 使用 props emit 的方式来实现跨层级传值，事件
  import homePropsSon from './cpts/home-props-son.vue'
  const userInfo = reactive({
    name: 'xujie',
    age: 18,
  })

  const count = ref(0)

  // 2. 使用透传的方式来实现跨层级传值，事件
  import homeAttrsSon from './cpts/home-attrs-son.vue'
  const foo = reactive({
    name: 'foo',
    age: 19,
  })
  const bar = ref('bar')
  function handleSunClick() {
    foo.age++
  }

  // 3. 依赖注入的方式来实现跨层级传值，事件
  import homeInjectSon from './cpts/home-inject-son.vue'
  import { injectInfoKey } from './type'
  import type { IInjectInfo, IUpdateInjectInfo } from './type'
  import { provide } from 'vue'

  const injectInfo: IInjectInfo = reactive({
    name: 'xujie',
    height: 170,
  })

  const updateInjectInfo: IUpdateInjectInfo = function (value = 1) {
    injectInfo.height += value
  }

  provide(injectInfoKey, {
    injectInfo,
    updateInjectInfo,
  })
</script>

<style scoped lang="scss"></style>
