import type { InjectionKey } from 'vue'

// 注入值的类型
export interface IInjectInfo {
  name: string
  height: number
}

// 修改注入值函数的类型
export interface IUpdateInjectInfo {
  (value?: number): void
}

// 依赖注入值 + 修改注入值函数 的类型

export interface IInjectInfoAll {
  injectInfo: IInjectInfo
  updateInjectInfo: IUpdateInjectInfo
}

// 带有注入值类型的 key
export const injectInfoKey = Symbol() as InjectionKey<IInjectInfoAll>

// 生成注入值默认值的类
export class injectInfoClass implements IInjectInfoAll {
  injectInfo: IInjectInfo = {
    name: '',
    height: 0,
  }

  constructor(name: string = 'Tom', height: number = 155) {
    this.injectInfo.name = name
    this.injectInfo.height = height
  }

  updateInjectInfo(value: number = 1) {
    this.injectInfo.height += value
  }
}
