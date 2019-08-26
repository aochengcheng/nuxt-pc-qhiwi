<template>
  <div class="country">
    <span class="c_loac">
      <img :src="img_url" alt="">
    </span>
    <span class="c_address">{{ country }}</span>
  </div>
</template>
<script>
export default {
  props: {
    "img_url": {
      default: require('~/static/images/location.png')
    },
    "country": {
      default: "雅典"
    }
  }
}
</script>
<style lang="scss" scoped>
.country {
  .c_loac {
    width: 13px;
    height: 15px;
    display: inline-block;
    // background: url('../assets/images/location.png') no-repeat;
    vertical-align: text-bottom;
    img {
      display: block;
    }
  }
  .c_address {
    margin-left: 7px;
  }
}
</style>
