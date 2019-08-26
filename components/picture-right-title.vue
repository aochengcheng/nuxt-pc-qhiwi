<template>
  <div class="right_tit">
    <div class="right_img">
      <img v-lazy="img_src" :key="img_src"  :alt="alt"/>
    </div>

    <div class="right_txt">
      <h3 class="text_one">{{ title }}</h3>
      <p class="text_one">{{ content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    img_src: {
      default: require("~/static/images/study1.png")
    },
    title: {},
    content: {},
    alt:{}
  }
};
</script>
<style lang="scss" scoped>
.right_tit {
  width: 100%;
  .right_img {
    width: 100%;
    width: 380px;
    height: 253px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .right_txt {
    height: 50px;
    overflow: hidden;
    // display: flex;
    margin-top: 20px;
    margin-left: 10px;
    h3 {
      font-size: 18px;
      padding-right: 10px;
    }

    p {
      padding-top: 5px;
      font-size: 14px;
      color: #a3a5b1;
      align-self: center;
      position: relative;
    }
  }
}
</style>
