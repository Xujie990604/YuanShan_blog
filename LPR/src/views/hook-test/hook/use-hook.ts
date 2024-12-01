// store.js
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  },
})

import { ref } from 'vue'
export function useHook() {
  const count = ref(99)
  function increment() {
    count.value++
  }
  return { count, increment }
}
