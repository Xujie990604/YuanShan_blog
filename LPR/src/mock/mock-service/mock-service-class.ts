import mockJS from 'better-mock';
import {APItypeEnum} from '../../constant/globalEnum';
import requestAPI from '../../constant/api';


export default class mockService {
  // 实现 mock 的工具
  mockTool = mockJS;
  // mock 的基础路径
  baseurl;
  // mock 接口的类型
  apiType;

  constructor(timeout: string, baseurl:string, apiType:APItypeEnum ) {
    this.mockTool.setup({ timeout: timeout });
    this.baseurl = baseurl;
    this.apiType = apiType;
  }

  /**
   * 自定义的 mock 方法
   * @param param
   */
  // TODO：目前自定义的方法无法按照模版生成数据，参考下原 mock 如何做的。进行一下适配
  mock(...param: any []) {
    // 1. 拼接路径
    const newParam = this.concatUrl(...param);
    // 2. 输出信息
    this.outputInfo(newParam);
    // 3. 返回 mock 数据
    return this.mockTool.mock(...newParam);
  }

  /**
   * 在传入 URL 的基础上进行拼接
   * @param param
   * @returns
   */
  concatUrl(...param: any[]) {
    const paramArr = [...param];
    // 调用设备接口: 拦截时不仅添加前缀也要添加后缀
    if (this.apiType === APItypeEnum.LAPI) {
      paramArr[0] = this.baseurl + requestAPI.lapiInvoke;
    } else {
      // 调用云接口：拦截时需要添加前缀
      paramArr[0] = this.baseurl + paramArr[0];
    }
    return paramArr;
  }

  /**
   * 在控制台输出被拦截接口的信息
   */
  outputInfo(param: any[]) {
    console.warn('使用 mock 拦截了接口：', param[0]);
  }
}
