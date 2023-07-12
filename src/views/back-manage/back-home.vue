<template>
  <div class="back-manage">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="400px">
        <h1 class="title">后台管理网站</h1>
        <el-menu
          @select="handleSelect"
          :default-active="activeIndex">
          <template v-if="frontUserPermissionList.length > 0">
            <!-- 一级页签 - 自动生成 -->
            <template
              v-for="(levelOneItem, levelOneItemIndex) in frontUserPermissionList"
              :key="levelOneItemIndex">
              <el-sub-menu :index="levelOneItem.levelOneIndex">
                <template #title>
                  <el-icon>
                    <component :is="levelOneItem.icon"></component>
                  </el-icon>
                  <span>{{ levelOneItem.name }}</span>
                </template>
                <!-- 二级页签 -->
                <template
                  v-for="(levelTwoItem, levelTwoItemIndex) in levelOneItem.levelOneChildren"
                  :key="levelTwoItemIndex">
                  <!-- 二级页签被包含在某个分组中 -->
                  <template v-if="isIncludeInGroup(levelTwoItem)">
                    <el-menu-item-group :title="levelTwoItem.groupName">
                      <template
                        v-for="(itemValue, itemIndex) in levelTwoItem.groupChildren"
                        :key="itemIndex">
                        <el-menu-item :index="itemValue.itemIndex">
                          {{ itemValue.itemName }}
                        </el-menu-item>
                      </template>
                    </el-menu-item-group>
                  </template>
                  <!-- 二级页签是独立的并不包含在分组中 -->
                  <template v-else>
                    <el-menu-item :index="levelTwoItem.itemIndex">
                      {{ levelTwoItem.itemName }}</el-menu-item
                    >
                  </template>
                </template>
              </el-sub-menu>
            </template>
          </template>
          <template v-else>
            <div class="no-permission-content">
              <span class="no-permission-tip">暂无可用权限</span>
            </div>
          </template>
        </el-menu>
      </el-aside>
      <!-- 主题内容 -->
      <el-main style="display: flex; align-items: center; justify-content: center">
        <!-- 后台管理网站的 router-view -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useUserPermissionStore } from '@/stores/userPermission/user-permisssion'
  import { getUserPermissionList } from './utils/permissionList'
  const store = useUserPermissionStore()

  // 权限总表
  import { allUserPermissionList } from '@/constant/permissionList'
  // 从 userPermission 中解构需要的数据
  const { permissionList } = store
  //  通过工具函数来获取权限列表
  const frontUserPermissionList = getUserPermissionList(permissionList, allUserPermissionList)

  // 当前被选中的页签
  const activeIndex = ref('')

  // 判断一个二级页签是否包含在一个组中
  function isIncludeInGroup(levelTwoValue: any) {
    return levelTwoValue.groupChildren !== undefined
  }

  import { useRouter } from 'vue-router'
  const router = useRouter()
  // 导航栏的选择事件
  function handleSelect(key: string, keyPath: string[]) {
    router.push(`/back-home/${key}`)
  }
</script>

<style scoped lang="scss">
  .table {
    height: 100vh;
  }

  .title {
    margin: 20px 0;
    font-size: 30px;
    text-align: center;
  }

  .el-container {
    height: 100vh;
  }

  .el-menu {
    color: black;
    border-top: 3px solid #eee;
  }

  .el-main {
    background-color: #ddd;
  }

  .no-permission-content {
    display: flex;
    height: 40vh;
    justify-content: center;
    align-items: center;

    .no-permission-tip {
      font-size: 30px;
      font-weight: 400;
      color: red;
    }
  }
</style>
