<template>
  <div class="slide">
    <el-carousel height="380px">
      <el-carousel-item v-for="item in banner" :key="item.img">
        <a :href="item.host" target="_blank">
          <div class="ban_items" v-lazy:background-image="item.imgPath">
            <!-- <img v-lazy="item.imgPath" /> -->
            <p v-if="title">{{item.title}}</p>
          </div>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  props: {
    banner:{},
    title:{
      default:false
    }
  },
  data: () => {
    return {
      list: [
        {
          url: "#abc",
          img:
            "http://p0.meituan.net/codeman/00c8bc1c25fbcc6d0651b29a2057a8c1560658.png"
        },
        {
          url: "#bsbsb",
          img:
            "http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg"
        },
        {
          url: "#sjfkajfj",
          img:
            "http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg"
        },
        {
          url: "#sjfkajfja",
          img:
            "http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg"
        },
        {
          url: "#kjljj",
          img:
            "http://p1.meituan.net/codeman/bb0abb3435a60c44d87e90ed4237b61039329.jpg"
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
.ban_items {
  height: 380px;
  width: 100%;
  background-position: center;
  // background-size: cover;
  background-repeat: no-repeat;
  p {
    position: absolute;
    font-size: 20px;
    left: 0;
    bottom: 2px;
    color: #fff;
    height: 52px;
    width: 100%;
    padding: 13px 18px;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>

