import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IUserPermissionList } from '@/stores/userPermission/type'

export const useUserPermissionStore = defineStore('userPermission', () => {
  // TODO: 需要解决刷新页面数据丢失的问题
  // 用户拥有的权限
  const userPermissionList: IUserPermissionList = reactive({
    userType: '',
    permissionList: {
      user: [],
      car: [],
      salary: [],
    },
  })

  // 用户类型
  const userType = computed(() => {
    return userPermissionList.userType
  })

  // 接口中的权限列表
  const permissionList = computed(() => {
    return userPermissionList.permissionList
  })

  return { userPermissionList, permissionList, userType }
})
