<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2023-03-19 17:57:52
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \yuanshan_00\README.md
 * @Description: 
-->
# yuanshan_00

## 技术栈

- Vue3 + Router + pinia
- TS
- vite

## 项目的目录结构

src

    - assets        静态资源存储目录
    - base-ui       其他项目可复用组件
    - components    本项目中的可复用组件
    - global        用来注册第三方插件，CSS等
    - router        路由文件
  
    - service       网络请求文件
      - xxx           每个模块有自己的文件
      - request       封装的 axios 请求
        - config        axios 用到的常量和配置信息
        - index         封装的 axios class
      - index         axios 实例

    - stores        状态管理文件
      - xxx           每个模块有自己的文件
  
    - utils         工具函数文件
  
    - views         视图文件
     - xxx            每块视图有自己的文件
       - config         定义的常量&配置信息
       - cpts           视图的子组件
       - hook           ？
       - xxx.vue        视图主页面

## 代码规范约束

1. Eslint 进行代码检查
2. Prettier 对代码进行统一格式化

## CSS

1. 项目安装 normalize.css 插件
2. 自定义 base.scss 进行自定义文件
