export interface IUserPermissionList {
  userType: string
  permissionList: IPermissionList
}

export interface IPermissionList {
  user: string[]
  car: string[]
  salary: string[]
}
