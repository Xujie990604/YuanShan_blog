<template>
  <div class="days">
    <div
      v-for="(item, index) in carlogoList"
      :key="index"
      class="enum">
      <!-- <div class="box"> -->
      <div
        class="enmu"
        :class="{ highlighted: item.choose }"
        @click="changeLogo(item)">
        <div class="img_contaner">
          <img
            v-if="item.location"
            :src="item.location"
            alt="" />
          <span
            class="labelText"
            :class="{ labelTextNone: !item.location }"
            >{{ item.label }}</span
          >
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import benchi from '@/assets/images/car-brand/Mercedes Benz.svg'
  import bmw from '@/assets/images/car-brand/BMW.svg'
  import volk from '@/assets/images/car-brand/Volkswagen.svg'
  import honda from '@/assets/images/car-brand/Honda.svg'
  import ford from '@/assets/images/car-brand/Ford.svg'
  import audi from '@/assets/images/car-brand/Audi.svg'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  // import { useRouter } from 'vue-router'

  // const router = useRouter()
  // const goBack = () => {
  //   // 在历史记录中后退一页
  //   router.go(-1)
  // }
  const currentLogoNow = ref<any>([])
  const emit = defineEmits(['sendCarLogo'])
  // function changeColor(time: any, text: any) {
  //   currentLogo.value = time
  //   emit('sendCarLogo', currentLogo.value)
  //   currentHighlighted.value = text
  // }
  // const enumTime = ref(['不限', '宝马', '比亚迪', '奥迪', '凯迪拉克', '雪弗兰'])
  // const logo = defineProps(['currentLogo'])
  const logo = defineProps({
    currentLogo: {
      type: Array,
      default: () => [],
    },
  })
  // const currentHighlighted = ref(enumTime.value.indexOf(logo.currentLogo))
  const carlogoList = ref([
    { label: t('noLimit'), value: '', choose: false },
    { label: t('benchi'), value: 'B0', choose: false, location: benchi },
    { label: t('voll'), value: 'D6', choose: false, location: volk },
    { label: t('BMW'), value: 'B5', choose: false, location: bmw },
    { label: t('honda'), value: 'B7', choose: false, location: honda },
    { label: t('ford'), value: 'F3', choose: false, location: ford },
    { label: t('audi'), value: 'A0', choose: false, location: audi },
  ])
  onMounted(() => {
    if (logo.currentLogo.length > 0) {
      for (const val of carlogoList.value) {
        for (const temp of logo.currentLogo) {
          if (val.value === temp) {
            val.choose = true
          }
        }
      }
    } else {
      carlogoList.value[0].choose = true
    }
  })

  function changeLogo(item: any) {
    // TODO:后面优化代码
    item.choose = !item.choose
    if (item.label === t('noLimit') && item.choose) {
      for (const logo of carlogoList.value) {
        if (logo.label !== t('noLimit')) {
          logo.choose = false
        }
      }
    }
    if (item.label !== t('noLimit') && item.choose) {
      for (const logo of carlogoList.value) {
        if (logo.label === t('noLimit')) {
          logo.choose = false
        }
      }
    }
    currentLogoNow.value = []
    for (const logo of carlogoList.value) {
      if (logo.choose && logo.value !== '') {
        console.log('logo.value', logo.value)
        currentLogoNow.value.push(logo.value)
      }
    }
    emit('sendCarLogo', currentLogoNow.value)
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
    border-radius: 8px;
    // background-color: #fff;
    opacity: 0.9;
    box-sizing: border-box;
    flex-grow: 1;

    img {
      width: 35px;
      height: 35px;
      object-fit: fill;
    }
  }

  .days {
    display: flex;
    flex-wrap: wrap;
    width: 225px;
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
  }

  .img_contaner {
    display: flex;
    margin-left: 20px;
  }

  .labelText {
    width: 70px;
    margin-left: 10px;
    overflow: hidden;

    /* 文本超出的部分打点显示 */
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .labelTextNone {
    margin-left: 40px;
    overflow: hidden;

    /* 文本超出的部分打点显示 */
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .days .enum:last-child {
    margin-right: calc(50vw - 5px);
  }
</style>
