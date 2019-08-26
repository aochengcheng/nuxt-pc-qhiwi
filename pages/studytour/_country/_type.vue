<template>
  <div class="study_container">
    <GreyStripe></GreyStripe>
    <div>
      <div class="centered">
        <Bread :type="type"></Bread>
        <havecountry
          typeName="游学国家"
          :listData="country"
          :country_router="country_router"
          :router_params="router_params"
          :id="id"
          router="studytour"
        />

        <ConditionProperty
          :listData="recruitStudent"
          typeName="招生对象"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="zsdx"
          buss="studytour"
        ></ConditionProperty>

        <ConditionProperty
          :listData="theme"
          typeName="游学主题"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="yxzt"
          buss="studytour"
        ></ConditionProperty>

        <hr style="border:1px solid #eee" />
        <Howmenyh1 :count="count" type="游学项目"></Howmenyh1>
        <div class="divsx">
          <!-- <span class="m_sort">默认排序</span> -->
          <Sort
            :router_params="router_params"
            :country_router="country_router"
            root="studytour"
            :sTitle="['价格','热度']"
          ></Sort>
        </div>
      </div>
      <main class="study_wrapper centered">
        <div class="study_imgs">
          <div class="stu_item" v-for="(item,i) in studytour_data" :key="i">
            <nuxt-link :to="{path:`/studytour/detail`,query:{id:item.id}}">
              <div class="stu_img">
                <pic-right-tit
                  :img_src="item.coverImg"
                  :title="item.title"
                  :content="item.subTitle"
                  :alt="item.title"
                ></pic-right-tit>
              </div>
              <div class="date_time">
                <span-date
                  :dataTime="_goTime(item.startTime,item.endTime) | goTime()"
                  :price="item.price"
                >
                  <span>价格:</span>
                </span-date>
              </div>

              <div class="city">
                <span-trip
                  :citys="item.departureCity"
                  :dataTime="_UTCformat(item.startTime,item.endTime)"
                  :merchant="item.merchant.simpleName"
                ></span-trip>
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="page">
          <Pagination
            :total="count"
            :currentPage="c_page"
            :pageSize="9"
            :router_params="router_params"
            :country_router="country_router"
            buss="studytour"
          ></Pagination>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import GreyStripe from "~/components/Grey-stripe";
import Howmenyh1 from "~/components/Howmeny-h1";
import PicRightTit from "~/components/picture-right-title";
import SpanDate from "~/components/span-date";
import SpanTrip from "~/components/Span-trip";
import Bread from "~/components/Breadcrumb";
import havecountry from "~/components/haveCountry";
import ConditionProperty from "~/components/condition-Property";
import Pagination from "~/components/Pagination.vue";
import { screen, setCountryMode } from "~/utils/mixins";
import { UTCformat, goTime } from "~/utils/UTCformat";

