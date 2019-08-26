<template>
  <div class="foot_pic">
    <nuxt-link :to="'/'">
      <img src="~/static/images/foot_pic.png" alt='广告'>
    </nuxt-link>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.foot_pic {
  margin-top: 50px;
  img {
    display: block;
  }
}
</style>
