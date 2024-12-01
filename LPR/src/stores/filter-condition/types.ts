export interface IMoreFilterConditionStore {
  vehicleNumber: string
  vehicleColor: string[]
  vehicleType: string[]
  vehicleBrand: string[]
  vehicleChooseTime: string
}

import type { IGetVehicleRecordDevice } from '../../dsbridge/types'

export interface IDeviceInfo extends IGetVehicleRecordDevice {
  isCheckAll: boolean
  isIndeterminate: boolean
  checkedChannelIdList: string[]
  disabled: boolean
}
