// NOTE: Vant 的自动导入插件有 BUG，有些样式和组件需要自行导入

import 'vant/es/dialog/style' // 引入dialog样式
import { ConfigProvider, Toast, Dialog } from 'vant'

export default [ConfigProvider, Toast, Dialog]
