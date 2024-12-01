<template>
  <div class="choose-page">
    <basePageTitle :title="$t('filterPage')"></basePageTitle>
    <div class="slideDown">
      <div
        v-show="showDevice"
        class="textDevice">
        {{ $t('tipSelectCaptureDevice') }}
      </div>
      <div
        v-show="showDevice"
        class="linel">
        <div class="choosedevice">
          <div class="text">{{ currentDevice }}</div>
          <img
            class="select-condition-img"
            src="@/assets/images/base-image/selectCondition.png"
            alt=""
            @click="gotoSelectDevice" />
        </div>
        <div class="line"></div>
      </div>
      <div
        v-show="showDevice"
        class="textDevice">
        {{ $t('captureTime') }}
      </div>
      <captureTimeBox
        v-show="showDevice"
        class="timebox"
        :current-time="currentTime"
        @send-capture-time="saveTime"></captureTimeBox>
      <div class="textDevice">{{ $t('carNumber') }}</div>
      <div class="linel">
        <input
          v-model="updataNum"
          type="text"
          class="input1"
          :placeholder="$t('inputCarNumberTip')" />
        <div class="line"></div>
      </div>
      <div class="inputLine"></div>
      <div class="textDevice">{{ $t('carColor') }}</div>
      <carColor
        :key="key"
        class="timebox"
        :current-color="currentColor"
        @send-car-color="saveColor"></carColor>
      <div class="carlogo">
        <div class="textDevice">{{ $t('carType') }}</div>
        <!-- <img
        @click="carTypeIndex"
        class="select-condition-img"
        src="@/assets/images/base-image/selectCondition.png"
        alt="" /> -->
      </div>
      <cartype
        :key="key"
        class="timebox"
        :current-type="currentType"
        @send-car-type="saveType"></cartype>
      <div class="carlogo">
        <div class="textDevice">{{ $t('carBrand') }}</div>
        <div>
          <span class="multNum">
            {{ updataLogo.length ? '+' + updataLogo.length : '' }}
          </span>
          <img
            class="select-condition-img"
            src="@/assets/images/base-image/selectCondition.png"
            alt=""
            @click="carTypeIndex" />
        </div>
      </div>
      <carlogo
        :key="key"
        class="timebox"
        :current-logo="currentLogo"
        @send-car-logo="saveCarLogo"></carlogo>
      <div class="button">
        <van-button
          class="buttonStyle"
          round
          @click="Empty"
          >{{ $t('clear') }}</van-button
        >
        <van-button
          type="primary"
          class="buttonStyle"
          round
          color="#2993CE"
          @click="submitInfo"
          >{{ $t('confirm') }}</van-button
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  // 抓拍时间
  import captureTimeBox from './cpts/captureTimeModule.vue'
  // 车辆颜色
  import carColor from './cpts/carColorModule.vue'
  // 车辆类型
  import cartype from './cpts/carTypes.vue'
  // 车辆品牌
  import carlogo from './cpts/carLogo.vue'
  import { useRouter } from 'vue-router'
  import { onMounted, ref } from 'vue'
  import { getPastNow } from '@/utils/date-utils'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  import { showDeviceTimeStore } from '@/stores/filter-condition/filter-condition'
  const showStore = showDeviceTimeStore()
  // const pastNowDate = getPastNow()
  const router = useRouter()
  function carTypeIndex() {
    router.push('/car-type-choose')
  }

  // 仓库信息
  import {
    useMoreFilterConditionStore,
    useDeviceInfoStore,
    useTimeStore,
  } from '@/stores/filter-condition/filter-condition'
  const showDevice = ref<boolean>(false)
  onMounted(() => {
    showDevice.value = showStore.showdevicetime
  })
  const store = useMoreFilterConditionStore()
  const currentTime = ref<any>('')
  const currentColor = ref<any>([])
  const currentType = ref<any>([])
  const currentLogo = ref<any>([])
  const key = ref<number>(0)

  const useDeviceInfo = useDeviceInfoStore()
  const useTimeInfo = useTimeStore()

  const currentDevice = ref(useDeviceInfo.selectDevicesString)

  // 筛选信息选择
  const updataNum = ref<any>('')
  const updataTime = ref('')
  const updataColor = ref<any>([])
  const updataType = ref<any>([])
  const updataLogo = ref<any>([])

  // currentTime.value = ref(useTimeInfo.startDateTime) //待处理
  updataNum.value = store.moreFilterCondition.vehicleNumber

  currentColor.value = store.moreFilterCondition.vehicleColor
  updataColor.value = store.moreFilterCondition.vehicleColor

  currentType.value = store.moreFilterCondition.vehicleType
  updataType.value = store.moreFilterCondition.vehicleType

  currentLogo.value = store.moreFilterCondition.vehicleBrand
  updataLogo.value = store.moreFilterCondition.vehicleBrand

  currentTime.value = store.moreFilterCondition.vehicleChooseTime
  updataTime.value = store.moreFilterCondition.vehicleChooseTime

  // 从子组件获取数据
  function saveTime(value: any) {
    console.log(value)
    updataTime.value = value
  }
  function saveColor(value: any) {
    updataColor.value = value
  }
  function saveType(value: any) {
    console.log(value)
    updataType.value = value
  }
  function saveCarLogo(value: any) {
    updataLogo.value = value
  }

  function submitInfo() {
    if (currentDevice.value || (!showDevice.value && !currentDevice.value)) {
      // if (updataTime.value) {
      store.moreFilterCondition.vehicleChooseTime = updataTime.value
      switch (updataTime.value) {
        case '0':
          // 开始时间三天前
          useTimeInfo.formatStart(getPastNow(3).pastDate, getPastNow(3).startTime)
          // 结束时间当前
          useTimeInfo.formatEnd(getPastNow(3).nowDate, getPastNow(3).endTime)

          break
        case '1':
          useTimeInfo.formatStart(getPastNow(7).pastDate, getPastNow(7).startTime)
          useTimeInfo.formatEnd(getPastNow(7).nowDate, getPastNow(7).endTime)
          break
        case '2':
          useTimeInfo.formatStart(getPastNow(30).pastDate, getPastNow(30).startTime)
          useTimeInfo.formatEnd(getPastNow(30).nowDate, getPastNow(30).endTime)
          break

        default:
      }
      store.moreFilterCondition.vehicleNumber = updataNum.value
      store.moreFilterCondition.vehicleColor = updataColor.value
      store.moreFilterCondition.vehicleType = updataType.value
      store.moreFilterCondition.vehicleBrand = updataLogo.value
      router.back()
    } else {
      showNotify({
        message: t('tipSelectCaptureDevice'),
        position: 'bottom',
        color: '',
      })
    }
  }
  function Empty() {
    //更新显示
    currentColor.value = []
    currentType.value = []
    currentLogo.value = []
    updataNum.value = ''
    //更新修改
    updataColor.value = []
    updataType.value = []
    updataLogo.value = []
    updataNum.value = ''
    // if (showDevice.value) {
    //   currentTime.value = t('noDefine')
    //   currentDevice.value = ''
    // }
    key.value++
  }
  function gotoSelectDevice() {
    router.push({ path: '/select-device' })
  }
