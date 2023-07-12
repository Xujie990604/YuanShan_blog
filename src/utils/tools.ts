// TODO: 深克隆函数需要优化
export function deepClone(origin: any, target?: any) {
  return JSON.parse(JSON.stringify(origin))
}

// TODO: 写一个工具函数用来判断数据类型
