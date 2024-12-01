import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { dsbridgeFuncSync } from '../../dsbridge/dsbridge'
import { getNowTime } from '@/utils/date-utils'

export const useTimeStore = defineStore(
  'time',
  () => {
    const getCurrentTime = getNowTime()
    const startDateTime = ref(
      getCurrentTime.startDate[0] +
        '/' +
        getCurrentTime.startDate[1] +
        '/' +
        getCurrentTime.startDate[2] +
        ' ' +
        getCurrentTime.startTime[0] +
        ':' +
        getCurrentTime.startTime[1]
    )

    const endDateTime = ref(
      getCurrentTime.endDate[0] +
        '/' +
        getCurrentTime.endDate[1] +
        '/' +
        getCurrentTime.endDate[2] +
        ' ' +
        getCurrentTime.endTime[0] +
        ':' +
        getCurrentTime.endTime[1]
    )

    function formatStart(startDate: string[], startTime: string[]) {
      startDateTime.value =
        startDate[0] +
        '/' +
        startDate[1] +
        '/' +
        startDate[2] +
        ' ' +
        startTime[0] +
        ':' +
        startTime[1]
    }

    function formatEnd(endDate: string[], endTime: string[]) {
      endDateTime.value =
        endDate[0] + '/' + endDate[1] + '/' + endDate[2] + ' ' + endTime[0] + ':' + endTime[1]
    }

    const startTimeStamp = computed(() => {
      return Math.floor(new Date(startDateTime.value).getTime() / 1000)
    })

    const endTimeStamp = computed(() => {
      return Math.floor(new Date(endDateTime.value).getTime() / 1000)
    })

    const startTimeUtc = computed(() => {
      return new Date(startDateTime.value).toUTCString()
    })

    const endTimeUtc = computed(() => {
      return new Date(endDateTime.value).toUTCString()
    })

    return {
      startDateTime,
      endDateTime,
      formatStart,
      formatEnd,
      startTimeStamp,
      endTimeStamp,
      startTimeUtc,
      endTimeUtc,
    }
  },
  {
    persist: true,
  }
)

import type { IGetVehicleRecordDevice } from '../../dsbridge/types'
import type { IDeviceInfo } from './types'
export const useDeviceInfoStore = defineStore(
  'deviceInfo',
  () => {
    /**
     * NVR 设备 + 通道信息
     */
    const deviceListInfo = ref<IDeviceInfo[]>([])

    deviceListInfo.value = addCptProp(dsbridgeFuncSync.getVehicleRecordDevice())
    function addCptProp(list: IGetVehicleRecordDevice[]) {
      return list.map(item => {
        return {
          ...item,
          isCheckAll: false,
          isIndeterminate: false,
          disabled: false,
          checkedChannelIdList: [],
        } as IDeviceInfo
      })
    }

    /**
     * 当前被选中 NVR + 通道 信息
     */
    const currentSelectDeviceInfo = computed(() =>
      deviceListInfo.value.find(item => item.checkedChannelIdList.length !== 0)
    )

    /**
     * 当前被选中 NVR + 通道名称
     */
    const selectDevicesString = computed(() => {
      if (currentSelectDeviceInfo.value === undefined) {
        return ''
      } else {
        return [
          currentSelectDeviceInfo.value.deviceName,
          ...currentSelectDeviceInfo.value.channelList.map(channel => {
            if (currentSelectDeviceInfo.value!.checkedChannelIdList.includes(channel.channelId)) {
              return channel.channelName
            } else {
              return ''
            }
          }),
        ]
          .filter(item => item !== '')
          .join(', ')
      }
    })

    /**
     * 包含关键字的 NVR + 通道 信息
     */

    const deviceInfoIncludesKeyword = (key: Ref<string>): IDeviceInfo[] => {
      if (key.value === '') {
        return deviceListInfo.value
      } else {
        return deviceListInfo.value.filter(
          item =>
            item.deviceName.includes(key.value) ||
            item.channelList.some(channel => channel.channelName.includes(key.value))
        )
      }
    }

    return {
      deviceListInfo,
      currentSelectDeviceInfo,
      selectDevicesString,
      deviceInfoIncludesKeyword,
      addCptProp,
    }
  },
  {
    persist: true,
  }
)

import type { IMoreFilterConditionStore } from './types'
export const useMoreFilterConditionStore = defineStore(
  'moreFilterCondition',
  () => {
    const moreFilterCondition = ref<IMoreFilterConditionStore>({
      vehicleBrand: [],
      vehicleColor: [],
      vehicleNumber: '',
      vehicleType: [],
      vehicleChooseTime: '',
    })
    return { moreFilterCondition }
  },
  {
    persist: true,
  }
)

export const showDeviceTimeStore = defineStore(
  'showDeviceTime',
  () => {
    const showDeviceTime = ref<boolean>(false)
    return {
      showDeviceTime,
    }
  },
  {
    persist: true,
  }
)
