import { dsbridgeFuncSync } from '../../../dsbridge/dsbridge'
import { useDeviceInfoStore } from '@/stores/filter-condition/filter-condition'
const deviceInfoStore = useDeviceInfoStore()

import { type Ref } from 'vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
// 加载插件
dayjs.extend(utc)
dayjs.extend(timezone)

import locales from '../../../locales/locales'

export function useJumpDetail(messageList: Ref<any[]>) {
  function jumpToAlarmDetail(message: any, index: any) {
    // 获取所有设备的时区方法
    const timeZoneList: any = JSON.parse(dsbridgeFuncSync.getAllDeviceTimeZone())
    // 获取时区
    let timeZone = ''
    if (typeof timeZoneList[deviceInfoStore.currentSelectDeviceInfo!.deviceSerial] != 'undefined') {
      timeZone = timeZoneList[deviceInfoStore.currentSelectDeviceInfo!.deviceSerial]
    } else {
      // 若未从原生侧获取到时区信息则默认使用手机时区时间，时区信息不显示
      timeZone = ''
    }

    // 过车应用跳转列表
    const alarmData = []

    for (let i = 0; i < messageList.value.length; i++) {
      // 存在时区 设备时间转换成UTC时间
      const tempTime = messageList.value[i].Time
      // 根据时区将设备时间转换成UTC时间
      const orignTimeZone = timeZone.replace('GMT', '')
      const slicedTimeZone = useSliceTimeZone(orignTimeZone)
      const transferedTimeStmp = tempTime * 1000
      // 转换后的设备时区时间
      // const formattedTimeStmp = moment(transferedTimeStmp).utcOffset(slicedTimeZone)
      // 使用 day.js 处理时间戳
      const formattedTimeStmp = dayjs(transferedTimeStmp).utcOffset(slicedTimeZone).format()

      //处理显示时间
      const displayTime = handleDate(messageList.value[i].Time * 1 * 1000)
      const data = {
        alarmId: i,
        // alarmTime: messageList.value[i].Time,
        alarmTime: formattedTimeStmp,
        alarmType: messageList.value[i].Type,
        alarmName:
          locales.global.t('from') +
          ' : ' +
          deviceInfoStore.currentSelectDeviceInfo!.deviceName +
          ' - ',
        alarmTransformTime: displayTime,
        timeZone: null,
        deviceSerial: deviceInfoStore.currentSelectDeviceInfo!.deviceSerial,
        channelNo: messageList.value[i].ChannelID,
        channelName: messageList.value[i].ChannelName,
        smartInfo: null,
        plateNo:
          messageList.value[i].ObjectList[0].ObjectInfo.VehicleInfo.PlateAttributeInfo.PlateNo ||
          '- -',
        pictureList: [
          {
            index: 0,
            type: 1,
            channelNo: messageList.value[i].ChannelID,
            url: 'data:image/png;base64,' + messageList.value[i].FullPicture.Data,
          },
        ],
      }
      //判断存不存在第二张图片
      let pictureTwo = messageList.value[i].ObjectList[0].ObjectPicture.Data
      if (pictureTwo && pictureTwo !== '') {
        pictureTwo = 'data:image/png;base64,' + pictureTwo
        data.pictureList.push({
          index: 0,
          type: 1,
          channelNo: messageList.value[i].ChannelID,
          url: pictureTwo,
        })
      }
      alarmData.push(data)
    }

    if (import.meta.env.VITE_APP_ISMOCK_DSBRIDGE === '1') {
      dsbridgeFuncSync.pageTo(
        'web/AppH5/index.html#/alarmDetail',
        JSON.stringify({
          list: alarmData,
          currentIndex: index,
        }),
        '',
        0
      )
    } else {
      dsbridgeFuncSync.pageTo(
        'web/AppH5/index.html#/alarmDetail',
        JSON.stringify({
          list: alarmData,
          currentIndex: index,
        }),
        '',
        0
      )
    }
  }

  // 将UTC+08:00格式的时区截取为+08:00格式以供moment库转换
  function useSliceTimeZone(timeZone: string) {
    const match = timeZone.match(/[+-]\d{2}:\d{2}/)
    const slicedTimeZone: string = match ? match[0] : ''
    return slicedTimeZone
  }

  function handleDate(times: any) {
    const date = new Date(times)

    // 获取年、月、日、时、分、秒
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，所以加 1
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    // 构建格式化的字符串
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return formattedDate
  }

  return {
    jumpToAlarmDetail,
  }
}
