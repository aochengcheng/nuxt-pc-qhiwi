<template>
  <div class="container">
    <div>
      <div class="Grey-stripe">
        <GreyStripe></GreyStripe>
      </div>
      <!-- main部分  -->
      <main class="main centered clearFix">
        <Breadcrumb :type="type"></Breadcrumb>
        <!-- <ConditionScreening :countryUrl="countryUrl"></ConditionScreening> -->
        <citys
          title="国家"
          :countryMenu="country"
          setCitymod="belongCity"
          setCountrymod="belongCountry"
          :country_router="countryType"
          :id="id"
          :cid="cid"
          :exitType="exitType"
          :params="router_params"
        />
        <ConditionProperty
          :listData="housingDemand"
          typeName="购房类型"
          fieldName="hoseType"
          :country_router="countryType"
          :city_router="cityType"
          :house_type="exitType"
          :router_params="router_params"
          :wyType="h_type"
        ></ConditionProperty>

        <ConditionProperty
          :listData="hoseType"
          typeName="物业类型"
          fieldName="hoseType"
          :country_router="countryType"
          :city_router="cityType"
          :house_type="exitType"
          :router_params="router_params"
          :wyType="wyType"
        ></ConditionProperty>

        <ConditionProperty
          :listData="fangyuan"
          typeName="房源类别"
          fieldName="hoseTypeOf"
          :country_router="countryType"
          :router_params="router_params"
          :wyType="fyType"
        ></ConditionProperty>

        <ConditionProperty
          :listData="cost"
          typeName="总价 "
          fieldName="hoseTypeOf"
          :country_router="countryType"
          :router_params="router_params"
          :wyType="zjType"
        ></ConditionProperty>

        <!-- 海外好房 -->
        <hr />

        <div class="leftdiv">
          <Howmenyh1 :count="count" type="房产项目"></Howmenyh1>
          <div class="divsx">
            <Sort by="downPay" :router_params="router_params" :country_router="countryType"></Sort>
          </div>
          <!-- <nuxt-child></nuxt-child> -->

          <Housemig
            v-for="(item,i) in n_house_data"
            :result_data="item"
            @click.native="jumpDetails(item.id)"
            :key="i"
          ></Housemig>

          <div class="page">
            <Pagination
              :total="count"
              :currentPage="c_page"
              :pageSize="limit"
              :router_params="router_params"
              :country_router="countryType"
            ></Pagination>
          </div>
        </div>
        <div class="rightdiv">
          <SideRight sTitle="房产头条" :hot_data="modelHot" modelName="house"></SideRight>
        </div>
      </main>
    </div>

    <back-top />
  </div>
