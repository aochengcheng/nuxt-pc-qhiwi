<template>
  <div class="planner_container centered">
    <Bread :type="type"></Bread>
    <!-- <ConditionHouse typeName="国家" :listData="mer_menu" fieldName="countryNum" :canReload="false" />
    <showCityNum typeName="所在城市" :listData="citys" fieldName="showCityNum" />-->

    <havecountry
      typeName="国家"
      :listData="country"
      :country_router="country_router"
      :router_params="router_params"
      :id="id"
      router="immig/merchant"
    />

    <ConditionProperty
      :listData="allcity"
      typeName="所在城市"
      :country_router="country_router"
      :router_params="router_params"
      :wyType="citynum"
      buss="immig/merchant"
    ></ConditionProperty>
    <hr />
    <Howmenyh1 :count="count" type="移民服务商"></Howmenyh1>

    <div class="planner_wrap">
      <div class="planner_left">
        <div class="planner_wrapper" v-for="(item, i) in house_data" :key="i">
          <div class="planner_wrapper_photo">
            <nuxt-link :to="{path:`/merchant`,query:{merchant_id:item.id}}">
              <img v-lazy="item.headPortrait" />
            </nuxt-link>
          </div>
          <div class="planner_wrapper_details clearFix">
            <div class="f_left">
              <div class="details_tit">
                <nuxt-link :to="{path:`/merchant`,query:{merchant_id:item.id}}">
                  <h3>{{ item.simpleName }}</h3>
                </nuxt-link>
              </div>
              <div class="details_addr">{{ item.companyName }}</div>
              <div class="details_num">
                <div>
                  咨询量：
                  <span>{{ item.actualNumber }}</span>
                </div>
                <!-- <div class="ph">
                  <i></i>
                  <span>{{ item.phone }}</span>
                </div>-->
              </div>
            </div>

            <div class="f_right lianxi">
              <QQtel :phone="item.xuNiPhone||phone" :merchant_id="item.id" :myClass="true"></QQtel>
            </div>
          </div>
        </div>

        <div class="test">
          <!-- <Page v-if="count > 0" :total="count" :currentPage.sync="params.page"></Page> -->
          <Pagination
            :total="count"
            :currentPage="c_page"
            :pageSize="10"
            :router_params="router_params"
            :country_router="country_router"
            buss="immig/merchant"
          ></Pagination>
        </div>
      </div>

      <div class="planner_right">
        <SlideRight sTitle="移民热门" :hot_data="modelHot"></SlideRight>
      </div>

      <div v-if="showt">
        <Consultation
          @closeMain="closeMain"
          :typeOf="2"
          :showCity="$store.state.immig_menu.test.showCity"
          :sourceDescription="$store.state.immig_menu.test.sourceDescription"
          :sourceTitle="$store.state.immig_menu.test.sourceTitle"
          :merchant_id="merchant_id"
        ></Consultation>
      </div>
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
import showCityNum from "~/components/showCItyNum";
import QQtel from "~/components/QQtel";
import Consultation from "~/components/consultation";

