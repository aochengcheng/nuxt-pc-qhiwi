<template>
  <div class="immig_details_container">
    <!-- <grey-stripe></grey-stripe> -->

    <div class="details_wrapper centered">
      <Bread :type="type"></Bread>

      <div class="d_top_box">
        <div class="d_top_box_img">
          <pictrue-float
            :bgimg="immig_detail.imgs"
            :title="immig_detail.name"
            :details="immig_detail.subtitle"
          ></pictrue-float>
        </div>
        <div class="d_top_box_txt">
          <div class="d_wrap">
            <div class="_txt_top">
              <div class="l">
                <p class="_txt_top_ti">办理周期</p>
                <p class="_txt_top_bb">{{ immig_detail.handlingCycle }}</p>
              </div>
              <div>
                <p class="_txt_top_ti">身份类型</p>
                <p class="_txt_top_bb">{{ immig_detail.identityType }}</p>
              </div>
            </div>
            <div class="_txt_center">
              <div class="l">
                <p class="_txt_top_ti">投资额度</p>
                <p
                  class="_txt_top_bb"
                >{{ immig_detail.investmentQuota == '无' ?immig_detail.investmentQuota: '￥'+immig_detail.investmentQuota+'' }}</p>
              </div>
              <div>
                <p class="_txt_top_ti">居住要求</p>
                <p class="_txt_top_bb">{{ immig_detail.demand }}</p>
              </div>
            </div>

            <div class="_txt_bottom">
              <div>
                <Price :price="_money(immig_detail.referenceServiceFee)"></Price>
              </div>

              <p>参考服务费</p>
              <p>(以服务商为准)</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 移民机构 -->
      <contact
        :mer_data="merchant_data"
        :plannerPath="`/immig/merchant`"
        type="immig"
        title="优选服务商"
        :typeOf="2"
        :showCity="immig_detail.showCity"
        :sourceDescription="href"
        :sourceTitle="immig_detail.name"
      ></contact>

      <!-- 项目介绍 -->
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

    <main class="main centered clearFix" ref="main">
      <div class="project_introduction clearFix">
        <div class="project_left f_left" style="width:840px">
          <!-- <div ref="navBox" class>
              <div class="project_left_bar clearFix centered">
                <div class="sm">
                  <small-nav :list="list" :active="active" @getActive="getActive"></small-nav>
                </div>
                <div class="div400" v-show="showPhone" @click="clickThePhone">
                  <div>
                    <div class="imgs">
                      <span ref="phone">点击查看电话</span>
                    </div>
                  </div>
                </div>
              </div>
              <Greystripe v-if="show_yy" />
          </div>-->

          <section class="pro_items">
            <article class="introduction">
              <h3 class="public_h3" id="a1">项目介绍</h3>
              <div class="text" v-html="immig_detail.projectIntroduction"></div>
            </article>
          </section>

          <section class="pro_items">
            <article class="bright_spot">
              <h3 class="public_h3" id="a2">项目亮点</h3>

              <div class="text" v-html="immig_detail.projectBrightSpot">
                <ul>
                  <li>
                    <span>1</span>.
                    <span>身体健康，无传染疾病</span>
                  </li>
                  <li>
                    <span>1</span>.
                    <span>身体健康，无传染疾病</span>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <section class="pro_items">
            <article class="bright_spot shenq">
              <h3 class="public_h3" id="a3">申请条件</h3>
              <div class="text" v-html="immig_detail.requirement">
                <ul>
                  <li>
                    <span>1</span>.
                    <span>身体健康，无传染疾病</span>
                  </li>
                  <li>
                    <span>1</span>.
                    <span>身体健康，无传染疾病</span>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <section class="pro_items">
            <article class="process">
              <h3 class="public_h3" id="a4">办理流程</h3>
              <div class="text" v-html="immig_detail.process">
                <ul>
                  <li>
                    <div class="text_top">
                      <span>1</span>.
                      <span>缴纳服务费（1天）</span>
                    </div>
                    <div class="text_bottom">一次性缴纳服务费</div>
                  </li>
                  <li>
                    <div class="text_top">
                      <span>1</span>.
                      <span>缴纳服务费（1天）</span>
                    </div>
                    <div class="text_bottom">一次性缴纳服务费</div>
                  </li>
                  <li>
                    <div class="text_top">
                      <span>1</span>.
                      <span>缴纳服务费（1天）</span>
                    </div>
                    <div class="text_bottom">一次性缴纳服务费</div>
                  </li>
                </ul>
              </div>
            </article>
          </section>

          <section class="pro_items">
            <article class="details_charges">
              <h3 class="public_h3" id="a5">费用详情</h3>
              <!-- 费用总览 -->
              <div class="cost" v-html="immig_detail.costDetails">
                <div class="cost_head">费用总览</div>
                <div class="cost_foot">
                  <div class="cost_foot_left">申请费</div>
                  <div class="cost_foot_right">3.6-8万人民币</div>
                </div>
              </div>
            </article>
          </section>
        </div>

        <div class="project_right f_right">
          <SlideRight sTitle="移民头条" :hot_data="modelHot" modelName="immigrant"></SlideRight>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import GreyStripe from "~/components/Grey-stripe";
