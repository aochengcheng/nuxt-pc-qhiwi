<template>
  <!-- <div class="sd" @mouseenter="enter" @mouseleave="leave">
    <swiper v-if="banners.length > 1" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item,i) in banner" :key="i">
        <div class="box">
          <a :href="item.host">
            <img v-lazy="item.imgPath" />
          </a>
        </div>
        <div class="b_t">{{ item.title }}</div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div> -->
  <div class="sd">
    
  </div>
</template>
<script>
export default {
  props: {
    banner: {}
  },
  data() {
    return {
      banners: [
        // { img_url: require("../../assets/images/hot/imgs1.png") },
        // { img_url: require("../../assets/images/hot/imgs1.png") },
        // { img_url: require("../../assets/images/hot/imgs1.png") },
        // { img_url: require("../../assets/images/hot/imgs1.png") },
        // { img_url: require("../../assets/images/hot/imgs1.png") }
      ],
      control: [
        // { img_url: require("../../assets/images/hot/out.png") },
        // { img_url: require("../../assets/images/hot/out.png") },
        // { img_url: require("../../assets/images/hot/out.png") },
        // { img_url: require("../../assets/images/hot/out.png") },
        // { img_url: require("../../assets/images/hot/out.png") }
      ],
      swiperOption: {
        autoplay: {
          enabled: true,
          disableOnInteraction: false,
          delay: 3000
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination"
        },
        speed: 800,
        loop: true
      },

      swiperOption2: {
        controller: {
          control: this.mySwiper //控制Swiper1
        }
      }
    };
  },
  methods: {
    enter() {
      this.mySwiper.autoplay.stop();
    },
    leave() {
      this.mySwiper.autoplay.start();
    }
  },

  computed: {
    mySwiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>
<style lang="scss" scoped>
.sd {
  width: 840px;
  height: 360px;
  position: relative;
  .box {
    width: 840px;
    height: 360px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .b_t {
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

  .swiper-button-next,
  .swiper-button-prev {
    height: 44px !important;
    width: 44px !important;
    background-size: 44px 44px;

    &:focus {
      outline: none;
    }
  }

  .swiper-button-prev {
    background-image: url("../static/images/hot/left.png") !important;
    &:hover {
      background-image: url("../static/images/hot/left_b.png") !important;
    }
  }

  .swiper-button-next {
    background-image: url("../static/images/hot/right.png") !important;
    &:hover {
      background-image: url("../static/images/hot/right_b.png") !important;
    }
  }
}
</style>
