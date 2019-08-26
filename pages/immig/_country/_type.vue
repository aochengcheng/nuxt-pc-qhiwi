<template>
  <!-- 游学页面 -->
  <div class="immigrant_container">
    <!-- 阴影 -->
    <grey-stripe></grey-stripe>
    <div>
      <div class="imm_bread centered">
        <Breadcrumb :type="type"></Breadcrumb>

        <havecountry
          typeName="意向国家"
          :listData="country"
          :country_router="country_router"
          :router_params="router_params"
          :id="id"
        />

        <ConditionProperty
          :listData="immigrationid"
          typeName="项目类别"
          :country_router="country_router"
          :router_params="router_params"
          :wyType="xmlb"
          buss="immig"
        ></ConditionProperty>

        <div style="clear: both"></div>
        <hr />

        <Howmenyh1 :count="immig_count" type="移民项目"></Howmenyh1>
      </div>
      <main class="immigrant_wrapper centered">
        <div class="immg_box">
          <template v-for="(item) in immig_data">
            <nuxt-link :to="{path:`/immig/detail`,query:{id:item.id}}">
              <immigs :immig_data="item"></immigs>
            </nuxt-link>
          </template>

          <div class="page">
            <Pagination
              :total="immig_count"
              :currentPage="c_page"
              :pageSize="limit"
              :router_params="router_params"
              :country_router="country_router"
              buss="immig"
            ></Pagination>
          </div>
        </div>

        <div class="immig_r">
          <SideRight sTitle="移民头条" :hot_data="modelHot" modelName="immigrant"></SideRight>
        </div>
      </main>
    </div>

    <back-top />
  </div>
</template>
<script>
import Bread from "~/components/Breadcrumb";
import immigs from "~/components/immig";
import SideRight from "~/components/side_right";
import GreyStripe from "~/components/Grey-stripe";
import Breadcrumb from "~/components/Breadcrumb";
import Howmenyh1 from "~/components/Howmeny-h1";
import Pagination from "~/components/Pagination.vue";
import havecountry from "~/components/haveCountry";
import ConditionProperty from "~/components/condition-Property";
import backTop from "~/components/backtop.vue";
import { screen, getModelHot, setCountryMode } from "~/utils/mixins";
import { SEOConfig } from "~/utils/config";
import { fetch } from "~/plugins/axios/http.js";
import { mapActions } from "vuex";
export default {
  name: "immig",
  mixins: [screen, getModelHot, setCountryMode],
  head() {
    return {
      title: SEOConfig.immig.title,
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.immig.keywords
        },
        {
          hid: "description",
          name: "description",
          content: SEOConfig.immig.description
        }
      ]
    };
  },
  async asyncData(ctx) {
    const { country, immigrationid } = ctx.store.state.immig_menu.immig_country;
    //项目类别数据改造
    immigrationid.map((item, i) => {
      if (item.id) {
        item.letter = "xm" + i;
      }
    });

    // 房源类别
    var xmlb;
    if (ctx.params.country && ctx.params.country.match(/xm\d+/)) {
      // console.log("ctx.params.country:::::", ctx.params.country.match(/wy\d?/)[0].slice(2));
      xmlb = ctx.params.country.match(/xm\d?/)[0].slice(2) || 0;
    }
    if (ctx.params.type && ctx.params.type.indexOf("xm") != -1) {
      console.log(
        "ctx.params.type!!!!",
        ctx.params.type.match(/xm\d?/)[0].slice(2)
      );
      xmlb = ctx.params.type.match(/xm\d?/)[0].slice(2) || 0;
    }

    // 意向国家
    var s_country;
    if (
      ctx.params.country &&
      !ctx.params.country.match(/xm\d+/) &&
      !ctx.params.country.match(/page\d+/)
    ) {
      s_country = ctx.params.country;
    }
    if (s_country) {
      var letter = country.filter(item => {
        return item.letter == (s_country ? s_country : "");
      });
      console.log("letter+++++++++++++", letter);
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

    const {
      ErrCode,
      Result: { data, count }
    } = await fetch("/dhr/client/migrate/list", {
      page: c_page,
      limit: 10,
      hostCountryNum: hid,
      immigrationType: xmlb,
      by: 'index_1'
    });

    if (ErrCode == "0000") {
      var immig_data = data,
        immig_count = count;
    }

    return {
      immig_data,
      immig_count,
      router_params: ctx.params,
      country,
      immigrationid,
      //  国家路由
      country_router: s_country,
      id: hid || 0,

      //   项目类别
      xmlb,
      //   分页
      c_page
    };
  },
  data() {
    return {
      type: [
        {
          title: "海外移民",
          path: ""
        }
      ],
      immig_project: [
        {
          id: 1,
          name: "技术移民"
        },
        {
          id: 2,
          name: "投资移民"
        }
      ],
      immig_country: [],

      immig_data: [],

      display: true,
      fullPath: "/immig/",

      currentPage: 1,
      params: {
        page: 1,
        limit: 6
        // hostCountryNum: 1
      },
      count: 0,
      merUrl: `/dhr/client/migrate/list`,

      // 移民热门
      cate: 3,
      // 国家简写
      letter: "",
      limit: 10
    };
  },
  methods: {
    jumpDetails(id) {
      if (!this.letter) {
        console.log(this.letter);
        this.$router.push({
          path: `/${this.cityJX}/immig/details`,
          query: { id, country: this.letter }
        });
        return;
      }
      this.$router.push({
        path: `/${this.cityJX}/immig/${this.letter}/details`,
        query: { id, country: this.letter }
      });
    },
    ...mapActions({
      immig_menu: "getCountry"
    })
  },
  components: {
    Bread,
    immigs,
    SideRight,
    GreyStripe,
    Breadcrumb,
    Howmenyh1,
    Pagination,
    havecountry,
    ConditionProperty,
    backTop
  }
};
</script>


<style lang="scss" scoped>
.condition-screening {
  .titspan {
    width: 90px;
    text-align: left;
    float: left;
    color: #9399a5;
  }
  .itemsclass {
    float: left;
    text-align: left;
    max-width: 1110px;
    .itclass {
      padding-left: 10px;
      padding-right: 10px;
      float: left;
      cursor: pointer;
      &.show {
        color: #ed2530;
      }
    }
  }
}
</style>


<style lang="scss" scoped>
.immigrant_container {
  .shadow {
    width: 100%;
    height: 30px;
    box-shadow: inset 0 6px 5px #fbfbfb;
  }

  .imm_bread {
  }
  .immigrant_wrapper {
    display: flex;
    .immig_r {
      margin-left: 61px;
    }
  }
}
</style>
