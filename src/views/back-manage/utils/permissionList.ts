import { deepClone } from '@/utils/tools'
import type { ILevelOneItem, ILevelTwoItem } from '@/constant/permissionList'
import type { IPermissionList } from '@/stores/userPermission/type'

/**
 * 通过 从后端获取的权限列表 和 权限列表总表 来生成最终需要的权限列表
 * 策略：先将 权限列表总表 中的数据全部给 result， 然后将 从后端获取的权限列表 和 权限列表总表 进行对比，一步步去掉不属于该用户的权限
 * @param permissionList              从后端获取的权限列表
 * @param frontUserPermissionList     权限列表总表
 */
export function getUserPermissionList(
  permissionList: IPermissionList,
  frontUserPermissionList: ILevelOneItem[]
) {
  // 先将 result 和总权限表中的数据同步
  const result: ILevelOneItem[] = deepClone(frontUserPermissionList)
  // 从后端获取的权限列表：拥有的一级页签
  const levelOneItemList = Object.keys(permissionList)
  // 遍历 权限列表总表 的一级页签
  frontUserPermissionList.forEach(levelOneItem => {
    // ! 从后端获取的权限列表 中 *不存在* 该一级页签 || 从后端获取的权限列表 某一项为空数组
    // 当前 权限列表总表 的一级页签的 levelOneIndex 属性
    const levelOneItemIndex = levelOneItem.levelOneIndex
    if (
      !levelOneItemList.includes(levelOneItemIndex) ||
      !permissionList[levelOneItemIndex as keyof typeof permissionList].length
    ) {
      // 去掉不存在的一级页签
      result.splice(
        result.findIndex(deleteItem => deleteItem.levelOneIndex === levelOneItemIndex),
        1
      )
    } else {
      // ! 从后端获取的权限列表 中 *存在* 该一级页签 && 权限数组长度不为0
      // 从后端获取的权限列表：当前一级页签下存在的二级页签
      const levelTwoItemList = permissionList[levelOneItemIndex as keyof typeof permissionList]
      // 权限列表总表：当前一级页签下存在的二级页签
      const allLevelTwoItemList = getAllLevelTwoItemList(levelOneItem.levelOneChildren)
      // 遍历 权限列表总表 *当前一级页签下* 的所有二级页签
      allLevelTwoItemList.forEach(item => {
        // ! 从后端获取的权限列表中 *不存在* 该二级页签
        if (!levelTwoItemList.includes(item)) {
          // 删除不存在的二级页签
          deleteLevelTwoItemByName(
            result.filter(levelOneItem => levelOneItem.levelOneIndex === levelOneItemIndex)[0],
            item
          )
        }
      })
    }
  })
  return result
}

/**
 * 返回某项一级页签中所有的二级页签 index (包含属于 group 的 和不属于 group 的)
 * @param levelOneChildren 一级页签的 levelOneChildren 属性
 */
function getAllLevelTwoItemList(levelOneChildren: ILevelTwoItem[]) {
  const result: string[] = []
  levelOneChildren.forEach(item => {
    if (item.groupChildren === undefined) {
      result.push(item.itemIndex as string)
    } else {
      item.groupChildren.forEach(groupItem => result.push(groupItem.itemIndex))
    }
  })
  return result
}

/**
 * 从某一项一级页签中删除掉某个二级页签
 * @param levelOneItem
 * @param itemName
 */
function deleteLevelTwoItemByName(levelOneItem: ILevelOneItem, itemName: string) {
  // itemIndex 不为 -1 则说明该二级页签没有在 group 中
  // itemIndex 值为 -1 则说明该二级页签在 group 中
  const itemIndex: number = levelOneItem.levelOneChildren.findIndex(
    item => item.itemIndex === itemName
  )
  // 该二级页签没有在 group 中
  if (itemIndex !== -1) {
    // 直接删除该二级页签
    levelOneItem.levelOneChildren.splice(itemIndex, 1)
  } else {
    // 该二级页签在 group 中

    // 得到该一级页签下的所有 levelTwoItemGroup
    const groupItems = levelOneItem.levelOneChildren.filter(
      item => item.groupChildren !== undefined
    )
    // 遍历所有的 groupChildren
    groupItems.forEach(groupItem => {
      const itemIndex: number = groupItem.groupChildren!.findIndex(
        item => item.itemIndex === itemName
      )
      // itemIndex 值是 -1    则说明当前遍历 levelTwoItemGroup 中不存在该二级页签，则无事发生
      // itemIndex 值不是 -1  则说明当前遍历 levelTwoItemGroup 中存在该二级页签，则删除掉该二级页签
      if (itemIndex !== -1) {
        groupItem.groupChildren!.splice(itemIndex, 1)
        // 删除完二级页签之后，检查二级页签所在 group 内如果不存在任何二级页签，则将整个 group 去掉
        if (!groupItem.groupChildren!.length) {
          levelOneItem.levelOneChildren.splice(
            levelOneItem.levelOneChildren.findIndex(
              item => item.levelTwoIndex === groupItem.levelTwoIndex
            ),
            1
          )
        }
      }
    })
  }
}
