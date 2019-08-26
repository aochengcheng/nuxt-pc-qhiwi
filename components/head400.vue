<template>
  <div class="Head_top">
    <span class="icon">
      <img src="images/phone.png" alt />
    </span>
    <span class="phone_num">400-877-1008</span>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.Head_top {
  height: 40px;

  span.icon {
    display: inline-block;
    border-radius: 50%;
    margin-right: 10px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    vertical-align: middle;
  }

  span.phone_num {
    line-height: 40px;
    font-size: 12px;
  }
}
</style>