import Bread from "~/components/Breadcrumb";
import PictrueFloat from "~/components/Picture-float-title";
import Price from "~/components/Price";
import SmallNav from "~/components/small_nav";
import SlideRight from "~/components/side_right";
import contact from "~/components/contact";
import money from "~/utils/moneyFormat";
import Greystripe from "~/components/Grey-stripe";
import { fixedNav, referer, getModelHot, setCountryMode } from "~/utils/mixins";
import { SEOConfig } from "~/utils/config";
import { fetch } from "~/plugins/axios/http.js";
export default {
  name: "immigDetail",
  mixins: [fixedNav, referer, getModelHot, setCountryMode],
  async fetch({ store }) {},
  async asyncData(ctx) {
    const { ErrCode, Result } = await fetch(
      "/dhr/client/migrate/" + ctx.query.id
    );
    console.log("ctx:::::::::::", ctx.req);
    if (ErrCode == "0000") {
      var immig_detail = Result;
      var name = immig_detail.name;
    }

    ctx.store.commit("immig_menu/test", {
      sourceTitle: name,
      sourceDescription: "123",
      showCity: immig_detail.showCity
    });

    console.log("yiminSet::::::::", ctx.store.state.immig_menu.test);

    return {
      immig_detail,
      type: [
        {
          title: "海外移民",
          path: "/immig"
        },
        {
          title: name,
          path: ""
        }
      ]
    };
  },
  data() {
    return {
      top: 791, // 屏幕距离上面的距离
      paddingTop: 44,
      // 面包屑
      type: [
        {
          title: "海外移民",
          path: "/immigrant"
        },
        {
          title: "",
          path: ""
        }
      ],

      phone: "400-877-1008",
      img_url: require("~/static/images/study.png"),
      txt: "侨外移民",
      list: [
        {
          tit: "项目介绍",
          id: "#a1"
        },
        {
          tit: "项目亮点",
          id: "#a2"
        },
        {
          tit: "申请条件",
          id: "#a3"
        },
        {
          tit: "办理流程",
          id: "#a4"
        },
        {
          tit: "费用详情",
          id: "#a5"
        }
      ],

      // 判断scrolltop
      scrollT: null,

      id: this.$route.query.id,
      immig_detail: [],
      // 供应商url
      refererURL: `/dhr/client/immigrant/support`,

      // 移民热门
      cate: 3,
      //  bar到达顶部出现showPhone
      showPhone: false,

      href: ""
    };
  },

  head() {
    return {
      title: this.immig_detail.name + "-去海外网",
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: this.immig_detail.labels
        },
        {
          hid: "description",
          name: "description",
          content:
            "去海外网留学为您提供美国移民项目介绍，美国移民申请条件，美国移民申请流程，美国移民政策等内容，更多精彩移民信息，就上去海外网。"
        }
      ]
    };
  },

  //   metaInfo() {
  //     return {
  //       title: this.immig_detail.name + "-去海外网",
  //       meta: [
  //         {
  //           name: "keywords",
  //           content: this.immig_detail.labels
  //         },
  //         {
  //           name: "description",
  //           content: `去海外网留学为您提供美国移民项目介绍，美国移民申请条件，美国移民申请流程，美国移民政策等内容，更多精彩移民信息，就上去海外网。`
  //         }
  //       ]
  //     };
  //   },
  mounted() {
    this.getMerchantData();
    this.href = window.location.href;
  },
  methods: {
    // 金额转换
    _money(m) {
      return money(m);
    },
    clickThePhone() {
      let phone = this.$refs.phone;
      console.log(this.merchant_data);
      phone.innerHTML = this.merchant_data[0].xuNiPhone || `400-877-1008`;
    },
    // 移民详情
    getdetails() {
      this.$fetch("/dhr/client/migrate/" + this.id).then(res => {
        if (res.ErrCode == "0000") {
          this.immig_detail = res.Result;
          console.log(this.immig_detail);
          // this.showCity = this.immig_detail.showCity;
          this.type[1].title = this.immig_detail.name;
        }
      });
    }
  },

  components: {
    GreyStripe,
    Bread,
    PictrueFloat,
    Price,
    SmallNav,
    SlideRight,
    contact,
    Greystripe
  }
};
</script>

<style>
.introduction .text p,
.bright_spot .text p,
.process .text p {
  font-size: 16px;
}
.shenq {
  line-height: 2.5;
}
.details_charges .cost {
  /* text-align: left; */
  font-size: 16px;
}

