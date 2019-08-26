<template>
  <div class="planner_container centered">
    <Bread :type="type"></Bread>
    <!-- <ConditionHouse typeName="国家" :listData="mer_menu" fieldName="countryNum" :canReload="false" /> -->

    <havecountry
      typeName="国家"
      :listData="mer_menu"
      :country_router="country_router"
      :router_params="router_params"
      :id="id"
      router="study/merchant"
    />
    <hr />
    <Howmenyh1 :count="count" type="留学服务商"></Howmenyh1>
    <div class="planner_wrap">
      <div class="planner_left">
        <div class="planner_wrapper" v-for="(item, i) in study_merdata" :key="i">
          <div class="planner_wrapper_photo">
            <nuxt-link :to="{path:'/merchant',query:{merchant_id:item.id}}">
              <img v-lazy="item.headPortrait" />
            </nuxt-link>
          </div>
          <div class="planner_wrapper_details clearFix">
            <div class="f_left">
              <div class="details_tit">
                <nuxt-link :to="{path:'/merchant',query:{merchant_id:item.id}}">
                  <h3>{{ item.simpleName }}</h3>
                </nuxt-link>
              </div>
              <div class="details_addr">{{ item.companyName }}</div>
              <div class="details_num">
                <div>
                  咨询量：
                  <span>{{ item.actualNumber }}</span>
                </div>
              </div>
            </div>

            <div class="f_right lianxi">
              <QQtel :phone="item.xuNiPhone||phone" :merchant_id="item.id" :myClass="true"></QQtel>
            </div>

            <!-- <div class="details_good">
              <div class="left">擅长项目：</div>
              <div class="right">
                <ul>
                  <li>澳洲188a</li>
                  <li>澳洲188a</li>
                  <li>澳洲188a</li>
                  <li>澳洲188a</li>
                  <li>澳洲188a</li>
                </ul>
              </div>
            </div>-->
          </div>
        </div>

        <div class="test">
          <!-- <Page :total="count" :currentPage.sync="params.page"></Page> -->
          <Pagination
            :total="count"
            :currentPage="c_page"
            :pageSize="10"
            :router_params="router_params"
            :country_router="country_router"
            buss="study/merchant"
          ></Pagination>
        </div>
      </div>

      <div class="planner_right">
        <slide-right sTitle="留学热门" :hot_data="modelHot"></slide-right>
      </div>
    </div>

    <div v-if="showt">
      <Consultation
        @closeMain="closeMain"
        :typeOf="2"
        :showCity="$store.state.study_menu.m_query.showCity"
        :sourceDescription="$store.state.study_menu.m_query.sourceDescription"
        :sourceTitle="$store.state.study_menu.m_query.sourceTitle"
        :merchant_id="merchant_id"
      ></Consultation>
    </div>
  </div>
