import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserPermissionStore = defineStore('userPermission', () => {
  // 用户拥有的权限
  const userPermissionList = reactive({
    userType: 'admin',
    permissionList: {
      user: ['stu-good', 'stu-simply', 'teacher-office', 'teacher-od'],
      car: ['car-big', 'car-smaller', 'outline-person', 'stu-parents'],
      salary: ['salary-teacher', 'salary-od', 'salary-security', 'salary-kitchen'],
    },
  })

  // 用户类型
  const userType = computed(() => {
    return userPermissionList.userType
  })

  return { userPermissionList, userType }
})
