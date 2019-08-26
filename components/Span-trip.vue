<template>
  <div class="trip">
    <div class="trip_t">
      <span>出发城市：</span>
      <span>{{ citys }}</span>
    </div>
    <div class="trip_b">
      <div class="trip_l">
        <span>行程：</span>
        <span>{{ dataTime }}</span>
      </div>

      <div class="trip_r">
        <span>{{ merchant }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    citys: {},
    dataTime:  {},
    merchant:  {
      default: '西瓜'
    }
  }
}
</script>
<style lang="scss" scoped>
.trip {
  color: #9399a7;

  &>div {
    margin-bottom: 12px;
  }
  &>div:last-child {
    margin-bottom: 0;
  }

  .trip_b {
    display: flex;
    justify-content: space-between;
  }
}
</style>
