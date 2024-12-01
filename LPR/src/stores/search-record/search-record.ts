import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchRecordStore = defineStore(
  'searchRecord',
  () => {
    const searchRecord = ref<string[]>(['鲁A12345', '鲁B12345', '鲁C12345', '鲁D12345', '浙', '1'])

    function setSearchRecord(data: string) {
      if (searchRecord.value.includes(data)) {
        return -1
      }
      if (data === '') {
        return -1
      }
      if (searchRecord.value.length < 10) {
        searchRecord.value.push(data)
      } else {
        searchRecord.value.shift()
        searchRecord.value.push(data)
      }
    }

    function clearSearchRecord() {
      searchRecord.value = []
    }

    return {
      searchRecord,
      setSearchRecord,
      clearSearchRecord,
    }
  },
  {
    persist: true,
  }
)
