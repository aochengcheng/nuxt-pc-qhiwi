<template>
  <div class="immigr_pic" v-lazy:background-image="bgimg">
    <div class="immig_mask">
      <!-- <div class="c"> -->
        <div class="immig_tit">
          <h3>{{ title }}</h3>
        </div>
        <div class="immig_content">
          <p>{{ details }}</p>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
export default {
  /**
   * @param bgimg 背景图片
   *
   */

  props: {
    bgimg: {
      default: require("~/static/images/immigration2.png")
    },
    title: {
      default: "美国移民"
    },
    details: {}
  }
};
</script>
<style lang="scss" scoped>
.immigr_pic {
  width: 100%;
  height: 100%;
  margin-right: 30px;
  position: relative;
  background-position: center;
  background-size: cover;

  &:hover .immig_mask {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .immig_mask {
    color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    opacity: 0;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .c {
      display: flex;

      color: #fff;
    }
    h3 {
      font-size: 30px;
      font-weight: 700;
      padding-bottom: 10px;
      position: relative;

      &::after {
        position: absolute;
        content: "";
        width: 80px;
        height: 2px;
        background-color: #fff;
        bottom: 0;
        left: 50%;
        margin-left: -40px;
      }
    }

    .immig_tit {
    }
  }

  .immig_content {
    margin: 15px auto;
    max-width: 200px;
  }
}
</style>
