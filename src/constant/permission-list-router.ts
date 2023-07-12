import type { IPermissionList } from '@/stores/userPermission/type'

interface IRouterInfo {
  path: string
  name: string
  component: any
}

// TODO: 后续这个权限的总列表需要使用 node 脚本自动生成
export const aLLUserPermissionListRouter: IRouterInfo[] = [
  {
    path: 'stu-good',
    name: 'StuGood',
    component: () => import('@/views/back-manage/views/user-manage/stu-good.vue'),
  },
  {
    path: 'stu-simply',
    name: 'StuSimply',
    component: () => import('@/views/back-manage/views/user-manage/stu-simply.vue'),
  },
  {
    path: 'teacher-office',
    name: 'teacherOffice',
    component: () => import('@/views/back-manage/views/user-manage/teacher-office.vue'),
  },
  {
    path: 'teacher-od',
    name: 'teacherOd',
    component: () => import('@/views/back-manage/views/user-manage/teacher-od.vue'),
  },
  {
    path: 'car-big',
    name: 'carBig',
    component: () => import('@/views/back-manage/views/car-manage/car-big.vue'),
  },
  {
    path: 'car-smaller',
    name: 'carSmaller',
    component: () => import('@/views/back-manage/views/car-manage/car-smaller.vue'),
  },
  {
    path: 'outline-person',
    name: 'outlinePerson',
    component: () => import('@/views/back-manage/views/car-manage/outline-person.vue'),
  },
  {
    path: 'stu-parents',
    name: 'stuParents',
    component: () => import('@/views/back-manage/views/car-manage/stu-parents.vue'),
  },
  {
    path: 'salary-teacher',
    name: 'salaryTeacher',
    component: () => import('@/views/back-manage/views/salary-manage/salary-teacher.vue'),
  },
  {
    path: 'salary-od',
    name: 'salaryOd',
    component: () => import('@/views/back-manage/views/salary-manage/salary-od.vue'),
  },
  {
    path: 'salary-security',
    name: 'salarySecurity',
    component: () => import('@/views/back-manage/views/salary-manage/salary-security.vue'),
  },
  {
    path: 'salary-kitchen',
    name: 'salaryKitchen',
    component: () => import('@/views/back-manage/views/salary-manage/salary-kitchen.vue'),
  },
]

/**
 * 根据接口中的用户权限数据来生成对应的 Router 数据
 * @param permissionList 从接口获取到的权限数据
 */
export function renderUserPermissionListRouter(permissionList: IPermissionList) {
  // 返回的所有路由信息数组
  const allPermissionRouterList: IRouterInfo[] = []

  // 从接口获取到的权限数据 总和
  let allPermissionListOfUser: string[] = []
  Object.values(permissionList).forEach(item => {
    allPermissionListOfUser = allPermissionListOfUser.concat(item)
  })

  // 网站拥有的权限数组总和
  aLLUserPermissionListRouter.forEach(item => {
    if (allPermissionListOfUser.includes(item.path)) {
      allPermissionRouterList.push(item)
    }
  })
  return allPermissionRouterList
}
