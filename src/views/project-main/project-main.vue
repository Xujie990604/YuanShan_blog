<template>
  <div class="project-main">
    <el-container style="height: 100%">
      <el-header>项目标题</el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 菜单 -->
          <el-menu>
            <!-- 二级菜单 -->
            <el-sub-menu
              v-for="subItem in mainMenuList"
              :key="subItem.title">
              <template #title>{{ subItem.title }}</template>
              <el-menu-item
                @click="turnToRouter(item.itemRouter)"
                v-for="item in subItem.children"
                :key="item.itemName"
                >{{ item.itemName }}</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main> <RouterView></RouterView> </el-main>
      </el-container>
      <el-footer>页面底部</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const mainMenuList = reactive([
    {
      title: 'Vue3 语法使用',
      children: [
        {
          itemName: '父子组件传参',
          itemRouter: 'home',
        },
      ],
    },
    {
      title: '三方插件使用',
      children: [
        {
          itemName: '多语言',
          itemRouter: 'vue-i18n',
        },
        {
          itemName: 'UnoCSS',
          itemRouter: 'unocss-test',
        },
      ],
    },
    {
      title: '项目工程实践',
      children: [
        {
          itemName: '响应式单位',
          itemRouter: 'rem-size',
        },
      ],
    },
  ])

  function turnToRouter(itemRouter: string) {
    router.push(`/project-main/${itemRouter}`)
  }
</script>

<style scoped lang="scss">
  .project-main {
    height: 100vh;
  }

  .el-header {
    line-height: 60px;
    text-align: center;
    background-color: #c6e2ff;
  }

  .el-aside {
    background-color: #d9ecff;
  }

  .el-main {
    background-color: #ecf5ff;
  }

  .el-footer {
    line-height: 60px;
    text-align: center;
    background-color: #c6e2ff;
  }
</style>
