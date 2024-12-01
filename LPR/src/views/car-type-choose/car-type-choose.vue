<template>
  <div class="car-type-choose">
    <van-nav-bar
      left-arrow
      class="nav"
      @click-left="onClickLeft">
      <template #title>
        <van-search
          v-model="searchContent"
          :placeholder="$t('search')"
          background="#f2f2f6"
          shape="round"
          @search="search"
          @blur="search" />
      </template>
    </van-nav-bar>
    <van-index-bar
      class="vanBar"
      :index-list="keyList">
      <template
        v-for="(cars, index) in showcar"
        :key="index">
        <van-index-anchor
          :index="cars.label"
          class="anchorContaner">
        </van-index-anchor>
        <van-checkbox-group
          ref="checkboxGroup"
          v-model="checked"
          class="bg2">
          <van-checkbox
            v-for="car in cars.carlist"
            :key="car.idJudge"
            :name="car.idJudge"
            class="bg"
            @click="getCount">
            <van-image
              v-if="car.name != 'Other'"
              v-lazy="lazyPicture"
              width="40"
              height="40"
              fit="contain"
              :src="car.url"
              lazy-load />
            <div style="margin-left: 20px">
              {{ car.name }}
            </div>
          </van-checkbox>
        </van-checkbox-group>
      </template>
    </van-index-bar>
    <view class="chooseArea">
      <view class="chooseContainer">
        <!-- <van-checkbox
        v-model="allChecked"
        @click="chooseAll"
        class="allChoose"
        >{{ $t('selectAll') }}</van-checkbox
      > -->
        <view class="hasChoose">
          <span>{{ $t('hasSelect') }}:</span> {{ checked.length }}
        </view>
      </view>
      <view class="buttonContainer">
        <van-button
          class="clear"
          round
          @click="clearCheck"
          >{{ $t('clear') }}</van-button
        >
        <van-button
          type="primary"
          class="clear confirm"
          round
          @click="confirm"
          >{{ $t('confirm') }}</van-button
        >
      </view>
    </view>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { logoList } from './carLogo'
  import { useMoreFilterConditionStore } from '@/stores/filter-condition/filter-condition'
  const store = useMoreFilterConditionStore()

  //筛选字母列表
  const keyList = ref([
    'A',
    'B',
    'C',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'W',
    'X',
    'Y',
    'Z',
  ])
  //车辆列表
  const allcar = ref<any[]>([])
  const showcar = ref<any[]>([])
  //绑定选中
  const checked = ref<any>([])
  //全选
  const allChecked = ref(false)
  const searchContent = ref<any>('')
  const hasChooseLogo = ref(store.moreFilterCondition.vehicleBrand)
  const lazyPicture = ref(new URL('../../assets/images/no-message.png', import.meta.url).href)

  onMounted(() => {
    // 只能为英文
    // if (appinfoStore.appInfo.curLan !== lanEnum.ZH) {
    logoList.forEach(item => {
      for (const eng of item.carlist) {
        if (eng.englishLabel === '未找到英文名') {
          eng.name = eng.engAndChines
        } else {
          eng.name = eng.englishLabel
        }
        eng.idJudge = eng.id
      }
    })
    // }
    //处理图片链接
    logoList.forEach(item => {
      for (const eng of item.carlist) {
        eng.url = getIcon(eng)
      }
    })
    // const Other: any = []
    //去除掉 未找到英文名的划为其他类型
    allcar.value = logoList
    //   .map(item => {
    //     // 过滤掉 carlist 中 englishLabel 为 'Other' 的项
    //     const filteredCarlist = item.carlist.filter(
    //       (eng: { englishLabel: string }) => eng.englishLabel !== 'Other'
    //     )
    //     const otehrFilter = item.carlist.filter(
    //       (eng: { englishLabel: string }) => eng.englishLabel === 'Other'
    //     )
    //     if (otehrFilter.length > 0) {
    //       for (const otherItem of otehrFilter) {
    //         Other.push(otherItem)
    //       }
    //     }
    //     // 如果过滤后的 carlist 不为空，则保留该 item
    //     if (filteredCarlist.length > 0) {
    //       return { ...item, carlist: filteredCarlist }
    //     }
    //     // 如果过滤后的 carlist 为空，则不保留该 item
    //     return null
    //   })
    //   .filter(item => item !== null)
    // allcar.value.map(item => {
    //   if (item.label === 'O') {
    //     const tempCarList = item.carlist
    //     tempCarList.push({
    //       id: Other.map((item: { id: any }) => item.id),
    //       idJudge: Other.map((item: { id: any }) => item.id).join('-'),
    //       name: 'Other',
    //       englistLabel: 'Other',
    //     })
    //     console.log({ ...item, carlist: tempCarList })
    //     return { ...item, carlist: tempCarList }
    //   } else {
    //     return { ...item }
    //   }
    // })
    showcar.value = allcar.value
    if (hasChooseLogo.value.length > 0) {
      // 怎么判断 选择了其他other
      // const otherIdList = Other.map((item: { id: any }) => item.id)
      // if (hasChooseLogo.value.every(id => otherIdList.includes(id))) {
      //   console.log('panduan ')
      //   const difference = hasChooseLogo.value.filter(element => !otherIdList.includes(element))
      //   difference.push(otherIdList)
      //   checked.value = difference
      //   console.log(checked.value)
      // } else {
      checked.value = hasChooseLogo.value
      // }
    }
  })
  // //处理图片名称
  // function generateCombinations(str: string): string[] {
  //   let result = ['']
  //   for (const char of str) {
  //     const lowerChar = char.toLowerCase()
  //     const upperChar = char.toUpperCase()
  //     const newResult = []
  //     for (const combination of result) {
  //       newResult.push(combination + lowerChar)
  //       newResult.push(combination + upperChar)
  //     }
  //     result = newResult
  //   }
  //   return result
  // }
  function getIcon(eng: any) {
    // 图片路径
    const imgPath = new URL(
      '../../assets/images/car-logo/' + `${eng.name}` + '.png',
      import.meta.url
    ).href

    if (!imgPath.endsWith('undefined')) {
      return imgPath
    } else {
      //取默认图片
      return new URL('../../assets/images/no-message.png', import.meta.url).href
    }
  }
  const onClickLeft = () => history.back()

  // //全选
  // function chooseAll() {
  //   if (!allChecked.value) {
  //     checked.value = []
  //   } else {
  //     for (const temp of allcar.value) {
  //       for (const list of temp.carlist) {
  //         checked.value.push(list.id)
  //       }
  //     }
  //   }
  // }

  //点击单个
  function getCount() {
    let i = 0
    for (const temp of allcar.value) {
      // for (const list of temp.carlist) {
      //   i++
      // }
      i += temp.carlist.length
    }
    if (checked.value.length == i) {
      allChecked.value = true
    } else {
      allChecked.value = false
    }
  }
  //清空
  function clearCheck() {
    allChecked.value = false
    checked.value = []
  }
  function confirm() {
    const finalCheck = [].concat(checked.value)
    store.moreFilterCondition.vehicleBrand = finalCheck
    history.back()
  }
  //时间
  const timer = ref<any>(null)
  function search() {
    console.log('search')
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      console.log(searchContent.value, 'searchContext')
      if (searchContent.value) {
        const list = allcar.value
          .map(group => ({
            ...group,
            carlist: group.carlist.filter((item: { name: string | any[] }) => {
              return item.name.includes(searchContent.value)
            }),
          }))
          .filter(group => group.carlist.length > 0)
        showcar.value = list
      } else {
        showcar.value = allcar.value
      }
    }, 400)
  }
