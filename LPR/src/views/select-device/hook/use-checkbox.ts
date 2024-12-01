import type { IDeviceInfo } from '../../../stores/filter-condition/types'
import type { Ref } from 'vue'

/**
 * checkbox 全选 & 不确定状态
 */
export function useCheckboxStatus(deviceList: Ref<IDeviceInfo[]>) {
  /**
   * 全选按钮的点击绑定事件
   */
  function checkAllChange(val: boolean, deviceSerial: string) {
    const curDevice = deviceList.value.find(item => item.deviceSerial === deviceSerial)
    if (curDevice) {
      curDevice.checkedChannelIdList = val ? curDevice.channelList.map(item => item.channelId) : []
      curDevice.isIndeterminate = false
    }
  }

  /**
   * 复选框组的 change 绑定事件
   */
  function checkedChannelListChange(channelIdList: string[], deviceSerial: string) {
    const curDevice = deviceList.value.find(item => item.deviceSerial === deviceSerial)
    if (curDevice) {
      curDevice.isCheckAll = channelIdList.length === curDevice.channelList.length
      curDevice.isIndeterminate =
        channelIdList.length > 0 && channelIdList.length < curDevice.channelList.length
    }
  }

  return {
    checkAllChange,
    checkedChannelListChange,
  }
}
