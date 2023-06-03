import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  // 定义data，相当于 Vuex 中的 store
  const userList = reactive([
    { name: 'xujie', age: 25 },
    { name: 'tom', age: 30 },
  ])

  // 定义计算属性，相当于 Vuex 中的 getter
  const adultList = computed(() => {
    return userList.filter(user => user.age >= 18)
  })

  // 定义方法，相当于 Vuex 中的 action   (Pinia 中没有 mutation 的概念)
  function addUser() {
    userList.push({ name: 'Anna', age: 18 })
  }

  return { userList, adultList, addUser }
})
