<template>
  <div class="index-page">
    <div class="title">
      <img
        class="left-icon"
        src="../../assets/images/base-image/back.png"
        alt=""
        @click="closeWebAPP" />
    </div>

    <div class="page-content">
      <div class="card-title">{{ $t('carRecord') }}</div>
      <div class="select-device-title">{{ $t('captureDevice') }}</div>
      <div
        class="select-device-content"
        @click="() => router.push({ path: '/select-device' })">
        <input
          v-model="deviceValue"
          class="device-input"
          type="text"
          readonly
          :placeholder="$t('tipSelectCaptureDevice')"
          style="height: 40px; border: 0" />
        <img
          class="select-device-img"
          src="@/assets/images/base-image/selectCondition.png"
          alt="" />
      </div>

      <div class="select-time-title">{{ $t('captureTime') }}</div>
      <div
        class="select-time-content"
        @click="showTimeSelect">
        <div class="time-left">{{ startTimeValue }}</div>
        <div class="time-middle">{{ lineStr }}</div>
        <div class="time-right">{{ endTimeValue }}</div>
      </div>

      <div
        class="more-select-condition"
        :disabled="useDeviceInfo.selectDevicesString.length === 0"
        @click="gotoChooseMore()">
        <div
          class="select-condition-text"
          :class="{ textChoose: hasChange }">
          {{ $t('moreFilter') }}
        </div>
        <!-- <img
          class="select-condition-img"
          src="@/assets/images/base-image/selectCondition.png"
          alt="" /> -->
      </div>

      <van-button
        class="select-button"
        round
        type="success"
        :disabled="useDeviceInfo.selectDevicesString.length === 0"
        @click="() => router.push({ path: '/message-list' })"
        >{{ $t('searchAlarm') }}</van-button
      >
    </div>
  </div>

  <van-popup
    v-model:show="show"
    style="height: 424px; border-radius: 24px 24px 0 0"
    position="bottom">
    <template #default>
      <div class="popup-header">
        <span class="popup-title">{{ $t('selectTime') }}</span>
        <img
          class="close-img"
          src="@/assets/images/base-image/close.png"
          @click="closePopup" />
      </div>
      <!-- 弹出层的主要内容 -->
      <timeSelection @change-date-time="changeTime" />
    </template>
  </van-popup>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import timeSelection from '@/views/vehicle-pass-record/time-selection.vue'
  import {
    useTimeStore,
    useDeviceInfoStore,
    useMoreFilterConditionStore,
  } from '@/stores/filter-condition/filter-condition'
  // import { getNowTime } from '@/utils/date-utils'
  import { showDeviceTimeStore } from '@/stores/filter-condition/filter-condition'
  const showStore = showDeviceTimeStore()
  const useMoreFilterCondition = useMoreFilterConditionStore()
  const hasChange = ref<boolean>(false)
  onMounted(() => {
    const contionData = useMoreFilterCondition.moreFilterCondition
    if (
      contionData.vehicleBrand.length > 0 ||
      contionData.vehicleColor.length > 0 ||
      contionData.vehicleNumber !== '' ||
      contionData.vehicleType.length > 0
    ) {
      hasChange.value = true
    } else {
      hasChange.value = false
    }
  })

  const useTime = useTimeStore()

  const useDeviceInfo = useDeviceInfoStore()
  const deviceValue = ref(useDeviceInfo.selectDevicesString)

  // 初始化 抓拍时间
  const startTimeValue = ref(useTime.startDateTime)
  const endTimeValue = ref(useTime.endDateTime)
  const lineStr = ref('~')

  const show = ref(false)
  const showTimeSelect = () => {
    show.value = true
  }

  // 时间筛选后 改变时间框的值
  function changeTime() {
    show.value = false
    startTimeValue.value = useTime.startDateTime
    endTimeValue.value = useTime.endDateTime
  }

  function closePopup() {
    show.value = false
  }

  import { dsbridgeFuncSync } from '@/dsbridge/dsbridge'
  function closeWebAPP() {
    localStorage.removeItem('appInfo')
    localStorage.removeItem('deviceInfo')
    localStorage.removeItem('moreFilterCondition')
    dsbridgeFuncSync.backTo()
  }
  function gotoChooseMore() {
    showStore.showdevicetime = false
    router.push({ path: '/choose-page' })
  }
