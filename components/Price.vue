<template>
  <div class="price">
    <!-- <span class="price_fs">￥</span> -->
    ￥
    <span class="price_nb" :style="{fontSize: fontSize+'px'}">{{ price }} </span>
     <!-- <span class="price_fs"> 万</span> -->
     
  </div>
</template>
<script>
export default {
  props: {
    "price": {},
    fontSize: {
      default: 30
    }
  }
}
</script>
<style lang="scss" scoped>
.price {
  display: inline-block;
  // .price_fs {
    color: #9399A5;
    // display: inline-block;
    // vertical-align: inherit;
    font-size: 14px;
  // }

  .price_nb {
    color: #e32429;
    font-size: 30px;
    font-weight: 700;
    margin-left: 5px;
  }
}
</style>
