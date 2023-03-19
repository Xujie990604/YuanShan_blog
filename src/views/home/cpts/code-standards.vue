<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-03-19 21:55:58
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\src\views\home\cpts\code-standards.vue
 * @Description: 
-->
<template>
  <div class="code-standards">
    <div class="title">前端代码规范</div>
    <!-- 代码规范文档 -->
    <div class="code-doc">
      <CodeStandardsList
        v-for="(item, index) in links.code"
        :key="index"
        :item="item"
      ></CodeStandardsList>
    </div>
    <!-- 框架规范文档 -->
    <div class="frame-doc">
      <CodeStandardsList
        v-for="(item, index) in links.frame"
        :key="index"
        :item="item"
      ></CodeStandardsList>
    </div>

    <!-- 插件官网 -->
    <div class="plugin-doc">
      <CodeStandardsList
        v-for="(item, index) in links.plugin"
        :key="index"
        :item="item"
      ></CodeStandardsList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import CodeStandardsList from './code-standards-list.vue'

const links = reactive({
  code: [
    {
      name: '京东凹凸实验室',
      link: 'https://guide.aotu.io/docs/'
    },
    {
      name: '腾讯前端代码规范',
      link: 'https://tgideas.qq.com/doc/index.html'
    },
    {
      name: '百度前端代码规范',
      link: 'https://github.com/ecomfe/spec'
    },
    {
      name: 'ES6编程规范',
      link: 'https://es6.ruanyifeng.com/#docs/style'
    }
  ],
  frame: [
    {
      name: 'Vue官方代码风格',
      link: 'https://v2.cn.vuejs.org/v2/style-guide/index.html'
    }
  ],
  plugin: [
    {
      name: 'Eslint',
      link: 'https://eslint.bootcss.com/docs/rules/'
    },
    {
      name: 'Prettier',
      link: 'https://prettier.io/docs/en/index.html'
    }
  ]
})
</script>

<style scoped lang="scss">
.code-standards {
  position: absolute;
  top: 50px;
  left: 20px;
  border: 1px solid #eee;

  .title {
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    border-bottom: 2px solid #eee;
  }
}
</style>
