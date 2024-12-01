<template>
  <div class="days">
    <div
      v-for="(time, index) in enumTime"
      :key="index"
      class="enum">
      <!-- <div class="box"> -->
      <div
        class="enmu"
        :class="{ highlighted: time.choose }"
        @click="changeColor(time, index)">
        <span>{{ time.label }}</span>
      </div>
      <!-- </div> -->
    </div>
    <div
      v-if="isShow"
      class="timeshow select-time-content"
      @click="showTimeSelect">
      <div class="time-left">{{ startTime }}</div>
      <div class="time-middle">~</div>
      <div class="time-right">{{ endTime }}</div>
    </div>
    <van-popup
      v-model:show="show"
      style="height: 424px; border-radius: 24px 24px 0 0"
      position="bottom">
      <template #default>
        <div class="popup-header">
          <span class="popup-title">选择起止时间</span>
          <img
            class="close-img"
            src="@/assets/images/base-image/close.png"
            @click="closePopup" />
        </div>
        <!-- 弹出层的主要内容 -->
        <timeSelection @change-date-time="changeTime" />
        <!-- <div class="popup-content">

    </div> -->
      </template>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import timeSelection from '@/views/vehicle-pass-record/time-selection.vue'
  import { useTimeStore } from '@/stores/filter-condition/filter-condition'
  // import { getNowTime } from '@/utils/date-utils'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  // const getCurrentTime = getNowTime()
  const useTime = useTimeStore()

  const enumTime = ref<any[]>([
    { label: t('lastThree'), choose: false, value: '0' },
    { label: t('lastSeven'), choose: false, value: '1' },
    { label: t('lastThirty'), choose: false, value: '2' },
    { label: t('noDefine'), choose: false, value: '3' },
  ])

  // const props = defineProps(['currentTime'])
  const props = defineProps({
    currentTime: {
      type: String,
      default: '',
    },
  })
  const currentHighlighted = ref(enumTime.value.indexOf(props.currentTime))

  import { onMounted } from 'vue'

  function changeColor(time: any, text: any) {
    time.choose = !time.choose
    if (time.choose) {
      for (const val of enumTime.value) {
        if (val.label !== time.label) {
          val.choose = false
        }
      }
    }
    for (const val of enumTime.value) {
      if (val.choose) {
        currentTimeNow.value = time.value
      }
    }

    // label:近三天，时间
    emit('sendCaptureTime', currentTimeNow.value)
    currentHighlighted.value = text
    if (text === 3) {
      isShow.value = true
    } else {
      isShow.value = false
    }
  }

  onMounted(() => {
    if (props.currentTime && props.currentTime !== '3') {
      for (const val of enumTime.value) {
        if (val.value === props.currentTime) {
          val.choose = true
        }
      }
    } else {
      enumTime.value[3].choose = true
      isShow.value = true
    }
  })

  const emit = defineEmits(['sendCaptureTime'])
  const currentTimeNow = ref('')

  const isShow = ref(false)
  // 初始化 抓拍时间
  const startTime = ref(
    // getCurrentTime.startDate[0] +
    //   '/' +
    //   getCurrentTime.startDate[1] +
    //   '/' +
    //   getCurrentTime.startDate[2] +
    //   ' ' +
    //   getCurrentTime.startTime[0] +
    //   ':' +
    //   getCurrentTime.startTime[1]
    useTime.startDateTime
  )
  const endTime = ref(
    // getCurrentTime.endDate[0] +
    //   '/' +
    //   getCurrentTime.endDate[1] +
    //   '/' +
    //   getCurrentTime.endDate[2] +
    //   ' ' +
    //   getCurrentTime.endTime[0] +
    //   ':' +
    //   getCurrentTime.endTime[1]
    useTime.endDateTime
  )

  const show = ref(false)
  const showTimeSelect = () => {
    show.value = true
  }

  // 时间筛选后 改变时间框的值
  function changeTime() {
    show.value = false
    startTime.value = useTime.startDateTime
    endTime.value = useTime.endDateTime
  }

  function closePopup() {
    show.value = false
  }
</script>

<style scoped lang="scss">
  .timeshow {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0;
    color: rgb(0 0 0 / 90%);
    text-align: right;
  }

  .AutoTime {
    width: 150px;
  }

  .box {
    width: 170px;
    height: 40px;
    // margin-right: 10px;
    margin-bottom: 10px;
    line-height: 40px;
    text-align: center;
    background: #f3f4f5;
    border-radius: 10px;
    // background-color: #fff;
    opacity: 0.9;
  }

  .enum {
    display: flex;
  }

  .enmu {
    width: 40vw;
    height: 40px;
    // margin-right: 10px;
    margin-bottom: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 0;
    color: rgb(0 0 0 / 60%);
    text-align: center;
    background: #f3f4f5;
    border: 1px solid transparent;
    border-radius: 10px;
    // background-color: #fff;
    opacity: 0.9;
    box-sizing: border-box;
    flex-grow: 1;
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
  }

  .time {
    margin-left: 70px;
  }

  .highlighted {
    // color: red;
    // background-color: #fff;
    background: rgb(86 172 255 / 8%) !important;
    border: 1px solid #2993ce;
    border-radius: 8px;
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

  .select-time-content {
    display: flex;
    width: 80vw;
    height: 43px;
    // margin: 0 16px 16px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;
    letter-spacing: 0;
    color: rgb(0 0 0 / 90%);
    text-align: right;
    border-bottom: 0.8px solid rgb(0 0 0 / 8%);
    justify-content: space-evenly;
  }

  .time-middle {
    font-family: SourceHanSansCN-Normal;
    font-size: 14px;
    font-weight: 400;
    color: rgb(0 0 0 / 40%);
  }

  .time-left {
    color: rgba($color: #000, $alpha: 60%);
  }

  .time-right {
    color: rgba($color: #000, $alpha: 60%);
  }
</style>
