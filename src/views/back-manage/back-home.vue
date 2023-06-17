<template>
  <div class="back-manage">
    <el-container>
      <el-aside width="400px">
        <h1 class="title">后台管理网站</h1>
        <el-menu
          @open="handleOpen"
          @close="handleClose">
          <!-- 一级页签 - 用户管理 -->
          <el-sub-menu index="user">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <!-- 二级页签 -->
            <el-menu-item-group title="学生">
              <el-menu-item index="stu-good">实验班</el-menu-item>
              <el-menu-item index="stu-simple">普通班</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="老师">
              <el-menu-item index="teacher-office">编制教师</el-menu-item>
              <el-menu-item index="teacher-od">外包教师</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 一级页签 - 车辆管理 -->
          <el-sub-menu index="car">
            <template #title>
              <el-icon><Van /></el-icon>
              <span>车辆管理</span>
            </template>
            <!-- 二级页签 -->
            <el-menu-item index="car-big">大卡车</el-menu-item>
            <el-menu-item index="car-smaller">蔬菜车</el-menu-item>
            <el-menu-item-group title="外来车辆">
              <el-menu-item index="outline-person">来访人员</el-menu-item>
              <el-menu-item index="stu-parents">学生家长</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 一级页签 - 工资管理 -->
          <el-sub-menu index="salary">
            <template #title>
              <el-icon><Notebook /></el-icon>
              <span>工资管理</span>
            </template>
            <!-- 二级页签 -->
            <el-menu-item index="salary-teacher">编制教师</el-menu-item>
            <el-menu-item index="salary-od">外包教师</el-menu-item>
            <el-menu-item index="salary-security">安保人员</el-menu-item>
            <el-menu-item index="salary-kitchen">餐厅人员</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main style="display: flex; align-items: center; justify-content: center"
        >后台管理网站的页面</el-main
      >
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  // import { reactive, ref } from 'vue'
  import { useUserPermissionStore } from '@/stores/userPermission/user-permisssion'
  import { storeToRefs } from 'pinia'
  const store = useUserPermissionStore()
  const { userPermissionList, userType } = storeToRefs(store)

  console.log(userPermissionList, userType)
  // 导航栏的打开事件
  function handleOpen() {
    console.log('open')
  }

  // 导航栏的关闭事件
  function handleClose() {
    console.log('close')
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
</style>
