<template>
  <div class="hd_d centered">
    <div class="top clearFix">
      <div class="t_left" v-lazy:background-image="hd.coverImg">
        <p>{{hd.title}}</p>
      </div>
      <div class="t_right">
        <h3>活动信息</h3>
        <p class="hd_time">活动时间：{{_UTCTimeForMat(hd.startTime,'yy-mm-dd-noon')}}</p>
        <p class="hd_cx">持续时间：{{_getHours(hd.startTime,hd.endTime)}}</p>
        <p class="hd_address">活动地点：{{hd.address}}</p>

        <div class="clearFix b">
          <div class="housestripimg">
            <Sign
              v-if="hd.merchant"
              :head_img="hd.merchant.headPortrait"
              :simpleName="hd.merchant.simpleName"
              :hot="hd.hot"
              :id="hd.merchant.id"
            />
          </div>
          <div class="housestripimg phoneand" style="margin-left=25px">
            <!-- <Qqtel :phone="house_detail.merchant.phone" red="#ED2530"></Qqtel> -->
            <div class="zixun one f_left" @click="jumpDetails();clickRate()">立即报名</div>
            <div
              class="zixun getPhone f_left"
              @click="clickPhone();clickRate()"
              ref="getPhone"
            >获取电话号码</div>
          </div>
        </div>
      </div>
    </div>

    <main class="content clearFix">
      <div class="f_left l">
        <div class="jb">
          <h3>主讲嘉宾</h3>
          <div class="tx clearFix">
            <div class="head_img">
              <img v-lazy="hd.headImg" />
            </div>
            <p>{{hd.name}}</p>
          </div>
          <div class="jx">{{hd.introduce||'无'}}</div>
        </div>

        <div class="nr">
          <h3>活动内容</h3>
          <p v-html="hd.content"></p>
        </div>
      </div>

      <div class="f_right r">
        <h3>其他活动</h3>
        <template v-for="item in HD">
          <nuxt-link :to="{path:`/hwhd`,query:{id:item.id}}">
            <div v-lazy:background-image="item.coverImg">
              <p>{{item.title}}</p>
            </div>
          </nuxt-link>
        </template>
      </div>
    </main>

    <div v-if="showt">
      <Consultation
        @closeMain="closeMain"
        :merchant_id="hd.merchant.id"
        :typeOf="5"
        :showCity="hd.showCity||'空'"
        :sourceDescription="'null'"
        :sourceTitle="hd.title"
        :sourceDetailed="7"
      ></Consultation>
    </div>
  </div>
</template>

<script>
import { UTCTimeForMat, getHours, UTC } from "~/utils/timeFormat";
import Consultation from "~/components/consultation";
import Sign from "~/components/sign";
import { clickRate, setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [clickRate, setCountryMode],
  async asyncData(ctx) {
    const [hd, hd_detail] = await Promise.all([
      fetch("/dhr/merchant/activity/management", {
        shelf: 1,
        checkState: 1,
        limit: 4,
        by: "index_1"
      }),
      fetch("/dhr/merchant/activity/management/read", {
        id: ctx.query.id
      })
    ]);

    let HD;
    if (hd.ErrCode == "0000") {
      HD = hd.Result.data.filter(item => item.id != ctx.query.id);
    }

    const merchant_id = hd_detail.Result.data.merchant.id;
    console.log("hd::", hd);
    console.log("hd_detail::", merchant_id);

    return {
      HD,
      hd: hd_detail.ErrCode == "0000" ? hd_detail.Result.data : [],
      merchant_id
    };
  },
  data() {
    return {
      //   merchant_id: this.hd.merchant.id,
      hd: [],
      HD: [],
      showt: false
      //   href: location.href
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  watch: {
    id() {
      this.getHDDetails();
    }
  },
  created() {
    // this.getHDDetails();
    // this.getHD();
  },
  methods: {
    clickPhone() {
      let phone = this.$refs.getPhone;
      console.log(phone);
      phone.innerHTML = this.hd.merchant.xuNiPhone || "400-877-1008";
    },

    jumpDetails() {
      this.showt = true;
      console.log(this.showt);
    },
    closeMain(val) {
      this.showt = val;
    },
    _UTCTimeForMat(utc, time) {
      return UTC(utc, time);
    },
    _getHours(s, e) {
      return getHours(s, e);
    }
  },
  components: {
    Consultation,
    Sign
  }
};
</script>

<style scoped lang="scss">
.hd_d {
  padding-top: 50px;
  .top {
    height: 360px;
    box-shadow: 0 0 13px #ccc;
    .t_left {
      float: left;
      width: 640px;
      height: 360px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        top: 0;
        left: 0;
      }
      p {
        font-size: 36px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        text-align: center;
        z-index: 1;
      }
    }
    .t_right {
      float: left;
      width: 560px;
      height: 100%;
      padding: 43px 37px 0 37px;
      position: relative;
      h3 {
        font-size: 22px;
      }
      p {
        font-size: 16px;
        padding-left: 20px;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: #ed2530;
          left: 0;
          top: 6px;
        }
      }
      .hd_time {
        margin-top: 30px;
      }
      .hd_cx {
        margin-top: 20px;
      }
      .hd_address {
        margin-top: 20px;
        //   margin-bottom: 20px;
      }

      .b {
        position: absolute;
        bottom: 50px;
        left: 37px;
      }

      .housestripimg {
        // margin-left: 35px;
        // width: 220px;
        float: left;
        &.phoneand {
          margin-left: 25px;
          padding-top: 10px;
        }
      }

      .zixun {
        position: relative;
        width: 157px;
        height: 34px;
        // border: 1px solid #ed2530;
        padding: 13px 0;
        border-radius: 2px;
        line-height: 1;
        color: #ed2530;
        font-size: 14px;
        text-align: center;
        cursor: pointer;

        &.one {
          background-color: #3cb584;
          color: #fff;
          width: 116px;
          height: 44px;
          padding: 13px 0;
        }
        &::before {
          content: "";
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
          margin-right: 5px;
          background: url("../../static/images/bao.png") no-repeat center/cover;
        }
      }
      .getPhone {
        width: 158px;
        height: 44px;
        margin-left: 15px;
        text-align: center;
        background-color: #ed2530;
        color: #fff;
        &::before {
          background: url("../../static/images/haiwaiHouse/phone.png") no-repeat
            center/cover;
          // position: absolute;
          // left: 0;
          // top: 0;
        }
      }
    }
  }
  .content {
    .l {
      width: 840px;
    }
    .r {
      //   width: ;
      h3 {
        font-size: 18px;
        font-weight: normal;
      }
      div {
        width: 285px;
        height: 160px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin-bottom: 20px;
        cursor: pointer;
        p {
          position: absolute;
          font-size: 18px;
          color: #fff;
          width: 90%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
      }
    }

    h3 {
      padding-top: 40px;
      font-size: 22px;
      border-bottom: 1px solid #e4e4e4;
      padding-bottom: 15px;
    }
    .jb {
      .tx {
        padding-top: 15px;
        .head_img {
          width: 60px;
          height: 60px;
          overflow: hidden;
          border-radius: 50%;
          float: left;
        }
        p {
          float: left;
          font-size: 20px;
          line-height: 60px;
          padding-left: 15px;
        }
      }
      .jx {
        font-size: 16px;
        line-height: 36px;
      }
    }
    .nr {
      p {
        font-size: 16px;
        padding-top: 25px;
      }
    }
  }
}
</style>
