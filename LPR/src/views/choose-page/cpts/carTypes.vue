<template>
  <div class="days">
    <div
      v-for="(item, index) in cartypeList"
      :key="index"
      class="enum">
      <!-- <div class="box"> -->
      <div
        class="enmu"
        :class="{ highlighted: item.choose }"
        @click="changeCarTyoe(item)">
        <span>{{ item.label }}</span>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  // const type = defineProps(['currentType'])
  const type = defineProps({
    currentType: {
      type: Array,
      default: () => [],
    },
  })

  const currentCarType = ref<any>([])
  const emit = defineEmits(['sendCarType'])
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const cartypeList = ref([
    { label: t('noLimit'), value: '', choose: false },
    { label: t('motor'), value: '6', choose: false },
    { label: t('car'), value: '9', choose: false },
    { label: t('suv'), value: '10', choose: false },
    { label: t('minivan'), value: '11', choose: false },
    { label: t('middleBus'), value: '13', choose: false },
    { label: t('bigTruck'), value: '15', choose: false },
    { label: t('pickTruck'), value: '16', choose: false },
    { label: t('mpv'), value: '17', choose: false },
    { label: t('other'), value: '999', choose: false },
  ])

  onMounted(() => {
    console.log(type.currentType)
    if (type.currentType.length > 0) {
      for (const val of cartypeList.value) {
        for (const temp of type.currentType) {
          if (val.value === temp) {
            val.choose = true
          }
        }
      }
    } else {
      cartypeList.value[0].choose = true
    }
  })

  function changeCarTyoe(item: any) {
    // TODO:后面优化代码
    item.choose = !item.choose
    // if (item.label === t('noLimit') && item.choose) {
    //   for (const logo of cartypeList.value) {
    //     if (logo.label !== t('noLimit')) {
    //       logo.choose = false
    //     }
    //   }
    // }
    // if (item.label !== t('noLimit') && item.choose) {
    //   for (const logo of cartypeList.value) {
    //     if (logo.label === t('noLimit')) {
    //       logo.choose = false
    //     }
    //   }
    // }
    for (const logo of cartypeList.value) {
      logo.choose = false
    }
    item.choose = true
    currentCarType.value = []
    for (const logo of cartypeList.value) {
      if (logo.choose && logo.value !== '') {
        currentCarType.value.push(logo.value)
      }
    }
    emit('sendCarType', currentCarType.value)
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
    border-radius: 10px;
    // background-color: #fff;
    opacity: 0.9;
    flex-grow: 1;
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
    background: rgb(86 172 255 / 8%) !important;
    border: 1px solid #2993ce;
    border-radius: 8px;
  }
</style>
