<template>
  <div class="search-record">
    <div class="search-record-title">
      <div class="title-text">{{ $t('searchRecord') }}</div>
      <img
        v-if="searchRecord.length > 0"
        class="clear-icon"
        src="../../../assets/images/clear.png"
        @click="handleClearIconClick" />
    </div>
    <div class="search-record-content">
      <div
        v-for="item in searchRecord"
        :key="item"
        class="record-text text-omit"
        @click="handleClickRecord(item)">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useSearchRecordStore } from '../../../stores/search-record/search-record'
  import { storeToRefs } from 'pinia'
  const searchRecordStore = useSearchRecordStore()
  const { searchRecord } = storeToRefs(searchRecordStore)
  const { clearSearchRecord } = searchRecordStore
  import { showConfirmDialog } from 'vant'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const emit = defineEmits<{
    (e: 'searchByRecord', record: string): void
  }>()

  function handleClearIconClick() {
    showConfirmDialog({
      message: t('deleteRecordTip'),
      confirmButtonText: t('confirm'),
      cancelButtonText: t('cancel'),
    })
      .then(() => {
        clearSearchRecord()
      })
      .catch(() => {})
  }

  import { useMoreFilterConditionStore } from '../../../stores/filter-condition/filter-condition'
  const moreFilterConditionStore = useMoreFilterConditionStore()
  function handleClickRecord(record: string) {
    moreFilterConditionStore.moreFilterCondition.vehicleNumber = record
    emit('searchByRecord', record)
  }
</script>

<style scoped lang="scss">
  .search-record {
    display: flex;
    flex-direction: column;
    padding: 12px 24px;

    &-title {
      display: flex;
      width: 100%;
      justify-content: space-between;

      .title-text {
        font-size: 17px;
        font-weight: 500;
        color: rgb(0 0 0 / 90%);
      }

      .clear-icon {
        width: 24px;
        height: 24px;
      }
    }

    &-content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;

      .record-text {
        max-width: 100%;
        padding: 4px 10px;
        margin-right: 8px;
        margin-bottom: 8px;
        font-size: 16px;
        color: rgb(0 0 0 / 60%);
        background-color: #fff;
        border-radius: 8px;
      }
    }
  }
</style>