import havecountry from "~/components/haveCountry";
import ConditionProperty from "~/components/condition-Property";
import { getModelHot, phone } from "~/utils/mixins";
import { SEOConfig } from "~/utils/config";
import { fetch } from "~/plugins/axios/http.js";
import { mapMutations } from "vuex";
export default {
  mixins: [getModelHot, phone],

  async asyncData(ctx) {
    console.log(
      "asyncData---yiminSet::::::::",
      ctx.store.state.immig_menu.test
    );

    const { country } = ctx.store.state.immig_menu.immig_country;
    // 城市站
    const allcity = ctx.store.state.immig_menu.city;
    // console.log("allcity：：：：：：：：：：：：：", allcity);
    // 城市站改在
    allcity.map((item, i) => {
      if (item.id) {
        item.letter = "ci" + (i + 1);
        item.name = item.city;
      }
    });
    // 意向国家
    var s_country;
    if (
      ctx.params.country &&
      !ctx.params.country.match(/ci\d+/) &&
      !ctx.params.country.match(/page\d+/)
    ) {
      s_country = ctx.params.country;
    }
    if (s_country) {
      var letter = country.filter(item => {
        return item.letter == (s_country ? s_country : "");
      });
      var hid = letter[0].id;
    }

    // 城市站
    var citynum;
    if (ctx.params.country && ctx.params.country.match(/ci\d+/)) {
      // console.log("ctx.params.country:::::", ctx.params.country.match(/wy\d?/)[0].slice(2));
      citynum = ctx.params.country.match(/ci\d?/)[0].slice(2) || 0;
    }
    if (ctx.params.type && ctx.params.type.indexOf("ci") != -1) {
      citynum = ctx.params.type.match(/ci\d?/)[0].slice(2) || 0;
    }

    // 分页
    var c_page;
    if (ctx.params.country && ctx.params.country.match(/page\d+/)) {
      c_page = ctx.params.country.match(/page\d+/)[0].slice(4) || 1;
    }
    if (ctx.params.type && ctx.params.type.match(/page\d+/)) {
      c_page = ctx.params.type.match(/page\d+/)[0].slice(4) || 1;
    }

    const {
      data: {
        Result: { count, data: house_data }
      }
    } = await ctx.app.$axios.get("/dhr/client/immigrant/support", {
      params: {
        page: 1,
        limit: 10,
        sort: "index_1",
        countryNum: hid,
        showCityNum: citynum || 1
      }
    });
    // console.log("a:::::::", Result);

    // console.log("data:::", house_data);

    return {
      country,
      allcity,
      c_page,
      router_params: ctx.params,
      //  国家路由
      country_router: s_country,
      id: hid || 0,
      //城市
      citynum,

      //   列表数据
      house_data,
      count
    };
  },
  head() {
    return {
      title: '移民服务商',
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.immig.keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: SEOConfig.immig.description
        }
      ]
    };
  },
  data() {
    return {
      cate: 3,
      sTitle: "移民热门",
      type: [
        {
          title: "移民项目",
          path: "/immig"
        },
        {
          title: "移民服务商",
          path: ""
        }
      ],

      merUrl: `/dhr/client/immigrant/support`,
      mer_menu: [],
      citys: [], // 城市站

      canmetaInfo: false,

      count: 0,
      screen_data: {},

      house_data: [],
      ds: this.count,
      params: {
        sort: "index_1"
      },

      showt: false,

      merchant_id: "",
      showCity: this.$route.query.showCity
    };
  },
  methods: {
    closeMain(val) {
      this.showt = val;
    },

    getListData() {
      //   console.log(this.params);
      if (this.$store.state.changeCityNum) {
        // console.log(this.$store.state.changeCityNum);
      }

      this.$fetch(this.merUrl, this.params).then(res => {
        console.log("res::::::::", res);
        if (res.ErrCode == "0000") {
          this.house_data = res.Result.data;
          // console.log(this.house_data)
          this.count = res.Result.count;
        }
      });
    },

    getMenuData() {
      this.$fetch("/dhr/client/migrate/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.mer_menu = res.Result.country;
          // console.log(this.mer_menu);
        }
      });
    },
    // 城市站
    getCityCount() {
      this.$fetch("/dhr/showCity").then(res => {
        console.log("res::::::", res);
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
          // console.log(this.citys);
        }
      });
    },
    ...mapMutations("immig_menu", {
      cityState: "cityState"
    })
  },
  created() {
    this.getCityCount();
    this.params = {
      page: 1,
      limit: this.limit || 6,
      sort: "index_1"
    };
  },
  components: {
    SlideRight,
    Pagination,
    Bread,
    ConditionHouse,
    Howmenyh1,
    SelectionCondition,
    showCityNum,
    QQtel,
    Consultation,
    havecountry,
    ConditionProperty
  }
};
</script>


<style lang="scss">
// .selection-condition {
//   height: 50px;
//   line-height: 50px;
//   .selection {
//     margin-left: 80px;
//     text-align: left;
//     float: left;
//   }
// }
</style>


<style lang="scss" scoped>
.test {
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
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
        padding: 39px 0;
        border-bottom: 1px solid #e4e4e4;
        display: flex;

        &:last-child {
          border: 0;
        }
        .planner_wrapper_photo {
          cursor: pointer;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
          img {
            display: block;
            width: 100%;
            height: 100%;
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
