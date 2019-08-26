<template>
  <div class="hot">
    <div class="project">
      <Project :tname="tname"></Project>
    </div>

    <div class="content">
      <div class="wrap">
        <div ref="items">
          <div class="pic">
            <Picture :result_data="cur.slice(0, 1)[0]"></Picture>
          </div>

          <div class="title_time_x">
            <title-time :title="cur"></title-time>
          </div>
        </div>
      </div>

      <!-- recommend 部分 -->
      <div class="content-right">
        <Recommend :recommend="rec" :hot="rec_hot"></Recommend>
      </div>
    </div>
  </div>
</template>

<script>
import Project from "../Project-title-left";
import Picture from "../Picture";
import TitleTime from "../Title-time";
import Recommend from "../Recommend-right";
import { getHomeData, setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [getHomeData, setCountryMode],
  props: {
    hot_data: {},
    showCityNum: {}
  },
  data() {
    return {
      tname: {
        big: "海外头条",
        small: "深度、角度、速度，权威解读",
        moreURL: `/news`,
        options: [
          {
            id: 1,
            name: "房产",
            type: "house"
          },
          {
            id: 2,
            name: "游学",
            type: "studytour"
          },
          {
            id: 3,
            name: "移民",
            type: "immig"
          },
          {
            id: 4,
            name: "留学",
            type: "study"
          },
          {
            id: 5,
            name: "医疗",
            type: "yiliao"
          }
        ]
      },
      kind: "house",
      list: {
        house: [],
        studytour: [],
        immig: [],
        study: [],
        yiliao: []
      },
      limit: 9,
      url: `/dhr/client/article/list`,
      paramsType: "cate",
      index: 1,
      pageName: "房产",
      cacheName: "hot",

      recommend: {
        house: [],
        studytour: [],
        immig: [],
        study: [],
        yiliao: []
      },
      hot: {
        house: [],
        studytour: [],
        immig: [],
        study: [],
        yiliao: []
      }
    };
  },
  computed: {
    cityNum() {
      return this.$store.state.cityNum.showCityNum;
    },

    cur() {
      // console.log('this.list[this.kind];',this.list[this.kind].slice(0,1)[0])
      return this.list[this.kind];
    },
    rec() {
      return this.recommend[this.kind];
    },
    rec_hot() {
      return this.hot[this.kind];
    }
  },

  async mounted() {
    let _self = this;
    let {
      ErrCode,
      Result: { data }
    } = await fetch("/dhr/client/article/list", {
      page: 1,
      limit: 9,
      checkState: 1,
      cate: _self.index || 1,
      by: "index_1",
      showCityNum: this.cityNum
    });

    if (ErrCode == "0000") {
      _self.list[_self.kind] = data;
    }

    let {
      ErrCode: ErrCode1,
      Result: { data: recommend }
    } = await fetch("/dhr/activity/news", {
      businessNum: _self.index,
      typeOf: 3,
      showCityNum: this.cityNum
    });

    if (ErrCode1 == "0000") {
      _self.recommend[_self.kind] = recommend;
    }
    // 热门项目
    let {
      ErrCode: ErrCode2,
      Result: { data: hot }
    } = await fetch("/dhr/activity/news", {
      businessNum: _self.index,
      typeOf: 5,
      showCityNum: this.cityNum
    });
    if (ErrCode2 == "0000") {
      _self.hot[_self.kind] = hot;
    }
  },

  methods: {
    async changeHotData() {
      if (
        this.list[this.kind].length > 0 ||
        this.recommend.length > 0 ||
        this.hot.length > 0
      )
        return;
      let {
        ErrCode,
        Result: { data }
      } = await fetch("/dhr/client/article/list", {
        page: 1,
        limit: 9,
        checkState: 1,
        cate: this.index || 1,
        by: "index_1",
        showCityNum: this.cityNum
      });
      if (ErrCode == "0000") {
        this.list[this.kind] = data;
      }
      // 精品 推荐
      let {
        ErrCode: ErrCode1,
        Result: { data: recommend }
      } = await fetch("/dhr/activity/news", {
        businessNum: this.index,
        typeOf: 3,
        showCityNum: this.cityNum
      });

      if (ErrCode1 == "0000") {
        this.recommend[this.kind] = recommend;
      }

      // 热门项目
      let {
        ErrCode: ErrCode2,
        Result: { data: hot }
      } = await fetch("/dhr/activity/news", {
        businessNum: this.index,
        typeOf: 5,
        showCityNum: this.cityNum
      });
      if (ErrCode2 == "0000") {
        this.hot[this.kind] = hot;
      }
    }
  },
  watch: {
    index() {
      this.changeHotData();
    }
  },

  components: {
    Project,
    Picture,
    TitleTime,
    Recommend
  }
};
</script>

<style lang="scss" scoped>
.hot {
  height: 417px;
}
.content {
  display: flex;
  justify-content: space-between;
  .wrap {
    width: 900px;
    position: relative;
    padding-top: 30px;
    // display: block;
  }
  [none] {
    width: 900px;
    display: none;

    &.block {
      display: block;
    }

    .pic {
    }
  }
  .title_time_x {
    padding-top: 30px;
    cursor: pointer;
  }

  .content-right {
    padding: 20px 0 0 15px;
    font-size: 14px;
  }
}
</style>

