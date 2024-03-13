<template>
  <h1>屏幕总宽度为 1080 rem</h1>
  <div class="width-rem-800">800rem</div>
  <div class="width-rem-540">540rem</div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
  $list: (800, red), (540, yellow);
  @mixin line($width, $color) {
    width: $width;
    height: 30px;
    text-align: center;
    background-color: $color;
    border-radius: 15px;
    margin : {
      bottom: 10px;
    }
  }

  @each $list-key, $list-value in $list {
    .width-rem-#{$list-key} {
      @include line($width: $list-key + rem, $color: $list-value);
    }
  }
</style>