</script>

<style scoped lang="scss">
  .index-page {
    display: flex;
    height: calc(100vh - var(--status-bar-height) - var(--home-indicator-height));
    background-color: #f3f4f7;
    background-image: url('../../assets/images/application-bg.png');
    background-size: cover;
    flex-direction: column;
    align-items: center;
    padding: {
      top: var(--status-bar-height) !important;
      bottom: var(--home-indicator-height) !important;
    }
  }

  .title {
    width: 100%;
    height: 44px;
  }

  .left-icon {
    width: 24px;
    height: 24px;
    margin-top: 10px;
    margin-left: 16px;
  }

  .page-content {
    display: flex;
    width: 92%;
    height: 473px;
    margin: 25px auto 0;
    background-image: url('../../assets/images/bg-card.png');
    background-size: cover;
    border-radius: 16px;
    flex-direction: column;

    .card-title {
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;
      margin: {
        top: 17vw;
        left: 16px;
      }
    }
  }

  .van-popup {
    height: 424px;
    padding: 0;
  }

  .select-device-title {
    margin: 72px 0 8px 16px;
    margin-bottom: 8px;
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: 400;
    color: rgb(0 0 0 / 40%);
  }

  .select-device-content {
    display: flex;
    justify-content: space-between;
    height: 43px;
    margin: 0 16px 42px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;
    letter-spacing: 0;
    color: rgb(0 0 0 / 90%);
    text-align: right;
    border-bottom: 0.8px solid rgb(0 0 0 / 8%);
    align-items: center;
  }

  .device-input {
    flex: 1 1 auto;
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 使用省略号表示超长文本 */
    white-space: nowrap; /* 保持文本在一行显示 */
  }

  .select-device-img {
    width: 7px;
    height: 12px;
    margin-right: 8px;
  }

  .select-time-title {
    height: 14px;
    margin-bottom: 8px;
    margin-left: 16px;
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    color: rgb(0 0 0 / 40%);
  }

  .select-time-content {
    display: flex;
    justify-content: space-between;
    height: 43px;
    margin: 0 16px 16px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;
    letter-spacing: 0;
    color: rgb(0 0 0 / 90%);
    text-align: right;
    border-bottom: 0.8px solid rgb(0 0 0 / 8%);
  }

  .time-middle {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: 400;
    color: rgb(0 0 0 / 40%);
  }

  .more-select-condition {
    display: flex;
    height: 22px;
    margin-bottom: 24px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: 400;
    color: rgb(0 0 0 / 90%);
    text-align: center;
    justify-content: space-between;
    align-items: center;
  }

  .select-condition-text {
    display: flex;
    width: 166px;
    height: 32px;
    // flex: 1 1 auto;
    // margin-right: 8px;
    margin: 0 auto;
    text-align: center;
    background: rgb(0 0 0 / 5%);
    border-radius: 22px;
    align-items: center;
    justify-content: center;
  }

  .textChoose {
    display: flex;
    width: 166px;
    height: 32px;
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: 400;
    color: #2a9bff;
    text-align: center;
    background: rgb(42 155 255 / 8%) !important;
    border: 1px solid #2a9bff;
    border-radius: 22px;
    align-items: center;
    justify-content: center;
  }

  .select-condition-img {
    width: 7px;
    height: 12px;
    margin-right: 24px;
  }

  .select-button {
    width: 90%;
    height: 44px;
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: 0;
    color: rgb(255 255 255);
    text-align: center;
    background: rgb(41 147 206);
    border: 0;
    border-radius: 22px;
  }

  .popup-header {
    display: flex;
    height: 56px;
    background-color: rgb(255 255 255);
    align-items: center;
    justify-content: space-between;
  }

  .popup-title {
    margin-left: 24px;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    font-weight: 500;
    line-height: 56px;
    color: rgb(0 0 0 / 90%);
    text-align: center;
    flex: 1 1 auto;
  }

  .popup-close {
    cursor: pointer;
  }

  .close-img {
    width: 24px;
    height: 24px;
    margin-right: 24px;
  }
</style>
