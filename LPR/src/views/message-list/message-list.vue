<template>
  <div class="message-list">
    <basePageTitle
      :is-show-right="!isShowRecord"
      bg-color="#f3f4f7">
      <template #default>
        <form
          class="search-input"
          action="/">
          <van-search
            v-model="searchValue"
            shape="round"
            background="#f3f4f7"
            :show-action="isShowRecord"
            :placeholder="$t('searchAlarmByCarNumber')"
            @click-input="isShowRecord = true"
            @search="searchMessageByCarNumber">
            <template #action>
              <div
                class="cancel-btn"
                @click="isShowRecord = false">
                {{ $t('cancel') }}
              </div>
            </template></van-search
          >
        </form>
      </template>

      <template #rightIcon>
        <img
          class="more-icon"
          src="../../../src/assets/images/base-image/more.png"
          @click="gotoChooseMore()" />
      </template>
    </basePageTitle>

    <searchRecord
      v-show="isShowRecord"
      @search-by-record="searchMessageByRecord"></searchRecord>

    <VanPullRefresh
      v-show="!isShowRecord"
      v-model="refreshLoading"
      :disabled="refreshDisabled"
      @refresh="refreshMessage">
      <div
        v-show="messageList.length === 0 && messageLoading === false && refreshLoading === false"
        class="no-message">
        <img
          class="no-message-img"
          src="../../assets/images/no-message.png" />
        <div class="no-message-tip">{{ $t('noMessageTip') }}</div>
      </div>

      <div
        v-show="messageList.length === 0 && (messageLoading === true || refreshLoading === true)"
        class="skeleton-list">
        <messageCardSkeleton
          v-for="index in 5"
          :key="index"></messageCardSkeleton>
      </div>

      <van-list
        v-show="messageList.length > 0"
        ref="messageListRef"
        v-model:loading="listBottomLoading"
        v-model:error="listError"
        :loading-text="$t('loadingAlarmInfoTip')"
        :error-text="$t('getAlarmInfoErrorTip')"
        :finished="listFinished"
        :finished-text="$t('noMoreAlarmInfo')"
        @load="loadMoreMessage">
        <messageCardInfo
          v-for="(message, index) in messageList"
          :key="index"
          :channel-name="message.ChannelName"
          :image-data="'data:image/png;base64,' + message.FullPicture.Data"
          :time="message.Time"
          :plat-no="
            message.ObjectList[0].ObjectInfo.VehicleInfo.PlateAttributeInfo.PlateNo || '- -'
          "
          @click="jumpToAlarmDetail(message, index)"></messageCardInfo>
      </van-list>
    </VanPullRefresh>
  </div>
</template>

<script lang="ts" setup>
  import messageCardInfo from './cpts/message-card-info.vue'
  import messageCardSkeleton from './cpts/message-card-skeleton.vue'
  import searchRecord from './cpts/search-record.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import { useMoreFilterConditionStore } from '@/stores/filter-condition/filter-condition'
  const moreFilterConditionStore = useMoreFilterConditionStore()
  import { useSearchRecordStore } from '../../stores/search-record/search-record'
  const searchRecordStore = useSearchRecordStore()
  const { setSearchRecord } = searchRecordStore

  /** 下拉刷新加载状态 */
  const refreshLoading = ref(false)
  const isShowRecord = ref(false)
  const searchValue = ref('')


  import { useMessageRequest } from './hook/use-message-request'
  const {
    messageList,
    messageLoading,
    listBottomLoading,
    listFinished,
    listError,
    loadMoreMessage,
  } = useMessageRequest(refreshLoading)

  import { useListRefreshDisabled } from './hook/hook-list'
  const { refreshDisabled } = useListRefreshDisabled('messageListRef')

  import { useJumpDetail } from './hook/use-jump-detail'
  const { jumpToAlarmDetail } = useJumpDetail(messageList)

  // NOTE：手动触发一次加载
  loadMoreMessage()

  /**
   * 按照历史记录搜索过车记录
   */
  function searchMessageByRecord(record: string) {
    isShowRecord.value = false
    searchValue.value = record
    messageList.value = []
    loadMoreMessage()
  }

  /**
   * 按照输入框车牌号搜索过车记录
   */
  function searchMessageByCarNumber() {
    isShowRecord.value = false
    setSearchRecord(searchValue.value)
    moreFilterConditionStore.moreFilterCondition.vehicleNumber = searchValue.value
    messageList.value = []
    loadMoreMessage()
  }

  /**
   * 下拉刷新
   */
  function refreshMessage() {
    messageList.value = []
    loadMoreMessage()
  }


  import { showDeviceTimeStore } from '@/stores/filter-condition/filter-condition'
  const showStore = showDeviceTimeStore()
  function gotoChooseMore() {
    showStore.showDeviceTime = true
    router.push({ path: '/choose-page' })
  }
</script>

<style scoped lang="scss">
  .message-list {
    height: calc(100vh - var(--status-bar-height) - var(--home-indicator-height));
    background-color: #f3f4f7;
    padding: {
      top: var(--status-bar-height) !important;
      bottom: var(--home-indicator-height) !important;
    }
  }

  .search-input {
    width: 100%;

    .van-search {
      padding: 0;

      :deep(.van-search__content) {
        background: #fff;
        border-radius: 20px;
      }

      :deep(.van-search__action) {
        padding: 0;
      }

      .cancel-btn {
        width: 56px;
        text-align: center;
      }
    }
  }

  .more-icon {
    width: 24px;
    height: 24px;
  }

  .van-pull-refresh {
    height: calc(100% - 44px - 24px);
    padding: 12px 0;

    // 消息列表
    .van-list {
      width: 94%;
      height: 100%;
      margin: 12px auto;
      overflow: scroll;
      border-radius: 8px;

      /* 对于 Firefox */
      scrollbar-width: none;

      /* 对于 WebKit 浏览器 */
      -webkit-scrollbar {
        display: none;
      }
    }

    // 无设备占位图
    .no-message {
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;

      &-img {
        width: 240px;
        height: 168px;
        margin-top: 48px;
      }

      &-tip {
        margin-top: 14px;
        font-size: 16px;
        color: rgb(0 0 0 / 90%);
      }
    }

    // 骨架占位图
    .skeleton-list {
      width: 94%;
      margin: 12px auto;
      overflow: hidden;
    }
  }
</style>
