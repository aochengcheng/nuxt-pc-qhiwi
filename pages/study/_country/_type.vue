<template>
  <div class="abroad_container">
    <!-- 阴影 -->
    <GreyStripe></GreyStripe>
    <div v-if="display">
      <div class="centered">
        <Bread :type="type"></Bread>
        <citys
          title="选择国家"
          :countryMenu="country"
          setCitymod="hostCityNum"
          setCountrymod="hostCountryNum"
          :country_router="country_router"
          :id="id"
          :cid="cid"
          :params="router_params"
          buss="study"
        />

        <ConditionProperty
          :listData="schoolType"
          typeName="类别"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="xxlb"
          buss="study"
        ></ConditionProperty>

        <ConditionProperty
          :listData="rank"
          typeName="国内排名"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="gnpm"
          buss="study"
        ></ConditionProperty>

        <ConditionProperty
          :listData="TOEFL"
          typeName="托福要求"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="tfyq"
          buss="study"
        ></ConditionProperty>

        <ConditionProperty
          :listData="IELTS"
          typeName="雅思要求"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="ysyq"
          buss="study"
        ></ConditionProperty>

        <ConditionProperty
          :listData="cost"
          typeName="每年费用"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="mnfy"
          buss="study"
        ></ConditionProperty>

        <hr />

        <Howmenyh1 :count="count" type="留学项目"></Howmenyh1>
      </div>
      <main class="abroad_wrapper centered">
        <div class="wrapper_box">
          <div class="wrapper_img" v-for="(item,i) in study_data" :key="i">
            <div class="test"></div>
            <div class="badge">
              <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">
                <img v-lazy="item.schoolBadgeImg" :key="item.id" :alt="item.schoolName"/>
              </nuxt-link>
            </div>

            <div class="wrapper_right">
              <div class="badge_r">
                <h3 class="colle_zh">
                  <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">{{ item.schoolName }}</nuxt-link>
                </h3>

                <div class="colle_en">{{ item.englishName }}</div>
              </div>

              <div class="badge_addr">
                <div class="addr">
                  <country :country="item.hostCountry"></country>
                </div>
                <p>{{ item.hostCity }}</p>
              </div>

              <div class="ranking">
                <p class="rank">
                  国内综合排名：
                  <span>{{ item.countryRanking }}</span>
                </p>
                <p class="ratio">
                  录取率：
                  <span>{{ item.acceptanceRate }}%</span>
                </p>
              </div>

              <div class="list">
                <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">学校教育</nuxt-link>
                <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">申请条件</nuxt-link>
                <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">专业介绍</nuxt-link>
                <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">每年学费</nuxt-link>
                <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">截止日期</nuxt-link>
                <nuxt-link :to="{path:`/study/detail`,query:{id:item.id}}">开学日期</nuxt-link>
              </div>
            </div>
          </div>

          <div class="page">
            <Pagination
              :total="count"
              :currentPage="c_page"
              :pageSize="10"
              :router_params="router_params"
              :country_router="country_router"
              buss="study"
            ></Pagination>
          </div>
        </div>
        <div class="slide_right_con">
          <SideRight sTitle="留学头条" :hot_data="modelHot" modelName="abroad"></SideRight>
        </div>
      </main>
    </div>
     <back-top />
  </div>
