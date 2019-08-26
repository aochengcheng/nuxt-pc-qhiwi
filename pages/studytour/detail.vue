<template>
  <div class="study_details">
    <div class="details_wrapper centered">
      <Bread :type="type"></Bread>

      <div class="top_img_box">
        <div class="imgs">
          <img v-lazy="List_data.coverImg" />
        </div>

        <div class="txt">
          <h3 class="text_one">{{ List_data.title }}</h3>
          <div class="data_time">
            <span-date
              :dataTime="_goTime(List_data.startTime,List_data.endTime) | goTime()"
              :price="List_data.price"
            >
              <span>价格:</span>
            </span-date>
          </div>
          <div class="specific">
            <div class="s_left">
              <p>
                <span>行程:</span>
                {{ _goTime(List_data.startTime,List_data.endTime) | goTime() }}天
              </p>
              <p>
                <span>出发城市:</span>
                {{ List_data.departureCity }}
              </p>
              <p>
                <span>报名截止:</span>
                {{ _UTCformat(List_data.closingTime) }}
              </p>
            </div>
            <div class="s_right">
              <p>
                <span>年龄:</span>
                {{ List_data.ages }}岁
              </p>
              <p>
                <span>出行日期:</span>
                {{ _UTCformat(List_data.startTime,List_data.endTime) }}
              </p>
            </div>
          </div>
          <div class="ph_num">
            <Sign
              v-if="List_data.merchant"
              :head_img="List_data.merchant.headPortrait"
              :simpleName="List_data.merchant.simpleName"
            ></Sign>

            <div class="housestripimg phoneand" style="margin-left=25px">
              <!-- <Qqtel :phone="house_detail.merchant.phone" red="#ED2530"></Qqtel> -->
              <div class="zixun one f_left" @click="jumpDetails();clickRate()">咨询Ta</div>
              <div
                class="zixun getPhone f_left"
                @click="clickPhone();clickRate()"
                ref="getPhone"
              >获取电话号码</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showt">
        <Consultation
          @closeMain="closeMain"
          :typeOf="4"
          :showCity="List_data.showCity"
          :sourceDescription="'游学'"
          :sourceTitle="List_data.title"
          :merchant_id="List_data.merchant.id"
          :sourceDetailed="2"
        ></Consultation>
      </div>
    </div>

    <div class="smalltitl" ref="navBox">
      <div class="centered clearFix">
        <div class="smallnavdiv">
          <SmallNav :list="list" :active="active" @getActive="getActive"></SmallNav>
        </div>

        <div class="div400" v-show="showPhone" @click="clickThePhone">
          <div>
            <div class="imgs">
              <span ref="phone">点击查看电话</span>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <Greystripe></Greystripe>
    </div>

    <main class="main centered" ref="main">
      <div class="content clearFix">
        <div class="content_left f_left" style="width:840px">
          <!-- 详细行程 -->
          <section class="pro_items days">
            <div class="trip">
              <h3>详细行程</h3>

              <scrollBar :detailedDescription="detailedDescription" />
            </div>
          </section>

          <!-- 费用说明 -->
          <section class="pro_items">
            <div class="explain">
              <h3 class="d_title">费用说明</h3>

              <div class="explain_txt" v-html="List_data.costDescription"></div>
            </div>
          </section>

          <!-- 行前准备 -->
          <section class="pro_items">
            <div class="ready">
              <h3 class="d_title">行前准备</h3>
              <div v-html="List_data.preparation"></div>
            </div>
          </section>

          <!-- 常见问题 -->
          <section class="pro_items">
            <div class="problem">
              <h3 class="d_title">常见问题</h3>
              <div v-html="List_data.question"></div>
            </div>
          </section>
        </div>

        <div class="content_right f_right">
          <SlideRight sTitle="游学头条" :hot_data="modelHot" modelName="study"></SlideRight>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Bread from "~/components/Breadcrumb";