import Sort from "~/components/sort";
import { fetch } from "~/plugins/axios/http.js";
import { SEOConfig } from "~/utils/config";
export default {
  name: "studytour",
  mixins: [screen, setCountryMode],
  async asyncData(ctx) {
    // console.log(ctx.store.state.studytour_menu.studytour_menu)
    const {
      recruitStudent,
      country,
      theme
    } = ctx.store.state.studytour_menu.studytour_menu;

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

    // 招生对象数据改造
    recruitStudent.map((item, i) => {
      if (item.id) {
        item.letter = "zs" + i;
      }
    });
    // 游学主题数据改造
    theme.map((item, i) => {
      if (item.id) {
        item.letter = "zt" + i;
      }
    });

    // 游学国家
    var s_country;
    if (
      ctx.params.country &&
      !ctx.params.country.match(/zs\d+/) &&
      !ctx.params.country.match(/zt\d+/) &&
      !ctx.params.country.match(/page\d+/) &&
      !ctx.params.country.match(/or\d+/)
    ) {
      s_country = ctx.params.country;
    }
    if (s_country) {
      var letter = country.filter(item => {
        return item.letter == (s_country ? s_country : "");
      });
      console.log("letter+++++++++++++", letter);
      var hid = letter[0].id;
      console.log('hid:::::::',hid)
    }

    // 招生对象
    const zsdx = all("zs");
    // 游学主题
    const yxzt = all("zt");
    const c_page = all("page", 4);

    // 排序
    var sort, or, by, order;
    if (ctx.params.country && ctx.params.country.match(/or\d+/)) {
      console.log("ctx.params.country:::::");
      sort = ctx.params.country.match(/or\d+/)[0].slice(2) || 0;
      // zjExitType = ctx.params.country.match(/or\d?/)[0];
      or = ctx.params.country.match(/or\d+/)[0];
      if (or == "or1" || or == "or2") {
        by = "price";
      } else {
        by = "hot";
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
        by = "hot";
      }

      if (or == "or1" || or == "or3") {
        order = "ASC";
      } else {
        order = "DESC";
      }
    }

    const {
      ErrCode,
      Result: { data: studytour_data, count }
    } = await fetch("/dhr/client/study_tour/list", {
      page: c_page,
      limit: 9,
      recruitStudent: zsdx,
      country: hid,
      theme: yxzt,
      by,
      order
    });

    // console.log('data:::::::',)

    return {
      recruitStudent,
      country,
      theme,
      router_params: ctx.params,
      //  国家路由
      country_router: s_country,
      id: hid || 0,
      // 招生对象
      zsdx,
      // 游学主题
      yxzt,
      // 分页
      c_page,

      studytour_data,
      count
    };
  },
  head() {
    return {
      title: SEOConfig.studytour.title,
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.studytour.keywords
        },
        {
          hid: "description",
          name: "description",
          content: SEOConfig.studytour.description
        }
      ]
    };
  },
  data() {
    return {
      merUrl: `/dhr/client/study_tour/list`,
      type: [
        {
          title: "海外游学",
          path: ""
        }
      ],
      sort: ["价格", "热度"],
      recruitStudent: [], //招生对象
      country: [],
      theme: [],
      limit: 9,
      params: {
        page: 1,
        limit: 12
      },

      display: true,
      fullPath: "/study/"
    };
  },
  methods: {
    // 获取游学menu
    getStudyTourdata() {
      this.$fetch("/dhr/client/study_tour/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.recruitStudent = res.Result.recruitStudent;
          this.country = res.Result.country;
          this.theme = res.Result.theme;
        }
      });
    },
    jumpDetails(id, UTCTime) {
      // this.$router.push({ path: `/study/details`, query: { id } });
      if (!this.letter) {
        this.$router.push({
          path: `/${this.cityJX}/studytour/details`,
          query: { id, country: this.letter }
        });
        return;
      }
      this.$router.push({
        path: `/${this.cityJX}/studytour/${this.letter}/details`,
        query: { id, country: this.letter }
      });
    },
    _UTCformat(start, end) {
      let UTCTime = UTCformat(start) + "-" + UTCformat(end).substr(5);

      return UTCTime;
    },
    _goTime(start, end) {
      return goTime(start, end);
    }
  },
  created() {
    this.getStudyTourdata();
  },

  components: {
    PicRightTit,
    SpanDate,
    SpanTrip,
    GreyStripe,
    Bread,
    Howmenyh1,
    Pagination,
    Sort,
    havecountry,
    ConditionProperty
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
.study_container {
  .study_wrapper {
    .study_imgs {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      .stu_item {
        margin-right: 30px;
        padding-bottom: 20px;
        cursor: pointer;
        margin-bottom: 30px;
        transition: all 0.3s;
        &:hover {
          box-shadow: 0 0 10px #d0c7c7;
          transform: translateY(-5px);
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        .date_time {
          margin-top: 10px;
          padding-left: 10px;
          span {
            margin-left: 10px;
            padding-bottom: 2px;
            color: #9a9b9f;
          }
        }

        .stu_img {
          width: 380px;
        }

        .city {
          margin-top: 30px;
          padding: 0 12px;
        }
      }
    }
  }
}

.divsx {
  width: 100%;
  height: 40px;
  line-height: 40px;
  // padding-left: 40px;
  // box-shadow: 0 0 20px #f3f2f2;
  .m_sort {
    float: left;
    font-size: 16px;
    margin-right: 30px;
  }
}
</style>
