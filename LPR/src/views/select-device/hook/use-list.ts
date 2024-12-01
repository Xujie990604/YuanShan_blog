import type { Ref } from 'vue'

/**
 * van-pull-refresh 组件下拉刷新功能的开启/禁止
 */
export function useListRefreshDisabled(listRefName: string) {
  const refreshDisabled = ref(false)
  const scrollTop = ref<number>(0)
  const deviceListRef = useTemplateRef<HTMLDivElement>(listRefName)

  onMounted(() => {
    scrollTop.value = deviceListRef.value?.scrollTop || 0
    if (deviceListRef.value) {
      deviceListRef.value.addEventListener('scroll', () => {
        scrollTop.value = deviceListRef.value?.scrollTop || 0
      })
    }
  })

  watch(scrollTop, () => {
    if (scrollTop.value <= 0) {
      refreshDisabled.value = false
    } else {
      refreshDisabled.value = true
    }
  })

  return {
    refreshDisabled,
  }
}

import type { IDeviceInfo } from '../../../stores/filter-condition/types'
import { useDeviceInfoStore } from '@/stores/filter-condition/filter-condition'
const deviceInfoStore = useDeviceInfoStore()
const { addCptProp, deviceInfoIncludesKeyword } = deviceInfoStore
const { deviceListInfo } = storeToRefs(deviceInfoStore)
import { dsbridgeFuncSync } from '../../../dsbridge//dsbridge'

/**
 * van-pull-refresh 组件下拉刷新事件
 */
export function useListRefreshEvent(deviceList: Ref<IDeviceInfo[]>, deviceSearch: Ref<string>) {
  // 下拉刷新功能
  const refreshLoading = ref(false)
  function onRefresh() {
    setTimeout(() => {
      deviceListInfo.value = addCptProp(dsbridgeFuncSync.getVehicleRecordDevice())
      deviceList.value = [...deviceListInfo.value]
      refreshLoading.value = false
      deviceSearch.value = ''
    }, 500)
  }

  return {
    refreshLoading,
    onRefresh,
  }
}

import { debounce } from '../../../utils/common-utils'

/**
 * 设备列表的本地筛选
 */
export function useListSearchByKeyword(deviceList: Ref<IDeviceInfo[]>) {
  // 搜索框输入功能
  const deviceSearch = ref('')
  function search() {
    deviceList.value = deviceInfoIncludesKeyword(deviceSearch)
  }
  const debounceSearch = debounce(search, 600)
  watch(deviceSearch, () => debounceSearch())

  return {
    deviceSearch,
  }
}
