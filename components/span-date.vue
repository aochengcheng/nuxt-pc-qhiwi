<template>
  <div class="span_data">
    <div class="date">
      <span>{{ dataTime }}天</span>
    </div>
    <div class="span_price">
      <slot></slot>
      <Price :price="price" :fontSize="22" class="pri"></Price>
    </div>
  </div>
</template>
<script>
import Price from "./Price"
export default {
  props: {
    dataTime: {},
    price: {}
  },
  components: {
    Price
  }
}
</script>
<style lang="scss" scoped>
  .span_data {
    display: flex;
    padding: 5px 12px 0 0;
    color: #3db585;
    text-align: center;
    align-items: center;
    .date {
      width: 70px;
      height: 20px;
      line-height: 19px;
      margin-top: 8px;
      border: 1px solid #3db585;

    }
    .span_price {
      margin-top: -1px;
      .pri {
        transform: translateY(1px);
      }
    }
  }
</style>
