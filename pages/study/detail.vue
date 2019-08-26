<template>
  <div class="abroad_details">
    <div class="abroad_tit centered">
      <Bread :type="type"></Bread>
    </div>

    <div class="detiles_banner">
      <div class="banners_d centered">
        <div class="wrapper_img">
          <div class="badge">
            <p>
              <img v-if="ab_detailsdata.schoolBadgeImg" v-lazy="ab_detailsdata.schoolBadgeImg" />
            </p>
          </div>

          <div class="wrapper_right">
            <div class="badge_r">
              <h3 class="colle_zh" v-if="ab_detailsdata.schoolName">{{ ab_detailsdata.schoolName }}</h3>

              <div
                class="colle_en"
                v-if="ab_detailsdata.englishName"
              >{{ ab_detailsdata.englishName }}</div>
            </div>

            <div class="badge_addr">
              <div class="addr">
                <country :country="ab_detailsdata.hostCountry+' ' + ab_detailsdata.hostCity"></country>
              </div>
            </div>

            <div class="website">
              <country :country="ab_detailsdata.schoolWebsite"></country>
            </div>
          </div>
        </div>

        <div class="d_rank">
          <div class="domestic">
            <h3>国内排名</h3>
            <div class="qizi">{{ ab_detailsdata.countryRanking }}</div>

            <p class="d_one">
              2
              <span>(耶鲁)</span>
            </p>
            <p class="d_two">
              3
              <span>(剑桥)</span>
            </p>
          </div>
          <div class="international"></div>
        </div>

        <div class="d_rank ri">
          <div class="domestic">
            <h3>国际排名</h3>
            <div class="qizi">{{ ab_detailsdata.internationalRanking }}</div>

            <p class="d_one">
              1
              <span>(耶鲁)</span>
            </p>
            <p class="d_two">
              3
              <span>(剑桥)</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="details_wrapper centered">
      <contact
        :title="title"
        :mer_data="merchant_data"
        :plannerPath="`/study/merchant/`"
        type="study"
        :typeOf="3"
        :showCity="ab_detailsdata.showCity"
        :sourceDescription="'132'"
        :sourceTitle="ab_detailsdata.schoolName"
      ></contact>
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
      <div class="school_wrap clearFix">
        <div class="school_left f_left" style="width:840px">
          <!-- <div ref="navBox">
            <nav class="sl_nav clearFix centered">
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
            </nav>
            <Greystripe v-if="show_yy"></Greystripe>
          </div>-->

          <!-- 学校介绍 -->
          <section class="pro_items">
            <div class="school_introduction" id="a1">
              <div class="school_head">学校介绍</div>

              <!-- <div class="ratio">
                  <div>
                    <p class="_txt_top_ti">录取率</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.acceptanceRate | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">毕业率</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.graduationRate | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">就业率</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.employmentRate | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">毕业薪资</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.salary | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">国际学生比例</p>
                    <p
                      class="_txt_top_bb"
                    >{{ ab_detailsdata.countryStudentProportion | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">学生总数量</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.studentTotal | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">本科生数量</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.undergraduatesTotal | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">研究生数量</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.graduateStudentTotal | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">师生比例</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.staffStudentRatio | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">男女比例</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.maleFemaleRatio | filter_emp }}</p>
                  </div>
                  <div>
                    <p class="_txt_top_ti">办理周期</p>
                    <p class="_txt_top_bb">{{ ab_detailsdata.cycle | filter_emp }}</p>
                  </div>
              </div>-->

              <div class="s_txt">
                <p class="txt_wr" v-html="ab_detailsdata.schoolIntroduce"></p>
              </div>
            </div>
          </section>
          <!-- 申请条件 -->
          <section class="pro_items">
            <div class="application_conditions" id="a2">
              <div class="items_ld">
                <div class="school_head m30">申请条件</div>

                <div v-html="ab_detailsdata.applicationConditions">
                  <!-- <div class="app_con">
                      <div class="con_top">一. 需要参加的考试</div>
                      <div class="con_list">
                        <p class="con_s">sta1或者act</p>
                        <p class="con_s">sta1或者act</p>
                      </div>
                  </div>-->

                  <!-- <div class="app_con">
                      <div class="con_top">一. 需要参加的考试</div>
                      <div class="con_list">
                        <p class="con_s">sta1或者act</p>
                        <p class="con_s">sta1或者act</p>
                      </div>
                  </div>-->
                  <!-- <div class="app_con">
                      <div class="con_top">一. 需要参加的考试</div>
                      <div class="con_list">
                        <p class="con_s">sta1或者act</p>
                        <p class="con_s">sta1或者act</p>
                      </div>
                  </div>-->
                </div>
              </div>
            </div>
          </section>

          <!-- 专业设置 -->
          <section class="pro_items">
            <div class="professional_setup" id="a3">
              <div class="school_head m30">专业设置</div>

              <div v-html="major.content">
                <div class="setup_its">
                  <div class="con_top setup">专业介绍</div>
                  <div class="setup_time">修读年限：4年</div>
                </div>

                <div class="setup_its">
                  <div class="con_top setup">本科专业</div>
                  <div class="setup_time">
                    <div class="setup_name">文学:</div>
                    <div class="setup_nd">音乐学、创意写作、文学研究、语言学</div>
                  </div>
                </div>
              </div>

              <div class="my_swiper">
                <swiper :options="swiperOption">
                  <swiper-slide v-for="(item,i) in major.imgs" :key="i">
                    <div class="m_swipeItem">
                      <img v-lazy="item" />
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
              </div>
            </div>
          </section>
          <!-- 每年学费 -->
          <section class="pro_items">
            <div class="tuition" id="a4">
              <div class="school_head m30">每年学费</div>
              <div class="tables" v-html="ab_detailsdata.annualFee">
                <!-- <Table :trs="tuition"></Table> -->
              </div>
            </div>
          </section>
          <!-- 截止日期 -->
          <section class="pro_items">
            <div class="closing_date" id="a5">
              <div class="school_head m30">截止日期</div>
              <div class="tables" v-html="ab_detailsdata.expirationDate">
                <!-- <Table :trs="end"></Table> -->
              </div>
            </div>
          </section>
          <!-- 开学日期 -->
          <section class="pro_items">
            <div class="ppening_date" id="a6">
              <div class="school_head m30">开学日期</div>
              <div class="tables" v-html="ab_detailsdata.schoolBeginsDate">
                <!-- <Table :trs="open"></Table> -->
              </div>
            </div>
          </section>
        </div>

        <div class="school_right f_right">
          <slide-right sTitle="留学头条" :hot_data="modelHot" modelName="abroad"></slide-right>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import Bread from "~/components/Breadcrumb";
import country from "~/components/Country";
import contact from "~/components/contact";
import SmallNav from "~/components/small_nav";
// import Table from "~/components/Tables";
import slideRight from "~/components/side_right";
import Greystripe from "~/components/Grey-stripe";
import { fetch } from "~/plugins/axios/http.js";
import { fixedNav, referer, getModelHot, setCountryMode } from "~/utils/mixins";
export default {
  mixins: [fixedNav, referer, getModelHot, setCountryMode],
  async asyncData(ctx) {
    "/dhr/client/study_abroad/${id}";
    const { ErrCode, Result: ab_detailsdata } = await fetch(
      "/dhr/client/study_abroad/" + ctx.query.id
    );

    const major = JSON.parse(ab_detailsdata.professionalSetup);
    const schoolName = ab_detailsdata.schoolName;

    console.log("ab_detailsdata:::::", ab_detailsdata);

    ctx.store.commit("study_menu/setQuery", {
      sourceTitle: schoolName,
      sourceDescription: "留学地址",
      showCity: ab_detailsdata.showCity
    });

    console.log("");

    return {
      ab_detailsdata,
      major,
      type: [
        {
          title: "海外留学",
          path: `/study`
        },
        {
          title: schoolName,
          path: ""
        }
      ]
    };
  },
  head() {
    return {
      title: this.ab_detailsdata.schoolName + "-去海外网",
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: this.ab_detailsdata.labels
        },
        {
          hid: "description",
          name: "description",
          content:
            "去海外网留学为您提供美剑桥大学留学，剑桥大学留学申请，剑桥大学留学申请条件，剑桥大学留学申请流程等内容，更多精彩留学信息，就上去海外网。"
        }
      ]
    };
  },
  data() {
    return {
      //   ab_detailsdata: [],
      top: 820, //fixed nav top
      paddingTop: 44,

      // 供应商url
      refererURL: `/dhr/client/study/support`,
      // 供应商id
      id: this.$route.query.id,

      title: "服务商家",
      context: [
        {
          phone: "176 3097 1140",
          img_url: require("../../static/images/study.png")
        },
        {
          phone: "176 3097 1140",
          img_url: require("../../static/images/study.png")
        },
        {
          phone: "176 3097 1140",
          img_url: require("../../static/images/study.png")
        },
        {
          phone: "176 3097 1140",
          img_url: require("../../static/images/study.png")
        }
      ],
      // nav
      list: [
        {
          tit: "学校介绍",
          id: "#a1"
        },
        {
          tit: "申请条件",
          id: "#a2"
        },
        {
          tit: "专业设置",
          id: "#a3"
        },
        {
          tit: "每年学费",
          id: "#a4"
        },
        {
          tit: "截止日期",
          id: "#a5"
        },
        {
          tit: "开学日期",
          id: "#a6"
        }
      ],

      // 留学 热门
      cate: 4,
      // 专业设置
      major: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },

      //  bar到达顶部出现showPhone
      showPhone: false

      //   href: window.location.href
    };
  },
  mounted() {
    this.getMerchantData();
  },

  methods: {
    clickThePhone() {
      let phone = this.$refs.phone;
      phone.innerHTML = this.merchant_data[0].phone;
    },
    // 获取详情数据
    getDetailData() {
      const { id } = this.$route.query;
      this.$fetch(`/dhr/client/study_abroad/${id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.ab_detailsdata = res.Result;
          this.type[1].title = this.ab_detailsdata.schoolName;

          this.major = JSON.parse(this.ab_detailsdata.professionalSetup);

          //   console.log(this.ab_detailsdata);
          // this.major =
        }
      });
    },
    getActive(val) {
      this.active = val;
      let section = document.querySelectorAll(".pro_items");
      let top = section[val].offsetTop - 10;
      document.documentElement.scrollTop = top;
    }
  },
  filters: {
    filter_emp(val) {
      return val ? val + "%" : "暂无";
    }
  },
  created() {
    // this.getDetailData();
  },

  components: {
    Bread,
    country,
    contact,
    SmallNav,
    // Table,
    slideRight,
    Greystripe
  }
};
</script>
<style>
table th,
table td {
  font-weight: normal;
}
.s_txt table {
  text-align: center;
  text-indent: initial;
}
.s_txt table tr {
}
.s_txt table tr:first-child {
  display: none;
}
.s_txt table tr td {
  width: 25%;
  text-align: center;
  color: #9294a1;
  font-size: 14px;
  padding-bottom: 25px;
}
.s_txt table tr td p {
  padding-top: 6px;
  font-size: 20px !important;
  /* color: #4dba90 !important; */
}
.s_txt table tr td p span {
  /* font-size: 20px !important;
  color: #4dba90 !important; */
}

/* 每年学费  */
.tuition .tables {
}
.tables table {
  border-collapse: collapse;
  border-spacing: 0;
}

.tuition .tables table tr th {
  background-color: #edf0f7;
  border: 1px solid #e4e4e4;
  line-height: 2;
}
.tuition .tables table tr th p {
  line-height: 1;
  text-indent: 10px;
  padding-bottom: 10px;
}
.tuition .tables table tr td {
  width: 25%;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 3.5;
  /* font-weight: 600; */
}

/* 截止日期  */
.tables table tr {
  font-size: 16px;
  font-weight: bold;
}
.closing_date .tables table tr th,
.ppening_date .tables table tr th {
  background-color: #edf0f7;
  line-height: 3.6;
  border: 1px solid #e4e4e4;
}
.closing_date .tables table tr td,
.ppening_date .tables table tr td {
  width: 50%;
  text-align: center;
  /* font-size: 16px; */
  line-height: 3.6;
  border: 1px solid #e4e4e4;
}

/* 申请条件  */
.application_conditions {
  font-size: 16px;
}
</style>


<style lang="scss" scoped>
.abroad_details {
  .detiles_banner {
    height: 370px;
    background: url("../../static/images/abroad/banner.png") no-repeat
      center/cover;
    padding-top: 40px;
    .banners_d {
      color: #fff;
      padding-left: 50px;
      .wrapper_img {
        float: left;
        display: flex;
        // width: 840px;
        box-sizing: content-box;
        padding: 20px 0;
        .badge {
          width: 140px;
          height: 143px;
          background: url("../../static/images/abroad/banner-ff.png") no-repeat
            0px 3px;

          display: flex;
          justify-content: center;
          align-items: center;
          p {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .wrapper_right {
          padding-top: 10px;
          padding-left: 30px;

          .badge_r {
            .colle_zh {
              font-size: 22px;
            }

            .colle_en {
              margin-top: 21px;
            }
          }

          .badge_addr {
            margin: 14px 0;
          }
        }
      }

      .d_rank {
        float: left;
        padding-top: 20px;
        margin-left: 340px;
        .domestic {
          text-align: center;
          h3 {
            font-size: 16px;
          }

          .qizi {
            margin-top: 15px;
            width: 64px;
            height: 74px;
            line-height: 66px;
            background: url("../../static/images/abroad/qizi.png") no-repeat;
            color: #3ab080;

            font-size: 23px;
          }
          .d_one,
          .d_two {
            span {
              margin-left: 4px;
            }
          }
          .d_one,
          .d_two {
            margin-top: 17px;
          }
        }
      }
      .ri {
        margin-left: 80px;
      }
    }
  }

  .details_wrapper {
    margin-top: 30px;
    .m30 {
      margin-top: 30px !important;
    }
  }
  .school_wrap {
    display: flex;
    .school_left {
      width: 840px;
      line-height: 3;
      // padding-top: 40px;
      .sl_nav {
        max-width: 1200px;
        min-width: 1190px;
        line-height: initial;

        .sm {
          padding-top: 16px;
          float: left;
        }
      }
      .school_head {
        height: 64px;
        line-height: 64px;
        font-size: 22px;
        font-weight: bold;
        color: #0d1c31;
        border-bottom: 1px solid #e4e4e4;
        margin-bottom: 10px;
      }
      .school_introduction {
        .ratio {
          display: flex;
          flex-wrap: wrap;
          padding: 50px 0 18px;
          line-height: initial;
          & > div {
            width: 25%;
            text-align: center;
            margin-bottom: 32px;
          }
          ._txt_top_ti {
            color: #9294a1;
            font-size: 14px;
          }
          ._txt_top_bb {
            color: #4dba90;
            font-size: 20px;
            padding-top: 20px;
          }
        }

        .s_txt {
          .txt_wr {
            padding-top: 50px;
            font-size: 15px;
            line-height: 2;
            text-indent: 2em;
          }
        }
      }

      .con_top {
        position: relative;
        padding-left: 17px;
        line-height: 2;
        &::before {
          position: absolute;
          content: "";
          width: 10px;
          height: 10px;
          background: #ea272d;
          left: 0;
          top: 10px;
          border-radius: 50%;
        }
      }

      .application_conditions {
        .app_con {
          padding-top: 20px;
          font-size: 15px;

          .con_list {
            padding-left: 42px;
            .con_s {
              // line-height: 3;
            }
          }
        }
      }

      .professional_setup {
        font-size: 15px;
        .setup_its {
          padding-top: 25px;
          .setup {
            padding-left: 17px;
            position: relative;
          }
          .setup_time {
            padding-left: 17px;
            display: flex;
            .setup_name {
            }
            .setup_nd {
            }
          }
        }

        .my_swiper {
          position: relative;
          .m_swipeItem {
            width: 270px;
            height: 180px;
            border-radius: 5px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
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
            background-image: url("../../static/images/hot/left.png") !important;
            &:hover {
              background-image: url("../../static/images/hot/left_b.png") !important;
            }
          }

          .swiper-button-next {
            background-image: url("../../static/images/hot/right.png") !important;
            &:hover {
              background-image: url("../../static/images/hot/right_b.png") !important;
            }
          }
        }
      }
      // table
      .tables {
        margin-top: 25px;
      }
      .tuition {
      }
    }
    .school_right {
      margin-left: 60px;
      padding-top: 25px;
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
