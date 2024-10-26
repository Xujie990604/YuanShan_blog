import baseSearchBox from './src/base-search-box.vue'

import type { IDataInfo } from './types/type'
import { userName } from './constants/list-type'

export { type IDataInfo, userName }  // TS 类型、常量等内容也需要导出

export default baseSearchBox  // 组件默认导出
