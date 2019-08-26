<template>
  <div>
    <div class="banner">
      <div class="centered sb">
        <div class="search_box">
          <Search></Search>
        </div>
      </div>

      <div>
        <!-- <swiper :options="swiperOption">
          <swiper-slide v-for="(item,i) in banner" :key="i">
            <div class="ban_items" v-lazy:background-image="item.imgPath">
              <a :href="item.host"></a>
            </div>
          </swiper-slide>

          <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
        </swiper>-->
        <slide :banner="banner" />
      </div>
    </div>
    <main class="main centered">
      <!-- 海外活动 -->
      <HaiWaiHd :HD="HD" :showCityNum="showCityNum" />
      <!-- 海外热门 -->
      <HaiWaiHot :hot_data="hot_data" />
      <!-- <nuxt-child></nuxt-child> -->
      <!-- 海外房产 -->
      <HaiWaiHouse />
      <!-- 海外移民 -->
      <HaiWaiImmigration />
      <!-- 海外留学 -->
      <HaiWaiAbroad />
      <!-- 海外游学 -->
      <HaiWaiStudy />

      <!-- 广告 -->
      <footPic />
    </main>
  </div>
</template>

<script>
import Search from "~/components/Platform-Project-Search";
import HaiWaiHd from "~/components/hd";
import HaiWaiHot from "~/components/haiwaiHot/haiwai";
import HaiWaiHouse from "~/components/haiwaiHouse/house";
import HaiWaiImmigration from "~/components/immigration/immigration";
import HaiWaiAbroad from "~/components/abroad/abroad";
import HaiWaiStudy from "~/components/study/study";
import slide from "~/components/slider/slide";
import footPic from "~/components/foot_pic";

import { fetch } from "~/plugins/axios/http.js";
import { SEOConfig } from "~/utils/config";
export default {
  fetch(context) {
    // console.log("context::::::::::::", context.store.state.cityNum);
  },
  data() {
    return {
      le() {
        // if (process.browser) {
        //   return JSON.parse(window.sessionStorage.getItem("vuex")).cityNum
        //     .letter;
        // }
      }
      // as: "999"
    };
  },

  mounted() {
    // console.log('le:":::', this.as);
  },
  async asyncData(ctx) {
    const showCityNum = ctx.store.state.cityNum.showCityNum;
    console.log("ci:::::", ctx.params.ci);
    let [banner, Hd, foot, allCity] = await Promise.all([
      fetch(
        "/dhr/activity/news",
        {
          typeOf: 2,
          businessNum: 100
        },
        showCityNum
      ),
      fetch(
        "/dhr/merchant/activity/management",
        {
          shelf: 1,
          checkState: 1,
          by: "index_1",
          limit: 4
        },
        showCityNum
      ),
      fetch("/dhr/business/advertise/manage", {
        typeOf: 4,
        businessNum: 2
      }),
      //   城市站
      fetch("/dhr/showCity")
    ]);

    // 城市站过滤

    let currentCity = allCity.data.hot.filter(
      item => item.letter == ctx.params.ci
    );
    console.log("city:::::city", currentCity);

    let HD;
    if (Hd.ErrCode == "0000") {
      HD = Hd.Result.data;
    }

    return {
      banner: banner.Result.data,
      HD,
      showCityNum,
      city: currentCity[0].city
    };
  },
  head(ctx) {
    console.log("head:已执行");
    // console.log("process:::", process);
    return {
      // 【去海外网】${this.le()}海外房产，${this.city||this.le()}海外移民，${this.city||this.le()}留学_游学，就上去海外网
      title: `【去海外网】${this.city}海外房产,${this.city}海外房产,${this.city}留学_游学，就上去海外网`,
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.home.keywords
        },
        {
          hid: "description",
          name: "description",
          content: SEOConfig.home.description
        }
      ]
    };
  },
  computed: {
    hot_data() {
      return this.$store.state.hot.hotdata;
    },
    letter() {
      // return this.$store.state.cityNum.letter;
    }
  },
  components: {
    Search,
    HaiWaiHot,
    HaiWaiHouse,
    HaiWaiImmigration,
    HaiWaiAbroad,
    HaiWaiStudy,
    HaiWaiHd,
    slide,
    footPic
  }
};
</script>

<style scoped lang="scss">
// banner
.banner {
  position: relative;
  min-width: 1200px;
  height: 380px;
  width: 100%;
  overflow: hidden;

  .imgbox {
    width: 100%;
  }

  .ban_items {
    height: 380px;
    width: 100%;
    background-position: center;
    // background-size: cover;
    background-repeat: no-repeat;
  }

  .sb {
    position: relative;
  }
  .search_box {
    position: absolute;
    z-index: 9999;
    overflow: hidden;
    left: 0;
  }
}
.main {
  padding-top: 50px;
}
</style>


