<template>
  <div class="time-tab">
    <div
      class="start-time-tab"
      :class="{ isActive: timeTab === 0 }"
      @click="selectStartTimeTab">
      <div class="start-time-text">{{ $t('startTime') }}</div>
      <div :class="{ isColorActive: timeTab === 0 }"></div>
    </div>
    <div
      class="end-time-tab"
      :class="{ isActive: timeTab === 1 }"
      @click="selectEndTimeTab">
      <div class="end-time-text">{{ $t('endTime') }}</div>
      <div :class="{ isColorActive: timeTab === 1 }"></div>
    </div>
  </div>

  <van-date-picker
    v-if="timeTab === 0"
    v-model="startDate"
    :show-toolbar="false"
    :min-date="minDate"
    :max-date="maxDate"
    option-height="40px"
    visible-option-num="3" />
  <van-time-picker
    v-if="timeTab === 0"
    v-model="startTime"
    :show-toolbar="false"
    option-height="40px"
    visible-option-num="3" />

  <van-date-picker
    v-if="timeTab === 1"
    v-model="endDate"
    :show-toolbar="false"
    :min-date="minDate"
    :max-date="maxDate"
    option-height="40px"
    visible-option-num="3"
    @change="changeMaxTime" />
  <van-time-picker
    v-if="timeTab === 1"
    v-model="endTime"
    :show-toolbar="false"
    :max-time="maxTime"
    option-height="40px"
    visible-option-num="3" />
  <div class="confirm-button-border">
    <van-button
      class="confirm-button"
      round
      type="primary"
      @click="confirmEvent"
      >{{ $t('confirm') }}</van-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { getNowTime } from '@/utils/date-utils'
  import { useTimeStore } from '@/stores/filter-condition/filter-condition'
  import { showDialog } from 'vant'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const getCurrentTime = getNowTime()
  const useTime = useTimeStore()

  const startTime = ref([...getCurrentTime.startTime])
  const endTime = ref([...getCurrentTime.endTime])
  const startDate = ref([...getCurrentTime.startDate])
  const endDate = ref([...getCurrentTime.endDate])
  // const startTime = [getCurrentTime.startTime[0],getCurrentTime.startTime[0]]

  const minDate = ref(new Date(2020, 0, 1))
  // const maxDate = ref(new Date(2025, 5, 1))
  const maxDateNumber = [...getCurrentTime.endDate].map(item => Number(item))
  const maxDate = ref(new Date(maxDateNumber[0], maxDateNumber[1] - 1, maxDateNumber[2]))
  const maxTime = ref(getCurrentTime.endTime.join(':'))

  function changeMaxTime() {
    for (let i = 0; i < [...getCurrentTime.endDate].length; i++) {
      if ([...getCurrentTime.endDate][i] != endDate.value[i]) {
        maxTime.value = '23:59'
        return maxTime
      }
    }
    maxTime.value = getCurrentTime.endTime.join(':')
  }

  const timeTab = ref(0)

  const selectStartTimeTab = () => {
    timeTab.value = 0
  }

  const selectEndTimeTab = () => {
    timeTab.value = 1
  }
  const emit = defineEmits(['changeDateTime'])
  function confirmEvent() {
    useTime.formatStart(startDate.value, startTime.value)
    useTime.formatEnd(endDate.value, endTime.value)
    if (useTime.startTimeStamp < useTime.endTimeStamp) {
      emit('changeDateTime')
    } else {
      showDialog({
        message: t('selectTimeErrorTip'),
      }).then(() => {
        // on close
      })
    }
  }
</script>

<style scoped lang="scss">
  .time-tab {
    display: flex;
    height: 48px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
    text-align: center;
    justify-content: space-between;
  }

  .start-time-tab {
    display: flex;
    margin-left: 16px;
    text-align: center;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
  }

  .start-time-text {
    line-height: 36px;
  }

  .end-time-tab {
    display: flex;
    margin-right: 24px;
    text-align: center;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
  }

  .end-time-text {
    line-height: 36px;
  }

  .isActive {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgb(41 147 206);
  }

  .isColorActive {
    width: 48px;
    height: 2px;
    background-color: rgb(41 147 206);
  }

  .confirm-button-border {
    display: flex;
  }

  .confirm-button {
    width: 327px;
    height: 44px;
    margin: 0 auto;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    color: rgb(255 255 255);
    text-align: center;
    background-color: rgb(41 147 206);
  }
</style>
