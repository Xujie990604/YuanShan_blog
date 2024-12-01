import dsbridge from 'dsbridge'
import {
  callNativeTypeEnum,
  serverAddressEnum,
  lanEnum,
  hasHomeIndicatorEnum,
  AppTypeEnum,
} from './types'
import type { IGetAllInfo, IGetDeviceP2PInfo, IGetVehicleRecordDevice } from './types'

// 异步的方式
export const dsbridgeFuncAsync = {
  jumpNativeGetData(configType: any, callback: any) {
    dsbridge.call(
      callNativeTypeEnum.callNativeDoFuncAsync,
      {
        type: 'jumpNativeGetData',
        configType,
      },
      function (result) {
        callback(JSON.parse(result))
      }
    )
  },
}

// 同步的方式
export const dsbridgeFuncSync = {
  /**
   * 获取 APP 启动基本参数
   * @returns
   */
  getAllInfo(): IGetAllInfo {
    if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '0') {
      const result = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
        type: 'getAllInfo',
      })
      console.log('dsbridge: getAllInfo', JSON.parse(result))
      return JSON.parse(result)
    } else {
      const mockResult: IGetAllInfo = {
        ucsToken: '',
        serverAddress: serverAddressEnum.DOMESTIC_UCS,
        curLan: lanEnum.EN,
        defaultLan: lanEnum.EN,
        statusBarHeight: 36,
        hasHomeIndicator: hasHomeIndicatorEnum.YES,
        AppType: AppTypeEnum.EZLIVE,
      }
      // console.log('mock dsbridge: getAllInfo', mockResult)
      return mockResult
    }
  },
  /**
   * 开启原生 loading
   */
  showLoading() {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'showLoading',
    })
  },
  // 关闭原生 loading
  dismiss() {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'dismiss',
    })
  },
  /**
   * 返回上一个原生页面, 因为当前项目为 SPA 应用，所以该方法等价于关闭整个 WEB 应用
   */
  backTo() {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'backTo',
    })
  },
  // 原生toast组件提示
  webToast(text: string) {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'webToast',
      param: text,
    })
  },
  /**
   * 根据序列号获取P2P信息
   */
  getDeviceP2PInfo(devID: string): IGetDeviceP2PInfo {
    if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '0') {
      const result = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
        type: 'getDeviceP2PInfo',
        devID,
      })
      console.log('dsbridge: getDeviceP2PInfo', JSON.parse(result))
      return JSON.parse(result)
    } else {
      const mockResult: IGetDeviceP2PInfo = {
        deviceStatus: '1',
        ip: '127.0.0.1',
        port: '15865',
        username: 'admin',
      }
      // console.log('mock dsbridge: getDeviceP2PInfo', mockResult)
      return mockResult
    }
  },
  /**
   * 获取过车记录应用的设备
   */
  getVehicleRecordDevice(): IGetVehicleRecordDevice[] {
    if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '0') {
      const result = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
        type: 'getVehicleRecordDevice',
      })
      console.log('dsbridge: getVehicleRecordDevice', JSON.parse(result))
      return JSON.parse(result)
    } else {
      const mockResult: IGetVehicleRecordDevice[] = [
        {
          deviceSerial: '210235C7K53235000018',
          deviceName: '过车记录设备NVR',
          devID: '111',
          channelList: [
            {
              channelName: '视频001',
              channelId: '1',
            },
            {
              channelName: '视频002',
              channelId: '2',
            },
            {
              channelName: '视频003',
              channelId: '3',
            },
            {
              channelName: '视频004',
              channelId: '4',
            },
          ],
        },
        {
          deviceSerial: '210235C7K53235009867',
          deviceName: 'NVR下无通道',
          devID: '222',
          channelList: [],
        },
        {
          deviceSerial: '210235C7K53235002376',
          deviceName: '模拟路口NVR',
          devID: '333',
          channelList: [
            {
              channelName: '通道1',
              channelId: '1',
            },
            {
              channelName: '通道2',
              channelId: '2',
            },
            {
              channelName: '通道3',
              channelId: '3',
            },
            {
              channelName: '通道4',
              channelId: '4',
            },
            {
              channelName: '通道5',
              channelId: '5',
            },
            {
              channelName: '通道6',
              channelId: '6',
            },
            {
              channelName: '通道7',
              channelId: '7',
            },
            {
              channelName: '通道8',
              channelId: '8',
            },
            {
              channelName: '通道9',
              channelId: '9',
            },
            {
              channelName: '通道10',
              channelId: '10',
            },
            {
              channelName: '通道11',
              channelId: '11',
            },
            {
              channelName: '通道12',
              channelId: '12',
            },
            {
              channelName: '通道1',
              channelId: '1',
            },
            {
              channelName: '通道10',
              channelId: '10',
            },
          ],
        },
      ]
      // const mockResult: IGetVehicleRecordDevice[] = []
      // console.log('mock dsbridge: getVehicleRecordDevice', mockResult)
      return mockResult
    }
  },
  // 更新设备鉴权的动态密码
  updatePWD(devID: string): string {
    if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '0') {
      const result = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
        type: 'updatePWD',
        devID,
        channelId: '0', // NOTE: 通道号为0，代表查询的是设备本身
      })
      console.log('dsbridge: updatePWD', result)
      return result
    } else {
      const mockResult = 'Admin123'
      // console.log('mock dsbridge: updatePWD', mockResult)
      return mockResult
    }
  },
  /**
   * 跳转至目标页面+传参
   * @param  Url 目标页面路径
   * @param  Extras  跳转时携带的参数
   * @param rotation 是否旋转
   */
  pageTo(Url: string, Extras: string, rotation: any, isCloudPath: number) {
    if (!(rotation == 1)) {
      rotation = 0
    }
    if (!(isCloudPath == 1)) {
      isCloudPath = 0
    }
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'pageTo',
      url: Url,
      rotation: String(rotation),
      extras: Extras,
      isCloudPath: String(isCloudPath),
    })
  },

  /**
   * 获取前一页面跳转传参内容
   * @param Url 当前页面路径
   */
  getWebParam(Url: string): any {
    const argsObj = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'getWebParam',
      url: Url,
    })
    return argsObj
  },
  /**
   * 从老容器跳转到新容器
   * @param url
   * @param extras
   * @param rotation
   */
  pageToNew(url: string, extras: string, rotation: 0 | 1 = 0) {
    dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'pageToNew',
      url,
      rotation: String(rotation),
      extras,
    })
  },
  /**
   * 从老容器跳转到新容器
   * @param url
   * @param extras
   * @param rotation
   */
  getAllDeviceTimeZone() {
    const argsObj = dsbridge.call(callNativeTypeEnum.callNativeDoFuncSync, {
      type: 'pageToNew',
    })
    return argsObj || '{}'
  },
}
