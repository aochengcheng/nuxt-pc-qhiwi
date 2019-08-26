<template>
  <div class="head_top_user">
    <div class="icon_user" @mouseover="showQR" @mouseout="showQR"></div>

    <div class="QR_code" ref="QR" v-show="canShow"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canShow: false
    };
  },
  methods: {
    showQR() {
      this.canShow = !this.canShow;
    }
  }
};
</script>

<style lang="scss" scoped>
.head_top_user {
  position: relative;

  .icon_user {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: url("../static/images/Headportrait.png") no-repeat;
    position: absolute;
    cursor: pointer;
    top: 2px;
  }

  .QR_code {
    width: 120px;
    height: 120px;
    background: url("../static/images/m_src.png") no-repeat center/cover;
    position: absolute;
    top: 25px;
    left: -60px;
    z-index: 99999;
  }
}
</style>
