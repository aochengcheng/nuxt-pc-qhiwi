<template>
  <div class="abroad">
    <div class="project">
      <Project :tname="tname"></Project>
    </div>

    <div class="abroad_pic">
      <nuxt-link :to="{path:`/study/england`}">
        <img src="~static/images/uk.jpg" alt />
        <div class="a_mask">
          <div class="imgs">
            <img src="~static/images/usa-icon.png" />
          </div>
          <h3 v-if="country[0]" :lid="country[0].name">{{ country[0].name }}学院</h3>
        </div>
      </nuxt-link>
      <nuxt-link :to="{path:`/study/canada`}">
        <img src="~static/images/can.jpg" alt />
        <div class="a_mask">
          <img src="~static/images/koel-icon.png" alt />
          <h3 v-if="country[1]" :lid="country[1].name">{{ country[1].name }}学院</h3>
        </div>
      </nuxt-link>
      <nuxt-link :to="{path:`/study/australia`}">
        <img src="~static/images/adly.jpg" alt />
        <div class="a_mask">
          <img src="~static/images/england-icon.png" alt />
          <h3 v-if="country[2]" :lid="country[2].name">{{ country[2].name }}学院</h3>
        </div>
      </nuxt-link>
      <nuxt-link :to="{path:`/study/america`}">
        <img src="~static/images/usa.jpg" alt />
        <div class="a_mask">
          <img src="~static/images/usa-icon.png" alt />
          <h3 v-if="country[3]" :lid="country[3].name">{{ country[3].name }}学院</h3>
        </div>
      </nuxt-link>
    </div>

    <div ref="items">
      <div class="college">
        <College v-if="all_data" :abroad_data="list[kind]"></College>
      </div>
    </div>
  </div>
</template>
<script>
import Project from "../Project-title-left";
import College from "../College";
import { getHomeData, setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [getHomeData, setCountryMode],
  data() {
    return {
      tname: {
        big: "海外留学",
        small: "留学攻略，量身定制",
        moreURL: `/study`,
        options: []
      },

      kind: "all",
      list: {
        all: [],
        xiao: [],
        zhong: [],
        gao: [],
        ben: [],
        shuo: [],
        bo: []
      },
      index: "",

      country: [],
      schoolType: [],

      url: "/dhr/client/study_abroad/list",
      limit: 8,
      paramsType: "schoolType",
      pageName: "不限",
      cacheName: "liuxue"
    };
  },
  computed: {
    cityNum() {
      return this.$store.state.cityNum.showCityNum;
    }
  },
  async mounted() {
    let {
      ErrCode,
      Result: { data }
    } = await fetch(this.url, {
      schoolType: this.index,
      checkState: 1,
      by: "index_1",
      page: 1,
      limit: 8,
      showCityNum: this.cityNum
    });
    if (ErrCode == "0000") {
      this.list[this.kind] = data;
    }
    // console.log("data:::::::", this.list[this.kind]);
  },
  methods: {
    async changeData() {
      if (this.list[this.kind].length > 0) return;

      const {
        ErrCode,
        Result: { data }
      } = await fetch(this.url, {
        schoolType: this.index,
        page: 1,
        limit: 8,
        by: "index_1",
        checkState: 1,
        showCityNum: this.cityNum
      });

      if (ErrCode == "0000") {
        this.list[this.kind] = data;
      }
    },

    // 获取留学国家
    getStudyData() {
      this.$fetch("/dhr/client/study_abroad/menu").then(res => {
        if (res.ErrCode == "0000") {
          // console.log("留学 ：：：", res.Result);
          let { country, schoolType } = res.Result;
          this.schoolType = schoolType;
          this.country = country.slice(1);
          this.tname.options = schoolType;

          this.tname.options.filter((item, i) => {
            item.type = Object.keys(this.list)[i];
          });
          // console.log("options::::::", this.tname.options);
        }
      });
    }
  },
  watch: {
    index() {
      this.changeData();
    }
  },

  created() {
    //  this.tname.moreURL = `/${this.cityJX}/study`;
    this.getStudyData();
  },
  components: {
    Project,
    College
  }
};
</script>
<style lang="scss" scoped>
.abroad {
  margin-top: 52px;

  [none] {
    display: none;
    flex-wrap: wrap;
    &.block {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .abroad_pic {
    display: flex;
    margin-top: 30px;
    a {
      margin-right: 20px;
      position: relative;
      border-radius: 5px;
      overflow: hidden;

      img {
        display: block;
        width: 285px;
        height: 136px;
      }

      &:last-child {
        margin-right: 0;
      }

      .a_mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        // padding-top: 30px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .imgs {
        }
        img {
          display: inline-block;
          width: initial;
          height: initial;
        }

        h3 {
          margin-top: 11px;
          font-size: 17px;
          font-weight: 800;
          color: #fff;
        }
      }
    }
  }

  .college {
    margin-top: 30px;
  }
}
</style>
