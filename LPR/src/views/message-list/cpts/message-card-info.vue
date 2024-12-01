<template>
  <div class="message-card">
    <div class="message-card-info">
      <div class="time text-omit font-14-color-6">{{ new Date(time * 1000).toLocaleString() }}</div>
      <div class="card-number">
        <span>{{ platNo }}</span>
      </div>
      <div class="from text-omit font-14-color-6">{{ $t('fromChannel') }}: {{ channelName }}</div>
    </div>
    <van-image
      class="message-card-picture"
      :src="imageData">
    </van-image>
  </div>
</template>

<script lang="ts" setup>
  interface IProps {
    time: number
    imageData?: string
    channelName?: string
    platNo?: string
  }

  const { time, imageData, channelName, platNo } = defineProps<IProps>()
</script>

<style scoped lang="scss">
  .message-card {
    display: flex;
    height: 68px;
    padding: 16px;
    margin-bottom: 12px;
    background-color: #fff;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;

    &-info {
      display: flex;
      min-width: 200px;
      margin-right: 8px;
      flex-direction: column;
      flex: 1 1 auto;

      .time {
        line-height: 20px;
      }

      .from {
        line-height: 20px;
      }

      .card-number span {
        height: 20px;
        padding: 0 8px;
        font-size: 12px;
        line-height: 20px;
        color: #0153d8;
        background-color: rgb(1 83 216 / 10%);
        border-radius: 2px;
      }
    }

    &-picture {
      width: 96px;
      height: 54px;
      overflow: hidden;
      border-radius: 6px;
      flex: 0 0 auto;
    }
  }
</style>