</template>
<script>
import SlideRight from "~/components/side_right";
import Pagination from "~/components/Pagination";
import Bread from "~/components/Breadcrumb";
import ConditionHouse from "~/components/condition-house";
import Howmenyh1 from "~/components/Howmeny-h1";
import SelectionCondition from "~/components/selection-condition";
import showCityNum from "~/components/condition-citys";
import QQtel from "~/components/QQtel";
import Consultation from "~/components/consultation";
import havecountry from "~/components/haveCountry";
import { screen, getModelHot, setCountryMode, phone } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
import { SEOConfig } from "~/utils/config";
export default {
  mixins: [screen, getModelHot, setCountryMode, phone],
  async asyncData(ctx) {
    const mer_menu = ctx.store.state.study_menu.merchant_menu;
    // 国家
    var s_country;
    if (ctx.params && ctx.params.country) {
      s_country = ctx.params.country;
    }
    if (s_country) {
      var letter = mer_menu.filter(item => {
        return item.letter == (s_country ? s_country : "");
      });
      //   console.log("letter+++++++++++++", letter);
      var hid = letter[0].id;
    }

    // 分页
    var c_page;
    if (ctx.params.country && ctx.params.country.match(/page\d+/)) {
      c_page = ctx.params.country.match(/page\d+/)[0].slice(4) || 1;
    }
    if (ctx.params.type && ctx.params.type.match(/page\d+/)) {
      c_page = ctx.params.type.match(/page\d+/)[0].slice(4) || 1;
    }

    console.log(
      "store.state.study_menu.m_query.sourceTitle::",
      ctx.store.state.study_menu.m_query.sourceTitle
    );
    const {
      ErrCode,
      Result: { count, data: study_merdata }
    } = await fetch("/dhr/client/study/support", {
      page: 1,
      limit: 10,
      by: "index_1",
      countryNum: hid
    });
    console.log("data::::::::", study_merdata);

    return {
      mer_menu,
      country_router: s_country,
      id: hid || 0,
      router_params: ctx.params,

      count,
      study_merdata,

      c_page
    };
  },
  head() {
    return {
      title: '留学服务商',
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.study.keywords
        },
        {
          hid: "description",
          name: "description",
          content: SEOConfig.study.description
        }
      ]
    };
  },
  data() {
    return {
      canmetaInfo: false,
      canReload: false,
      sTitle: "移民热门",
      type: [
        {
          title: "留学项目",
          path: `/study`
        },
        {
          title: "留学服务商",
          path: ""
        }
      ],

      merUrl: `/dhr/client/study/support`,
      mer_menu: [],
      citys: [], // 城市站

      cate: 4,
      showt: false
    };
  },
  methods: {
    closeMain(val) {
      this.showt = val;
    },
    getMenuData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        console.log("res::::::", res);
        if (res.ErrCode == "0000") {
          this.mer_menu = res.Result.country;
          console.log(this.mer_menu);
        }
      });
    },
    // 城市站
    getCityCount() {
      this.$fetch("/dhr/showCity").then(res => {
        if (res.ErrCode == "0000") {
          // console.log(res.data.all);
          let newar = [];
          this.citys = res.data.all.map((val, i) => {
            let obj = {};
            for (let k in val) {
              if (k == "id") {
                obj["id"] = val[k];
              }
              if (k == "city") {
                obj["name"] = val[k];
              }
            }
            return obj;
          });
        }
      });
    }
  },
  created() {
    this.getMenuData();
    // this.getCityCount();
  },
  components: {
    SlideRight,
    Pagination,
    Bread,
    ConditionHouse,
    Howmenyh1,
    SelectionCondition,
    showCityNum,
    Consultation,
    QQtel,
    havecountry
  }
};
</script>


<style lang="scss">
.selection-condition {
  // height: 50px;
  // line-height: 50px;
  .selection {
    margin-left: 80px;
    text-align: left;
    float: left;
  }
}
</style>


<style lang="scss" scoped>
.test {
  display: flex;
  justify-content: flex-end;
  padding-top: 35px;
  .el-pagination {
    // align-self: flex-start;
    float: right;
  }
}

.planner_container {
  .planner_wrap {
    display: flex;
    .planner_left {
      width: 840px;
      .planner_wrapper {
        // height: 240px;
        padding: 20px 0;
        border-bottom: 1px solid #e4e4e4;
        display: flex;

        &:last-child {
          border: 0;
        }
        .planner_wrapper_photo {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .planner_wrapper_details {
          flex: 1;
          padding-left: 30px;
          .lianxi {
            margin-top: 61px;
          }
          .details_tit {
            cursor: pointer;
            h3 {
              font-size: 22px;
            }
          }
          .details_addr {
            color: #9293a7;
            font-size: 18px;
            margin-top: 20px;
          }
          .details_num {
            font-size: 14px;
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            span {
              color: #3bb586;
            }
            .ph {
              margin-top: 8px;
              i {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 10px;
                vertical-align: bottom;
                background: url("../../../../static/images/qq.png") no-repeat;
              }

              span {
                font-size: 14px;
                color: #a0a6b4;
              }
            }
          }
        }

        .details_good {
          width: 406px;
          height: 73px;
          margin-top: 10px;
          padding: 15px 10px;
          background-color: #f6f6f6;
          font-size: 14px;
          display: flex;
          .left {
            white-space: nowrap;
          }
          .right {
            padding-left: 10px;
            ul {
              li {
                margin-right: 25px;
                float: left;
                line-height: 1.7;
              }
            }
          }
        }
      }
    }

    .planner_right {
      margin-left: 62px;
    }
  }
}
</style>