import SpanDate from "~/components/span-date";
import Sign from "~/components/sign";
import QQtel from "~/components/QQtel";
import SmallNav from "~/components/small_nav";
import SlideRight from "~/components/side_right";
import scrollBar from "~/components/scrollBar";
import { UTCformat, goTime } from "~/utils/UTCformat";
import Consultation from "~/components/consultation";
import Greystripe from "~/components/Grey-stripe";
import {
  fixedNav,
  getModelHot,
  setCountryMode,
  clickRate,
  phone
} from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [fixedNav, getModelHot, setCountryMode, clickRate, phone],

  async asyncData(ctx) {
    const { Result: List_data } = await fetch(
      "/dhr/client/study_tour/" + ctx.query.id
    );
    console.log(List_data);
    const detailedDescription = JSON.parse(List_data.detailedDescription);
    return {
      List_data,
      detailedDescription,

      type: [
        {
          title: "海外游学",
          path: "/study"
        },
        {
          title: List_data.title,
          path: ""
        }
      ]
    };
  },
  head() {
    return {
      title:
        this.List_data.merchant &&
        this.List_data.title +
          "-" +
          this.List_data.merchant.simpleName +
          "-去海外网",
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: this.List_data.labels
        },
        {
          hid: "description",
          name: "description",
          content:
            "去海外网，出国游学首选咨询服务平台，为您提供全方位游学，出国游学公司等游学权威资讯，想了解更多出国游学资讯就上去海外网。"
        }
      ]
    };
  },
  data() {
    return {
      top: 610, //fixed nav top
      paddingTop: 44,

      List_data: {},
      detailedDescription: [],
      list: [
        {
          tit: "详细行程",
          id: "#a1"
        },
        {
          tit: "费用说明",
          id: "#a2"
        },
        {
          tit: "行前准备",
          id: "#a3"
        },
        {
          tit: "常见问题",
          id: "#a4"
        }
      ],
      // 游学 热门
      cate: 2,
      merchant_id: 11,
      showt: false,
      //   href: window.location.href,

      //  bar到达顶部出现showPhone
      showPhone: false
    };
  },
  filters: {
    goTime(value) {
      return Math.floor(value / (24 * 3600 * 1000));
    }
  },
  methods: {
    clickThePhone() {
      let phone = this.$refs.phone;
      phone.innerHTML = this.List_data.merchant.xuNiPhone || this.phone;
    },
    clickPhone() {
      let phone = this.$refs.getPhone;
      console.log(this.List_data.merchant.xuNiPhone);
      phone.innerHTML = this.List_data.merchant.xuNiPhone || this.phone;
    },
    jumpDetails() {
      this.showt = true;
      console.log(this.showt);
    },
    closeMain(val) {
      this.showt = val;
    },
    getStudyDetails() {
      let { id } = this.$route.query;
      this.$fetch(`/dhr/client/study_tour/${id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.List_data = res.Result;
          console.log(this.List_data);

          this.detailedDescription = JSON.parse(res.Result.detailedDescription);
          console.log(this.detailedDescription);
          this.type[1].title = this.List_data.title;

          this.merchant_id = this.List_data.merchant.id;
        }
      });
    },
    _UTCformat(start, end) {
      if (end) {
        var UTCTime = UTCformat(start) + "-" + UTCformat(end).substr(5);
      } else {
        var UTCTime = UTCformat(start);
      }

      return UTCTime;
    },
    _goTime(start, end) {
      return goTime(start, end);
    }
  },
  components: {
    Bread,
    SpanDate,
    Sign,
    QQtel,
    SmallNav,
    SlideRight,
    scrollBar,
    Consultation,
    Greystripe
  }
};
</script>
<style>
.explain_txt,
.ready,
.problem {
  line-height: 36px;
  font-size: 16px;
  color: #0d1c31;
  /* font-weight: bold; */
}
.explain_txt p {
  font-size: 16px;
  font-weight: 500;
}
</style>


<style lang="scss" scoped>
.study_details {
  .details_wrapper {
    .top_img_box {
      height: 363px;
      display: flex;
      box-shadow: 0 0 20px #f3f2f2;
      .imgs {
        width: 546px;
        height: 363px;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .txt {
        padding: 45px 50px 38px;
        flex: 1;
        h3 {
          font-size: 22px;
          width: 520px;
        }
        .data_time {
          margin-top: 20px;
          span {
            margin-left: 10px;
            color: #9d9ea3;
          }
        }
        .specific {
          font-size: 14px;
          padding: 20px 0 15px;
          color: #9d9ea3;
          display: flex;
          border-bottom: 1px dashed #9d9ea3;

          .s_left {
            flex-basis: 30%;
          }
          .s_left,
          .s_right {
            p {
              padding: 6px 0;
              white-space: nowrap;
              span {
                display: inline-block;
                width: 59px;
                text-align: justify;
              }
            }
          }
          .s_right {
            margin-left: 95px;
          }
        }
        .ph_num {
          padding-top: 25px;
          display: flex;
          span {
            margin-left: 55px;
            display: inline-block;
          }
        }
      }
    }
  }

  .content {
    display: flex;
    .content_left {
      width: 840px;
      // padding-top: 27px;
      .nav_t {
        // padding: 27px 0 38px;
        max-width: 1200px;
        min-width: 1190px;
        .sm {
          // padding-top: 16px;
        }
      }

      .d_title {
        padding: 32px 0 16px;
        border-bottom: 1px solid #e4e4e4;
        font-size: 22px;
        margin-bottom: 24px;
      }
      .days {
        // padding-top: 38px;
      }
      .trip {
        h3 {
          height: 64px;
          line-height: 64px;
          font-size: 22px;
          font-weight: bold;
          color: #0d1c31;
          border-bottom: 1px solid #e4e4e4;
          margin-bottom: 10px;
        }
      }

      .explain {
        .explain_txt {
          padding-top: 25px;

          p {
            padding: 10px 0;
          }
        }
      }
    }
    .content_right {
      padding-top: 28px;
      margin-left: 60px;
    }
  }

  .housestripimg {
    margin-left: 35px;
    // width: 220px;
    float: left;
    &.phoneand {
      margin-left: 90px;
      padding-top: 10px;
    }
  }
  .zixun {
    position: relative;
    // float: right;
    width: 157px;
    height: 34px;
    border: 1px solid #ed2530;
    padding: 13px 0;
    // font-weight: bold;
    border-radius: 2px;
    line-height: 1;
    color: #ed2530;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    &.one {
      width: 86px;
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
      background: url("../../static/images/qq2.png") no-repeat center/cover;
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
    }
  }

  .smallnavdiv {
    width: 840px;
    padding-top: 16px;
    height: 80px;
    margin-right: 60px;
    float: left;
  }

  .div400 {
    float: right;
    width: 300px;
    height: 80px;
    line-height: 80px;
    color: #3cb584;
    background: rgba(246, 246, 246, 1);
    padding-left: 70px;
    .imgs {
      padding-left: 34px;
      position: relative;
      font-size: 18px;
      cursor: pointer;
      &::after {
        position: absolute;
        content: "";
        background: url("../../static/images/haiwaiHouse/tel.png") no-repeat
          center / cover;
        width: 36px;
        height: 36px;
        left: -15px;
        top: 23px;
      }
    }
  }
}
</style>