</template>
<script>
import country from "~/components/Country";
import Howmenyh1 from "~/components/Howmeny-h1";
import Bread from "~/components/Breadcrumb";
import ConditionHouse from "~/components/condition-house";
import ConditionScreening from "~/components/condition-screening";
import SideRight from "~/components/side_right";
import GreyStripe from "~/components/Grey-stripe";
import citys from "~/components/condition-citys";
import Pagination from "~/components/Pagination.vue";
import ConditionProperty from "~/components/condition-Property";
import { screen, getModelHot, setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
import { SEOConfig } from "~/utils/config";
import backTop from "~/components/backtop.vue";
export default {
  name: "study",
  mixins: [screen, getModelHot, setCountryMode],

  async asyncData(ctx) {
    const {
      country,
      schoolType,
      rank,
      cost,
      TOEFL,
      IELTS
    } = ctx.store.state.study_menu.study_menu;

    // 类别数据改造
    schoolType.map((item, i) => {
      if (item.id) {
        item.letter = "sc" + i;
      }
    });
    // 国内排名数据改造
    rank.map((item, i) => {
      if (item.id) {
        item.letter = "pm" + i;
      }
    });
    // 雅思要求数据改造
    IELTS.map((item, i) => {
      if (item.id) {
        item.letter = "ys" + i;
      }
    });
    // 托福 要求数据改造
    TOEFL.map((item, i) => {
      if (item.id) {
        item.letter = "tf" + i;
      }
    });
    // 每年费用数据改造
    cost.map((item, i) => {
      if (item.id) {
        item.letter = "nf" + i;
      }
    });

    var s_country = false,
      s_city,
      city_router = false;
    if (
      ctx.params.country &&
      !ctx.params.country.match(/sc\d+/) &&
      !ctx.params.country.match(/pm\d+/) &&
      !ctx.params.country.match(/ys\d+/) &&
      !ctx.params.country.match(/nf\d+/) &&
      !ctx.params.country.match(/tf\d+/) &&
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

    // // 国家筛选
    if (s_country) {
      var letter = country.filter(item => {
        return item.letter == (s_country ? s_country : "");
      });
      console.log("letter+++++++++++++", letter);
      var hid = letter[0].id;
    }

    const all = (router, s = 2) => {
      var n;
      let re = new RegExp(router + "\\d+");
      if (ctx.params.country && ctx.params.country.match(re)) {
        // console.log("ctx.params.country:::::", ctx.params.country.match(/wy\d?/)[0].slice(2));
        n = ctx.params.country.match(re)[0].slice(s) || 0;
      }
      if (ctx.params.type && ctx.params.type.match(re)) {
        n = ctx.params.type.match(re)[0].slice(s) || 0;
      }
      return n;
    };
    // 类别
    const xxlb = all("sc");
    //国内 排名
    const gnpm = all("pm");
    // 托福要求
    const tfyq = all("tf");
    // 雅思要求
    const ysyq = all("ys");
    // 每年费用
    const mnfy = all("nf");
    // 分页
    const c_page = all("page", 4);
    const {
      ErrCode,
      Result: { count, data: study_data }
    } = await fetch("/dhr/client/study_abroad/list", {
      page: c_page,
      limit: 10,
      hostCountryNum: hid,
      hostCityNum: s_city,
      schoolType: xxlb,
      rank: gnpm,
      TOEFL: tfyq,
      IELTS: ysyq,
      cost: mnfy,
      by: "index_1",
      schoolName: ctx.query.schoolName ? ctx.query.schoolName : ""
    });

    return {
      count,
      study_data,
      country_router: s_country,
      router_params: ctx.params,
      country,

      id: hid,
      cid: s_city,

      //   类别
      xxlb,
      schoolType,
      //   国内排名
      rank,
      gnpm,
      //   托福要求
      TOEFL,
      tfyq,
      //   雅思要求
      IELTS,
      ysyq,
      //   每年费用
      cost,
      mnfy,
      //   分页
      c_page
    };
  },

  head() {
    return {
      title: SEOConfig.study.title,
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
      display: true,
      fullPath: "/study/",
      countrytype: [],
      schoolType: [],
      rank: [],
      cost: [],
      TOEFL: [],
      IELTS: [],

      merUrl: `/dhr/client/study_abroad/list`,
      // 总个数
      // count:'',

      type: [
        {
          title: "海外留学",
          path: ""
        }
      ],
      cate: 4,
      // 国家简写
      letter: "",
      limit: 10
    };
  },
  computed: {
    typeOf() {
      return this.$route.query.typeOf;
    }
  },
  methods: {
    jumpDetails(id) {
      // this.$router.push({ path: `/abroad/details`, query: { id } });
      if (!this.letter) {
        console.log(this.letter);
        this.$router.push({
          path: `/${this.cityJX}/study/details`,
          query: { id, country: this.letter }
        });
        return;
      }
      this.$router.push({
        path: `/${this.cityJX}/study/${this.letter}/details`,
        query: { id, country: this.letter }
      });
    },

    // 获取menu
    getMenuData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        console.log(res);
        if (res.ErrCode == "0000") {
          let r = res.Result;
          this.countrytype = r.country;
          this.schoolType = r.schoolType;
          this.rank = r.rank;
          this.cost = r.cost;
          this.TOEFL = r.TOEFL;
          this.IELTS = r.IELTS;
        }
      });
    }
  },

  components: {
    country,
    Bread,
    SideRight,
    GreyStripe,
    ConditionScreening,
    ConditionHouse,
    Howmenyh1,
    Pagination,
    citys,
    ConditionProperty,
    backTop
  }
};
</script>
<style lang="scss" scoped>
.selection-condition {
  .selection {
    margin-left: 80px;
    text-align: left;
    float: left;
  }
}
.abroad_container {
  .abroad_wrapper {
    display: flex;

    .wrapper_box {
      position: relative;
    }
    .wrapper_img {
      display: flex;
      width: 840px;
      box-sizing: content-box;
      padding: 20px 0;
      border-bottom: 1px solid #e4e4e4;
      position: relative;
      overflow: hidden;
      .test {
        z-index: -1;
        width: 0;
        left: -50px;
        top: 0;
        bottom: 20px;
        position: absolute;
        transition: all 0.3s;
        background-color: rgba(0, 0, 0, 0.3);
        opacity: 0.1;
        border-radius: 0 10px;
      }
      &:hover {
        .test {
          right: 0;
          width: 100%;
          transform: skewX(20deg);
        }
      }
      .badge {
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../../static/images/abroad/yuna.png") no-repeat
          center/cover;
        a {
          display: block;
          width: 106px;
          height: 106px;
          overflow: hidden;
          border-radius: 50%;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          // margin: 20px auto 0;
        }
      }
    }

    .wrapper_right {
      padding-top: 10px;
      padding-left: 30px;
      font-size: 14px;

      .badge_r {
        .colle_zh {
          font-size: 22px;
          cursor: pointer;
        }

        .colle_en {
          margin-top: 21px;
          color: #8f949a;
        }
      }
    }

    .badge_addr {
      margin-top: 11px;
      display: flex;
      .addr {
      }
      p {
        margin-left: 6px;
      }
    }

    .ranking {
      color: #9399a5;
      margin-top: 21px;
      display: flex;
      span {
        color: #35b987;
        font-weight: bold;
      }

      .ratio {
        margin-left: 41px;
      }
    }

    .list {
      margin-top: 11px;

      a {
        cursor: pointer;
        padding-right: 9px;
        margin-right: 9px;
        border-right: 2px solid #dad9de;
        color: #9399a5;

        &:last-child {
          padding-right: 0;
          margin-right: 0;
          border: 0;
        }
      }
    }

    .slide_right_con {
      margin-left: 60px;
    }
  }
}
</style>