</script>
<style scoped lang="scss">
  .car-type-choose {
    height: calc(100vh - var(--status-bar-height) - var(--home-indicator-height));
    background-color: #f3f4f7;
    padding: {
      top: var(--status-bar-height) !important;
      bottom: var(--home-indicator-height) !important;
    }
  }

  .vanBar {
    z-index: 1;
    height: calc(100vh - 180px);
    overflow: auto;
    -ms-overflow-style: none;

    /* 针对IE、Edge浏览器 */
    scrollbar-width: none;

    /* 针对Firefox浏览器 */
  }

  .anchorContaner {
    // height: 100%;
  }

  .bg {
    display: flex;
    height: 40px;
    margin-left: 20px;

    van-image {
      margin-right: 10px;
    }
  }

  .bg2 {
    background-color: #fff;
  }

  .chooseArea {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 108px;
    background-color: #fff;
  }

  .chooseContainer {
    display: flex;
    margin: 16px 0 16px 8px;
  }

  .allChoose {
    margin-left: 18px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: 400;
    color: rgb(0 0 0 / 90%);
    text-align: left;
  }

  .hasChoose {
    margin-left: 24px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0;
    color: rgb(0 0 0 / 60%);
  }

  .buttonContainer {
    display: flex;
    justify-content: space-evenly;
  }

  .clear {
    width: 167px;
  }

  .nav {
    --van-nav-bar-icon-color: black;
    --van-nav-bar-arrow-size: 25px;
    --van-search-content-background: #fff;

    z-index: 999;
    background-color: #f2f2f6 !important;
  }

  :deep(.van-nav-bar__title) {
    width: 100%;
    max-width: 80%;
  }

  :deep(.van-nav-bar__content) {
    z-index: 999;
  }

  :deep(.van-index-anchor) {
    font-family: PingFangSC-Regular;
    font-size: 28rpx;
    font-weight: 400;
    color: rgb(0 0 0 / 40%);
    background-color: none !important;
  }

  :deep(.van-index-anchor--sticky) {
    top: 0 !important;
    // background-color: var(--van-index-anchor-background) !important;
    background-color: #f2f2f6 !important;
  }

  :deep(.van-index-bar__index) {
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
    text-align: left;
  }

  :deep(.van-index-bar__index--active) {
    font-family: PingFangSC-Regular;
    font-size: 24rpx;
    font-weight: 400;
    color: #2993ce;
    text-align: left;
    background: rgb(41 147 206 / 20%);
    border-radius: 4px;
  }

  :deep(.van-checkbox__label) {
    --van-padding-xs: 20px !important;
    --van-checkbox-label-margin: var(--van-padding-xs);

    display: flex;
    width: 300px;
    align-items: center;
    text-align: left;
  }
</style>
