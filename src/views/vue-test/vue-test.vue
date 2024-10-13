<template>
  <div>{{ state.foo }}</div>
  <div>{{ state.bar }}</div>
  <div>{{ state.baz }}</div>
</template>

<script lang="ts" setup>
  import { reactive, ref, toRefs } from 'vue'

  const state = reactive({
    foo: ref(0),
    bar: ref([1, 2, 3]),
  })

  let { foo, bar } = toRefs(state)

  setTimeout(() => {
    foo.value++
    bar.value.push(4)
  }, 2000)
</script>
