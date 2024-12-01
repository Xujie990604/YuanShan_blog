// NOTE: Vant 的自动导入插件有 BUG，有些样式和组件需要自行导入

import 'vant/es/dialog/style'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import { ConfigProvider, Lazyload } from 'vant'

export default [ConfigProvider, Lazyload]
