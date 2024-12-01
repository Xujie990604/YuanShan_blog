<template>
  <van-skeleton>
    <template #template>
      <div class="skeleton-card">
        <div class="skeleton-card-info">
          <van-skeleton-paragraph row-width="90%" />
          <van-skeleton-paragraph row-width="25%" />
          <van-skeleton-paragraph row-width="90%" />
        </div>
        <van-skeleton-image />
      </div>
    </template>
  </van-skeleton>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
  .van-skeleton {
    padding: 0;
  }

  .skeleton-card {
    display: flex;
    width: 100%;
    height: 68px;
    padding: 16px;
    margin-bottom: 12px;
    background-color: #fff;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;

    .skeleton-card-info {
      display: flex;
      margin-right: 8px;
      flex-direction: column;
      flex: 1 1 auto;
    }

    .van-skeleton-image {
      width: 96px;
      height: 54px;
      border-radius: 6px;
      flex: 0 0 auto;
    }
  }
</style>