/* table */
.cost table {
  border-collapse: collapse;
}
.cost table:first-of-type th {
  height: 60px;
  background-color: #e9ebed;
  font-size: 18px;
  color: #0d1c31;
  border: 1px solid #e4e4e4;
  border-bottom: none;
}
.cost table:last-of-type tr th:first-child {
  background-color: #f4f5f6;
}
.cost table:last-of-type tr td,
.cost table:last-of-type tr th {
  width: 260px;
  height: 60px;
  border: 1px solid #e4e4e4;
  text-align: center !important;
}
.cost table:last-of-type tr td:first-child {
  background-color: #f4f5f6;
}
</style>


<style lang="scss" scoped>
.immig_details_container {
  .details_wrapper {
    .d_top_box {
      height: 370px;
      display: flex;
      box-shadow: 0 0 20px #f3f2f2;
      .d_top_box_img {
        height: 100%;
        width: 640px;
      }

      .d_top_box_txt {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        .d_wrap {
          flex: 1;
        }
        ._txt_top,
        ._txt_center {
          text-align: center;
          display: flex;
          justify-content: space-around;
          & > div {
            flex: 1;
          }
          p {
            text-align: center;
          }
        }

        .l {
          // margin-right: 40px;
          p {
            text-align: center;
          }
        }
        ._txt_top_ti {
          color: #9294a1;
          font-size: 14px;
        }
        ._txt_top_bb {
          color: #4dba90;
          font-size: 20px;
          margin-top: 8px;
        }
        ._txt_center {
          margin-top: 31px;
        }
        ._txt_bottom {
          margin-top: 56px;
          color: #9294a1;
          text-align: center;
          p {
            font-size: 14px;
            text-align: center;
          }
        }
      }
    }
  }
  .project_introduction {
    display: flex;
    .project_left {
      width: 840px;
      .public_h3 {
        font-size: 21px;
        padding-bottom: 17px;
        border-bottom: 1px solid #e4e4e4;
      }
      .project_left_bar {
        height: 80px;

        max-width: 1200px;
        min-width: 1000px;
        // width: initial !important;
        .sm {
          float: left;
          padding-top: 16px;
        }
      }

      article {
        .text {
          padding: 20px 0 28px 0;
          font-size: 16px;
        }
      }
      .introduction {
        .text {
          line-height: 2.2;
          font-size: 16px;
          color: #0e1b2e;
        }
      }

      .bright_spot {
        .text {
          ul {
            li {
              font-size: 16px;
              margin-bottom: 21px;
              padding-left: 24px;
              position: relative;
              &::after {
                position: absolute;
                content: "";
                left: 0;
                top: 6px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #f2252a;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }
      }

      .process {
        .text {
          ul {
            position: relative;
            li {
              width: 316px;
              height: 72px;
              padding-left: 25px;
              margin-bottom: 12px;
              position: relative;
              &::before {
                position: absolute;
                content: "";
                left: 0;
                top: 12px;
                width: 15px;
                height: 15px;
                background: url("../../static/images/immigrant/red.png")
                  no-repeat;
              }
              &::after {
                position: absolute;
                content: "";
                height: 100%;
                width: 1px;
                left: 7px;
                top: 27px;
                background: url("../../static/images/immigrant/red_line.png")
                  no-repeat;
              }
              &:last-child {
                // padding-bottom:
                overflow: hidden;
              }
              .text_top {
                height: 36px;
                padding: 10px 20px;
                background-color: #f4f5f7;
              }
              .text_bottom {
                height: 36px;
                padding: 10px 20px;
                color: #a7abae;
                font-size: 13px;
              }
            }
          }
        }
      }

      .details_charges {
        margin-top: 25px;
        // border: 1px solid #d3d4d6;
        // text-align: center;
        .cost {
        }
        .cost_head {
          height: 60px;
          background-color: #eaebef;
          padding: 20px 0;

          font-size: 17px;
          border-bottom: 1px solid #d3d4d6;
        }
        .cost_foot {
          height: 60px;
          border-bottom: 1px solid #d3d4d6;
          background-color: #fff;
          display: flex;
          .cost_foot_left {
            height: 59px;
            width: 260px;
            padding: 20px 0;
            font-size: 15px;
            background-color: #f4f5f7;
          }
          .cost_foot_right {
            padding: 20px 0;
            font-size: 15px;

            flex: 1;
          }
        }

        .comprehensive {
          text-align: center;
          margin-top: 50px;
          .money {
            height: initial;
            .money_l {
              height: initial;
            }
            .money_m {
              padding: 24px 21px 50px;
              text-align: left;
              line-height: 2.3;
            }
          }
        }
      }
    }

    .project_right {
      margin-left: 60px;
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
