<template>
  <div class="select-device">
    <div class="page-title">
      <img
        class="return-arrow"
        src="../../assets/images/base-image/back.png"
        @click="() => router.back()" />
      <van-search
        v-model="deviceSearch"
        shape="round"
        :placeholder="$t('search')" />
    </div>

    <van-pull-refresh
      v-model="refreshLoading"
      :disabled="refreshDisabled"
      @refresh="onRefresh">
      <!-- 加载提示 -->
      <template #loading>
        {{ $t('loadingAlarmInfoTip') }}
      </template>
      <!-- 下拉提示 -->
      <template #pulling>
        {{ $t('pullRefreshTip') }}
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        {{ $t('loosingRefreshTip') }}
      </template>
      <template v-if="deviceList.length">
        <div class="select-device-tip font-14-color-6">{{ $t('selectDeviceTip') }}</div>
        <div
          ref="deviceListRef"
          class="device-info-list">
          <van-collapse v-model="activeNVR">
            <van-collapse-item
              v-for="device in deviceList"
              :key="device.deviceSerial"
              :name="device.deviceSerial">
              <template #title>
                <van-checkbox
                  v-model="device.isCheckAll"
                  :disabled="
                    isCheckboxDisabled(device.deviceSerial).value || device.channelList.length === 0
                  "
                  :indeterminate="device.isIndeterminate"
                  @click.stop="() => {}"
                  @change="checkAllChange($event, device.deviceSerial)">
                  <img
                    class="device-icon"
                    src="../../assets/images/UNV-NVR.png" />{{ device.deviceName }}</van-checkbox
                >
              </template>
              <van-checkbox-group
                v-model="device.checkedChannelIdList"
                :disabled="isCheckboxDisabled(device.deviceSerial).value"
                @change="checkedChannelListChange($event, device.deviceSerial)">
                <div
                  v-for="channel in device.channelList"
                  :key="channel.channelId"
                  class="nvr-channel-item">
                  <van-checkbox :name="channel.channelId"></van-checkbox>
                  <img
                    class="channel-icon"
                    src="../../assets/images/UNV-IPC.png"
                    alt="" />
                  <div class="channel-name">{{ channel.channelName }}</div>
                </div>
              </van-checkbox-group>
            </van-collapse-item>
          </van-collapse>
        </div>
      </template>
      <template v-else>
        <div class="no-device">
          <img
            src="../../assets/images/no-message.png"
            alt="" />
          <span>{{ $t('noDeviceTip') }}</span>
        </div>
      </template>
    </van-pull-refresh>

    <div class="bottom-operate">
      <div class="select-number font-14-color-6">
        {{ $t('hasSelect') }}:
        {{ currentSelectDeviceInfo?.checkedChannelIdList.length ?? 0 }}
      </div>
      <div class="btn-list">
        <van-button
          round
          class="cancel-btn"
          type="default"
          @click="cancelBtnEvent"
          >{{ $t('clear') }}</van-button
        >
        <van-button
          round
          class="success-btn"
          type="default"
          @click="confirmBtnEvent"
          >{{ $t('confirm') }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useDeviceInfoStore } from '@/stores/filter-condition/filter-condition'
  const deviceInfoStore = useDeviceInfoStore()
  const { deviceListInfo, currentSelectDeviceInfo } = storeToRefs(deviceInfoStore)
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  import { useRouter } from 'vue-router'
  const router = useRouter()

  /**
   * 页面展示的设备列表，因为页面有搜索功能，所以需要用额外数组
   */
  const deviceList = ref([...deviceListInfo.value])

  const activeNVR = ref([deviceList.value[0]?.deviceSerial])
  /**
   * 全选按钮与复选框的禁用状态
   */
  const isCheckboxDisabled = (deviceSerial: string) => {
    return computed(() =>
      deviceList.value.some(
        item => item.deviceSerial !== deviceSerial && item.checkedChannelIdList.length !== 0
      )
    )
  }

  import {
    useListRefreshDisabled,
    useListRefreshEvent,
    useListSearchByKeyword,
  } from './hook/use-list'
  const { refreshDisabled } = useListRefreshDisabled('deviceListRef')
  const { deviceSearch } = useListSearchByKeyword(deviceList)
  const { refreshLoading, onRefresh } = useListRefreshEvent(deviceList, deviceSearch)

  import { useCheckboxStatus } from './hook/use-checkbox'
  const { checkAllChange, checkedChannelListChange } = useCheckboxStatus(deviceList)

  function cancelBtnEvent() {
    deviceList.value.forEach(device => {
      device.checkedChannelIdList = []
    })
  }

  function confirmBtnEvent() {
    if (!currentSelectDeviceInfo.value) {
      showToast(t('noSelectDeviceTip'))
      return
    } else {
      router.back()
    }
  }
</script>

<style scoped lang="scss">
  .select-device {
    height: calc(100vh - var(--status-bar-height) - var(--home-indicator-height));
    background-color: #f3f4f7;
    padding: {
      top: var(--status-bar-height) !important;
      bottom: var(--home-indicator-height) !important;
    }
  }

  .page-title {
    display: flex;
    height: 44px;
    background-color: #fff;
    align-items: center;

    .return-arrow {
      width: 24px;
      height: 24px;
      margin-left: 16px;
    }

    .van-search {
      flex: 1;
      height: 44px;
      margin-right: 12px;
    }
  }

  .van-pull-refresh {
    height: calc(100% - 44px - 108px - 8px);

    .select-device-tip {
      line-height: 16px;
      margin: {
        top: 12px;
        bottom: 12px;
        left: 15px;
      }
    }

    .device-info-list {
      height: calc(100% - 40px);
      overflow: scroll;

      /* 对于 Firefox */
      scrollbar-width: none;

      /* 对于 WebKit 浏览器 */
      -webkit-scrollbar {
        display: none;
      }
    }
  }

  .van-collapse-item {
    .device-icon {
      width: 48px;
      height: 48px;
    }

    :deep(.van-cell) {
      display: flex;
      align-items: center;

      .van-checkbox__label {
        display: flex;
        align-items: center;
      }

      .van-icon-arrow {
        margin-left: 30px;
      }
    }
  }

  .nvr-channel-item {
    display: flex;
    align-items: center;
    height: 40px;

    .van-checkbox {
      margin-right: 24px;
    }

    .channel-icon {
      width: 24px;
      height: 24px;
      margin-right: 24px;
    }
  }

  .bottom-operate {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: calc(108px + var(--home-indicator-height));
    flex-direction: column;
    background-color: #fff;

    .select-number {
      margin: {
        top: 14px;
        bottom: 14px;
        left: 16px;
      }
    }

    .btn-list {
      display: flex;
      justify-content: space-around;
      padding: 0 16px;

      .cancel-btn {
        margin-right: 8px;
        font-size: 16px;
        color: rgb(0 0 0 / 90%);
        flex: 1;
      }

      .success-btn {
        font-size: 16px;
        color: #fff;
        background-color: #2993ce;
        flex: 1;
      }
    }
  }

  .no-device {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;

    img {
      width: 240px;
      height: 168px;
      margin-top: 48px;
    }

    span {
      margin-top: 14px;
      font-size: 16px;
      color: rgb(0 0 0 / 90%);
    }
  }
</style>
