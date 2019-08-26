<template>
  <div class="picture_content clearFix" @click="$router.push({path:'/news/detail',query:{id:result_data.id}})">
    <!-- <nuxt-link :to="{path:'/news/detail'}"> -->
      <div>
        <div class="pic" v-if="result_data">
          <img v-lazy="result_data.coverImg" />
        </div>
        <div class="content">
          <h3 class="text_one text_one hover_underline" v-if="result_data">{{ result_data.name }}</h3>

          <div class="article" v-if="result_data">
            <div class="content_text">{{result_data.describe}}</div>
            <!-- <span class="look_all hover_underline">查看全文</span> -->
          </div>

          <div class="source" v-if="result_data">
            <span class="source_sr">来源：{{ result_data.merchant.simpleName }}</span>
            <span class="source_pl">{{ result_data.simpleName }}</span>
            <span class="source_time">发布时间：</span>
            <span class="source_date">{{ _UTCTimeForMat(result_data.createdAt) }}</span>
          </div>
        </div>
      </div>
    <!-- </nuxt-link> -->
  </div>
</template>
<script>
import { UTCTimeForMat } from "~/utils/timeFormat";
// import { setCountryMode } from "../utils/mixins";
export default {
  // mixins: [setCountryMode],
  props: {
    result_data: {}
  },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    console.log("result_data::", this.result_data);
  },
  methods: {
    _UTCTimeForMat(utc, time = true) {
      return UTCTimeForMat(utc, time);
    }
  }
};
</script>
<style lang="scss" scoped>
.picture_content {
  // display: flex;
  width: 900px;
  cursor: pointer;
  .pic {
    width: 240px;
    height: 160px;
    float: left;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    width: 660px;
    float: left;
    padding-left: 30px;
    padding-top: 10px;
    // flex: 1;
    h3 {
      font-size: 20px;
    }

    .article {
      // width: 663px;
      font-size: 12px;
      color: #a6a7a9;
      margin-top: 20px;
      line-height: 1.5;
      padding-right: 90px;
      .content_text {
        font-size: 14px;
        height: 59px;
        overflow: hidden;
      }
      .look_all {
        color: #ea2131;
        cursor: pointer;
      }
    }

    .source {
      margin-top: 14px;
      color: #a6a7a9;
      .source_time {
        margin-left: 20px;
      }
    }
  }
}
</style>
