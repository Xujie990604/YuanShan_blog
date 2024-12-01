import {
  useTimeStore,
  useDeviceInfoStore,
  useMoreFilterConditionStore,
} from '@/stores/filter-condition/filter-condition'
const timeStore = useTimeStore()
const deviceInfoStore = useDeviceInfoStore()
const moreFilterConditionStore = useMoreFilterConditionStore()

import {
  startObjectSearchRequest,
  getMessageListRequest,
  getSearchProgressRequest,
  stopSearchRequest,
} from '@/service/request/request'

import { type Ref } from 'vue'
export function useMessageRequest(refreshLoading: Ref<boolean>) {
  /** 搜索ID */
  const SearchID = ref<undefined | number>(undefined)
  /** 任务启动进度 */
  const progress = ref(0)
  /** 消息总数 */
  const total = ref(0)

  /** 过车记录消息列表 */
  const messageList = ref<any[]>([])

  /** 是否处于请求状态(eg: 底部加载请求、下拉加载请求、关键字检索请求)*/
  const messageLoading = ref(false)
  /** 是否处于底部加载状态 */
  const listBottomLoading = ref(false)
  const listFinished = ref(false)
  const listError = ref(false)

  // 根据各类筛选条件，拼凑出接口的入参
  function createSearchParam() {
    //设备 时间4 车牌号23 车辆类型24 车辆颜色25 车辆品牌72 通道ID35
    // NOTE：只查询 "车牌识别" 告警
    const QueryInfos = [
      {
        QryType: 8,
        QryCondition: 0,
        QryData: 'VehicleDetect',
      },
      {
        QryType: 97,
        QryCondition: 0,
        QryData: '4',
      },
    ]
    if (deviceInfoStore.currentSelectDeviceInfo) {
      //通道
      const queryInfo = {
        QryType: 35,
        QryCondition: 7,
        QryData: deviceInfoStore.currentSelectDeviceInfo.checkedChannelIdList.join(','),
      }
      QueryInfos.push(queryInfo)
    }
    if (timeStore.startDateTime && timeStore.endDateTime) {
      //时间
      const queryInfo = {
        QryType: 4,
        QryCondition: 3,
        QryData: String(timeStore.startTimeStamp),
      }
      const queryInfoEnd = {
        QryType: 4,
        QryCondition: 4,
        QryData: String(timeStore.endTimeStamp),
      }
      QueryInfos.push(queryInfo)
      QueryInfos.push(queryInfoEnd)
    }
    if (moreFilterConditionStore.moreFilterCondition.vehicleBrand.length > 0) {
      for (const info of moreFilterConditionStore.moreFilterCondition.vehicleBrand) {
        let tempList = []
        if (info.includes('-')) {
          tempList = info.split('-')
          for (const temp of tempList) {
            const queryInfo = {
              QryType: 72,
              QryCondition: 0,
              QryData: temp,
            }
            QueryInfos.push(queryInfo)
          }
        } else {
          const queryInfo = {
            QryType: 72,
            QryCondition: 0,
            QryData: info,
          }
          QueryInfos.push(queryInfo)
        }
      }
    }
    if (moreFilterConditionStore.moreFilterCondition.vehicleColor.length > 0) {
      for (const info of moreFilterConditionStore.moreFilterCondition.vehicleColor) {
        const queryInfo = {
          QryType: 25,
          QryCondition: 0,
          QryData: info,
        }
        QueryInfos.push(queryInfo)
      }
    }
    if (moreFilterConditionStore.moreFilterCondition.vehicleType.length > 0) {
      for (const info of moreFilterConditionStore.moreFilterCondition.vehicleType) {
        const queryInfo = {
          QryType: 24,
          QryCondition: 0,
          QryData: info,
        }
        QueryInfos.push(queryInfo)
      }
    }
    if (moreFilterConditionStore.moreFilterCondition.vehicleNumber) {
      const queryInfo = {
        QryType: 23,
        QryCondition: 6,
        QryData: moreFilterConditionStore.moreFilterCondition.vehicleNumber,
      }
      QueryInfos.push(queryInfo)
    }
    console.table(QueryInfos)
    return { QueryInfos, Num: QueryInfos.length }
  }

  /**
   * 查询进度是否到 100
   */
  function completedSearch() {
    let setIntervalId: undefined | number = undefined
    let count = 0
    const MAX_COUNT = 5
    // TODO: 多少 ms 查一次，查询多长时间算超时
    // TODO：能否优化成，第一次不等待，直接进行查询
    return new Promise((resolve, reject) => {
      setIntervalId = setInterval(async () => {
        try {
          const SearchResult = await getSearchProgressRequest(SearchID.value as number, { loading: false })
          count++
          console.log('单次查询进度成功')
          progress.value = SearchResult.Percent
        } catch (error) {
          console.log('单次查询进度失败')
          clearInterval(setIntervalId)
          reject(error)
        }

        if (progress.value === 100 && count <= MAX_COUNT) {
          console.log('在规定次数内查询到结果')
          clearInterval(setIntervalId)
          resolve('')
        } else if (progress.value < 100 && count === 5) {
          console.log('查询次数超出限制')
          clearInterval(setIntervalId)
          reject()
        }
      }, 1000)
    })
  }


  async function requestMessage() {
    // 一、开启查询任务
    SearchID.value = undefined
    const startSearch = await startObjectSearchRequest(createSearchParam(), { loading: false })
    SearchID.value = startSearch.SearchID

    // 二、检查查询进度
    progress.value = 0
    await completedSearch()

    // 三、获取消息列表
    const newMessageList = await getMessageListRequest(
      SearchID.value,
      10,
      messageList.value.length,
      {
        loading: false,
      }
    )
    total.value = newMessageList.Total
    messageList.value.push(...newMessageList.SmartObjectInfoList)
    listBottomLoading.value = false
    messageLoading.value = false

    // 四，关闭查询任务
    await stopSearchRequest(SearchID.value, { loading: false })
  }

  async function loadMoreMessage() {
    messageLoading.value = true
    await requestMessage()
      .then(() => {
        console.log('查询成功，当前的消息列表', messageList.value)
      })
      .catch(error => {
        console.log('查询出错，关闭任务', error)
        if (SearchID.value !== undefined) {
          stopSearchRequest(SearchID.value, { loading: false })
        }
        listError.value = true
        listBottomLoading.value = false
        messageLoading.value = false
      })

    if (messageList.value.length >= total.value) {
      listFinished.value = true
    }

    // 如果是下拉刷新，则下拉刷新置为关闭状态
    if (refreshLoading.value) {
      refreshLoading.value = false
    }
  }


  return {
    messageList,
    messageLoading,
    listBottomLoading,
    listFinished,
    listError,
    loadMoreMessage,
  }
}
