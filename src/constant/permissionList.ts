// 后台管理系统的权限总表

export interface ILevelOneItem {
  levelOneIndex: string
  name: string
  icon: string
  levelOneChildren: ILevelTwoItem[]
}

export interface ILevelTwoItem {
  itemIndex?: string
  itemName?: string
  levelTwoIndex?: string
  groupName?: string
  groupChildren?: ILevelSimplyTwoItem[]
}

interface ILevelSimplyTwoItem {
  itemIndex: string
  itemName: string
}

export const allUserPermissionList: ILevelOneItem[] = [
  {
    levelOneIndex: 'user',
    name: '用户管理',
    icon: 'User',
    levelOneChildren: [
      {
        levelTwoIndex: 'student',
        groupName: '学生',
        groupChildren: [
          {
            itemIndex: 'stu-good',
            itemName: '实验班',
          },
          {
            itemIndex: 'stu-simply',
            itemName: '普通班',
          },
        ],
      },
      {
        levelTwoIndex: 'teacher',
        groupName: '教师',
        groupChildren: [
          {
            itemIndex: 'teacher-office',
            itemName: '编制教师',
          },
          {
            itemIndex: 'teacher-od',
            itemName: '外包老师',
          },
        ],
      },
    ],
  },
  {
    levelOneIndex: 'car',
    name: '车辆管理',
    icon: 'Van',
    levelOneChildren: [
      {
        itemIndex: 'car-big',
        itemName: '大卡车',
      },
      {
        itemIndex: 'car-smaller',
        itemName: '小卡车',
      },
      {
        levelTwoIndex: 'foreignVehicle',
        groupName: '外来人员车辆',
        groupChildren: [
          {
            itemIndex: 'outline-person',
            itemName: '外来人员',
          },
          {
            itemIndex: 'stu-parents',
            itemName: '学生家长',
          },
        ],
      },
    ],
  },
  {
    levelOneIndex: 'salary',
    name: '工资管理',
    icon: 'Notebook',
    levelOneChildren: [
      {
        itemIndex: 'salary-teacher',
        itemName: '编制教师',
      },
      {
        itemIndex: 'salary-od',
        itemName: '外包教师',
      },
      {
        itemIndex: 'salary-security',
        itemName: '安保人员',
      },
      {
        itemIndex: 'salary-kitchen',
        itemName: '餐厅人员',
      },
    ],
  },
]