</script>
<style scoped lang="scss">
  body {
    background-color: #fff !important;
  }

  .choose-page {
    height: calc(100vh - var(--status-bar-height) - var(--home-indicator-height));
    padding: {
      top: var(--status-bar-height) !important;
      bottom: var(--home-indicator-height) !important;
    }
  }

  .button {
    display: flex;
    height: 65px;
    border-top: 0.8px solid rgb(0 0 0 / 8%);
    // justify-content: space-around;
    justify-content: space-evenly;
    align-items: center;
  }

  .slideDown {
    height: calc(100% - 44px);
    // overflow: scroll;
    overflow: hidden auto;
    -ms-overflow-style: none;

    /* 针对IE、Edge浏览器 */
    scrollbar-width: none;

    /* 针对Firefox浏览器 */
    background-color: #fff !important;
  }

  .input {
    margin-left: 50px;
    background: transparent;
    border: 0;
    outline: none;
    box-shadow: none;
  }

  .input1 {
    font: 400;
    color: rgba($color: #000, $alpha: 60%);
    background: transparent;
    border: 0;
    outline: none;
    box-shadow: none;
  }

  .timebox {
    width: 100%;
    margin: 0 auto;
  }

  .linel {
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: 0 auto;
  }

  .carlogo {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .carNumber {
    margin-top: 20px;
  }

  .text {
    overflow: hidden; /* 隐藏超出部分 */
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    color: rgb(0 0 0 / 60%);
    text-overflow: ellipsis; /* 使用省略号表示超长文本 */
    white-space: nowrap; /* 保持文本在一行显示 */
  }

  .logo {
    width: 20px;
    height: 20px;
    margin-right: 25px;
    transform: rotate(180deg);
  }

  .textDevice {
    height: 22px;
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 20px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
    color: rgb(0 0 0 / 90%);
  }

  .choosedevice {
    display: flex;
    width: 343px;
    margin-right: 10px;
    margin-left: 10px;
    justify-content: space-between;
    align-items: center;
  }

  .line {
    width: 325px;
    height: 0.5px;
    margin-top: 5px;
    // background-color: black;
    background: rgb(0 0 0 / 8%);
  }

  .time {
    height: 40px;
    margin-top: 10px;
  }

  .buttonStyle {
    width: 167px;
  }

  ::placeholder {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    // text-align: center;
    font-weight: 400;
    letter-spacing: 0;
    color: rgb(0 0 0 / 60%);
  }

  .select-condition-img {
    width: 9px;
    height: 14px;
    margin-right: 30px;
  }

  .multNum {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
    color: #2993ce;
    text-align: right;
  }

  // >>> .van-popup--top {
  //   top: 50vh !important;
  //   left: 0;
  //   width: 100%;
  //   text-align: center;
  // }

  // >>> .van-popup {
  //   background-color: transparent !important;
  // }
</style>
