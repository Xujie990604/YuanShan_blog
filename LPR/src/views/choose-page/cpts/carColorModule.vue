<template>
  <div class="days">
    <div
      v-for="(item, index) in carcolorList"
      :key="index"
      class="enumParent">
      <!-- <div class="box"> -->
      <div
        class="enmu"
        :class="{ highlighted: item.choose }"
        @click="changeLogo(item)">
        <div
          v-if="item.color"
          class="circle"
          :style="{ backgroundColor: item.color }"></div>
        <view
          class="text"
          :class="{ textnone: !item.color }">
          <span>{{ item.label }}</span>
        </view>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  // const router = useRouter()
  // const goBack = () => {
  //   // 在历史记录中后退一页
  //   router.go(-1)
  // }
  const curretColor = ref<any>([])
  const emit = defineEmits(['sendCarColor'])

  // function changeColor(time: any, text: any) {
  //   curretColor.value = time
  //   emit('sendCarColor', curretColor.value)
  //   currentHighlighted.value = text
  // }
  // const enumTime = ref(['不限', '红色', '黄色', '绿色', '蓝色', '紫色', '黑色', '白色'])
  // const color = defineProps(['currentColor'])
  const color = defineProps({
    currentColor: {
      type: Array,
      default: () => [],
    },
  })
  // const currentHighlighted = ref(enumTime.value.indexOf(color.currentColor))
  const carcolorList = ref([
    { label: t('noLimit'), value: '', choose: false },
    { label: t('black'), value: '0', choose: false, color: 'black' },
    { label: t('white'), value: '1', choose: false, color: 'white' },
    { label: t('gray'), value: '2', choose: false, color: '#AAAAAA' },
    { label: t('red'), value: '3', choose: false, color: '#FF4D4D' },
    { label: t('blue'), value: '4', choose: false, color: '#1896FF' },
    { label: t('yellow'), value: '5', choose: false, color: '#FECD21' },
    { label: t('orange'), value: '6', choose: false, color: '#FF7D00' },
    { label: t('zong'), value: '7', choose: false, color: '#9A4900' },
    { label: t('green'), value: '8', choose: false, color: '#14DD2E' },
    { label: t('pruple'), value: '9', choose: false, color: '#9A4DFF' },
    { label: t('qing'), value: '10', choose: false, color: '#30F6FF' },
    { label: t('pink'), value: '11', choose: false, color: '#FFA6BE' },
    { label: t('yinbai'), value: '13', choose: false, color: '#E0E5E9' },
    { label: t('other'), value: '99', choose: false },
  ])

  onMounted(() => {
    // console.log(color.currentColor,"color")
    if (color.currentColor.length > 0) {
      for (const val of carcolorList.value) {
        for (const temp of color.currentColor) {
          if (val.value === temp) {
            val.choose = true
          }
        }
      }
    } else {
      carcolorList.value[0].choose = true
    }
  })

  function changeLogo(item: any) {
    // TODO:后面优化代码
    // item.choose = !item.choose
    // if (item.label === t('noLimit') && item.choose) {
    //   for (const logo of carcolorList.value) {
    //     if (logo.label !== t('noLimit')) {
    //       logo.choose = false
    //     }
    //   }
    // }
    // if (item.label !== t('noLimit') && item.choose) {
    //   for (const logo of carcolorList.value) {
    //     if (logo.label === t('noLimit')) {
    //       logo.choose = false
    //     }
    //   }
    // }
    for (const logo of carcolorList.value) {
      logo.choose = false
    }
    item.choose = true
    curretColor.value = []
    for (const logo of carcolorList.value) {
      if (logo.choose && logo.value !== '') {
        curretColor.value.push(logo.value)
      }
    }
    emit('sendCarColor', curretColor.value)
  }
</script>

<style scoped lang="scss">
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

  .enumParent {
    display: flex;
  }

  .enmu {
    display: flex;
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
    align-items: center;
    // justify-content: center;
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
    // width: 168px;
    // height: 38px;
  }

  .days .enumParent:last-child {
    margin-right: calc(50vw - 5px);
  }

  .circle {
    display: flex;
    width: 14px;
    height: 14px;
    margin-right: 20px;
    // margin-top: 12px;
    margin-left: 16px;
    vertical-align: middle;
    background: #1896ff;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
  }

  .text {
    margin-left: 10px;
    text-align: center;
  }

  .textnone {
    margin-left: 60px;
  }
</style>