</template>
<script>
// import Head from "~/components/Head";
import ConditionScreening from "~/components/condition-screening";
import ConditionProperty from "~/components/condition-Property";
import ConditionHouse from "~/components/condition-house";
import ConditionMoney from "~/components/condition-money";
import SelectionCondition from "~/components/selection-condition";
import Project from "~/components/Project-title-left";
import Picture from "~/components/Picture";
import GreyStripe from "~/components/Grey-stripe";
import Breadcrumb from "~/components/Breadcrumb";
import Howmenyh1 from "~/components/Howmeny-h1";
import Sort from "~/components/sort";
import Housemig from "~/components/haiwaiHouse/housemig";
import SideRight from "~/components/side_right";
import HaiWaiHouse from "~/components/haiwaiHouse/house";
// import HaiWaiFootPic from "~/model/foot_pic/foot_pic";
import Pagination from "~/components/Pagination.vue";
import citys from "~/components/condition-citys";
import backTop from "~/components/backtop.vue";
import { screen, getModelHot, setCountryMode } from "~/utils/mixins";
import { SEOConfig } from "~/utils/config";
import { fetch } from "~/plugins/axios/http.js";
// const limit= 10
export default {
  name: "house",
  mixins: [screen, getModelHot, setCountryMode],
  head() {
    return {
      title: SEOConfig.house.title,
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.house.keywords
        },
        {
          hid: "description",
          name: "description",
          content: SEOConfig.house.description
        }
      ]
    };
  },
  async asyncData(ctx) {
    const {
      country,
      housingDemand,
      hoseType,
      cost,
      fangyuan
    } = ctx.store.state.house_menu.country;
    console.log("hoseType:::::::", hoseType);
    // 购房类型数据 改造
    housingDemand.map((item, i) => {
      if (item.id) {
        item.letter = "ty" + i;
      }
    });
    // 物业类型 数据改造
    hoseType.map((item, i) => {
      if (item.id) {
        item.letter = "wy" + i;
      }
    });
    // 房源 数据改造
    fangyuan.map((item, i) => {
      if (item.id) {
        item.letter = "fy" + i;
      }
    });
    // 总价数据改造
    cost.map((item, i) => {
      if (item.id) {
        item.letter = "zj" + i;
      }
    });
    // console.log("ctx::::::", ctx);

    let myd = ctx.store.state.house_menu.country.country;

    // console.log("myd::::", ctx.store.state.house_menu.country.country);
    // console.log("tx.params.country::::", ctx.params.country);

    var s_country = false,
      s_city,
      city_router = false;
    if (
      ctx.params.country &&
      !ctx.params.country.match(/ty\d+/) &&
      !ctx.params.country.match(/wy\d+/) &&
      !ctx.params.country.match(/fy\d+/) &&
      !ctx.params.country.match(/zj\d+/) &&
      !ctx.params.country.match(/or\d+/) &&
      !ctx.params.country.match(/page\d+/)
    ) {
      // console.log("ctx.params.country:::::", ctx.params.country);
      if (ctx.params.country.indexOf("-") != -1) {
        s_country = ctx.params.country.split("-")[0];
        s_city = ctx.params.country.split("-")[1].slice(2);

        // 保存城市路由
        city_router = ctx.params.country.split("-")[1];
        // console.log("city_router::::::::::::::::", city_router);
      } else {
        s_country = ctx.params.country;
      }
    }

    // 购房类型
    var type, exitType;
    if (ctx.params.country && ctx.params.country.indexOf("ty") != -1) {
      // console.log("ctx.params.country:::::",ctx.params.country.match(/ty\d?/)[0].slice(2));
      type = ctx.params.country.match(/ty\d?/)[0].slice(2);
      exitType = ctx.params.country;
    }
    if (ctx.params.type && ctx.params.type.indexOf("ty") != -1) {
      // console.log("ctx.params.type!!!!", ctx.params.type);
      type = ctx.params.type.slice(2, 3);
      exitType = ctx.params.type;
    }

    // 物业类型
    var wyType, wyExitType;
    if (ctx.params.country && ctx.params.country.indexOf("wy") != -1) {
      // console.log("ctx.params.country:::::", ctx.params.country.match(/wy\d?/)[0].slice(2));
      wyType = ctx.params.country.match(/wy\d?/)[0].slice(2) || 0;
      wyExitType = ctx.params.country.match(/wy\d?/)[0];
    }
    if (ctx.params.type && ctx.params.type.indexOf("wy") != -1) {
      console.log(
        "ctx.params.type!!!!",
        ctx.params.type.match(/wy\d?/)[0].slice(2)
      );
      wyType = ctx.params.type.match(/wy\d?/)[0].slice(2) || 0;
      wyExitType = ctx.params.type.match(/wy\d?/)[0];
    }

    // 房源类别
    var fyType, fyExitType;
    if (ctx.params.country && ctx.params.country.indexOf("fy") != -1) {
      // console.log("ctx.params.country:::::", ctx.params.country.match(/wy\d?/)[0].slice(2));
      fyType = ctx.params.country.match(/fy\d?/)[0].slice(2) || 0;
      fyExitType = ctx.params.country.match(/fy\d?/)[0];
    }
    if (ctx.params.type && ctx.params.type.indexOf("fy") != -1) {
      console.log(
        "ctx.params.type!!!!",
        ctx.params.type.match(/fy\d?/)[0].slice(2)
      );
      fyType = ctx.params.type.match(/fy\d?/)[0].slice(2) || 0;
      fyExitType = ctx.params.type.match(/fy\d?/)[0];
    }

    // 总价
    var zjType, zjExitType;
    if (ctx.params.country && ctx.params.country.indexOf("zj") != -1) {
      // console.log("ctx.params.country:::::", ctx.params.country.match(/wy\d?/)[0].slice(2));
      zjType = ctx.params.country.match(/zj\d?/)[0].slice(2) || 0;
      zjExitType = ctx.params.country.match(/zj\d?/)[0];
    }
    if (ctx.params.type && ctx.params.type.indexOf("zj") != -1) {
      console.log(
        "ctx.params.type!!!!",
        ctx.params.type.match(/zj\d?/)[0].slice(2)
      );
      zjType = ctx.params.type.match(/zj\d?/)[0].slice(2) || 0;
      zjExitType = ctx.params.type.match(/zj\d?/)[0];
    }

    // 排序
    var sort, or, by='index_1', order;
    if (ctx.params.country && ctx.params.country.match(/or\d+/)) {
      console.log("ctx.params.country:::::");
      sort = ctx.params.country.match(/or\d+/)[0].slice(2) || 0;
      // zjExitType = ctx.params.country.match(/or\d?/)[0];
      or = ctx.params.country.match(/or\d+/)[0];
      if (or == "or1" || or == "or2") {
        by = "price";
      } else {
        by = "downPay";
      }

      if (or == "or1" || or == "or3") {
        order = "ASC";
      } else {
        order = "DESC";
      }
    }
    if (ctx.params.type && ctx.params.type.match(/or\d+/)) {
      sort = ctx.params.type.match(/or\d+/)[0].slice(2) || 0;
      or = ctx.params.type.match(/or\d+/)[0];
      if (or == "or1" || or == "or2") {
        by = "price";
      } else {
        by = "downPay";
      }

      if (or == "or1" || or == "or3") {
        order = "ASC";
      } else {
        order = "DESC";
      }
    }

    // 分页
    var c_page;
    if (ctx.params.country && ctx.params.country.match(/page\d+/)) {
      c_page = ctx.params.country.match(/page\d+/)[0].slice(4) || 1;
    }
    if (ctx.params.type && ctx.params.type.match(/page\d+/)) {
      c_page = ctx.params.type.match(/page\d+/)[0].slice(4) || 1;
    }
    // // 国家筛选
    if (s_country) {
      var letter = myd.filter(item => {
        return item.letter == (s_country ? s_country : "");
      });
      console.log("letter+++++++++++++", letter);
      var hid = letter[0].id;
    }

    console.log("ctx.query.name:::", ctx.query.name);

    const name = ctx.query.name ? ctx.query.name : "";
    // 城市中
    const showCityNum = ctx.store.state.cityNum.showCityNum;
    console.log("showCityNum：：", showCityNum);
    const [house_data] = await Promise.all([
      fetch(
        "/dhr/client/house/list",
        {
          page: c_page || 1,
          limit: 10,
          belongCountry: hid,
          belongCity: s_city,
          housingDemand: type,
          hoseType: wyType,
          hoseTypeOf: fyType,
          cost: zjType,
          by,
          order,
          name
        }
      )
    ]);
    const {
      Result: { data, count }
    } = house_data;
    
    console.log('data::::::',data)
    return {
      n_house_data: data,
      country,
      housingDemand,
      hoseType,
      cost,
      fangyuan,

      countryType: s_country, // 国家
      cityType: city_router, //城市
      id: hid || 0,
      cid: s_city,
      count,

      // 购房类型
      h_type: type || 0,
      exitType,

      // 物业类型
      wyType,
      wyExitType,
      // 房源类别
      fyType,
      // 总价
      zjType,
      router_params: ctx.params,
      // 分页
      c_page: c_page || "1",
    };
  },
  data() {
    return {
      house: ["不限", "投资", "教育留学", "购房移民", "自住", "度假养老"],
      display: true,

      fullPath: "/house/",

      countryUrl: `/dhr/client/house/menu`,
      type: [
        {
          title: "海外房产",
          path: ""
        }
      ],
      // country: [],
      // housingDemand: [],
      hoseType: [],
      cost: [],
      fangyuan: [],
      merUrl: `/dhr/client/house/list`,

      cate: 1,

      // 分页数据
      limit: 10
    };
  },

  components: {
    // Head,
    Project,
    Picture,
    GreyStripe,
    Breadcrumb,
    ConditionScreening,
    ConditionHouse,
    ConditionProperty,
    ConditionMoney,
    SelectionCondition,
    Sort,
    Howmenyh1,
    Housemig,
    SideRight,
    Pagination,
    citys,
    backTop
  },

  methods: {
    jumpDetails(id) {
      this.$router.push({
        path: `/house/detail`,
        query: { id }
      });
    }
  }
};
</script>

<style lang="scss">
.clearAll {
  padding-left: 20px;
  position: relative;
  cursor: pointer;
  text-decoration: underline;
  &::after {
    position: absolute;
    content: "";
    width: 14px;
    height: 14px;
    background: url("~static/images/haiwaiHouse/Trash.png") no-repeat center;
    left: 0;
    top: 1.5px;
  }
}
</style>


<style lang="scss" scoped>
.site_nav_bar {
  height: 40px;
  background-color: #f6f6f6;
  border-bottom: 1px solid #e4e4e4;

  .site_nav_bar_box {
    .site_nav_bar_right {
      display: flex;
      .sh {
        line-height: 40px;
        margin-right: 15px;
      }

      .user {
        margin-left: 15px;
        padding-top: 9px;
      }
    }
  }
}
// header
.header {
  height: 80px;
}
// banner

// main
.main {
  margin-top: 0px;
  .leftdiv {
    width: 840px;
    float: left;
    .divsx {
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
  .rightdiv {
    // width: 200px;
    padding-left: 60px;
    float: left;
  }
  .selection-condition {
    .selection {
      margin-left: 80px;
      text-align: left;
      float: left;
    }
  }
}
.Grey-stripe {
  width: 100%;
}
</style>
