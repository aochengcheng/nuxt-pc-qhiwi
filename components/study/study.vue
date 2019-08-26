<template>
  <div class="study">
    <div class="project">
      <Project :tname="tname"></Project>
    </div>

    <div class="study_imgs">
      <div ref="items">
        <div class="stu_item" v-for="(item,i) in list[kind]" :key="i">
          <nuxt-link :to="{path:'/studytour/detail',query:{id:item.id}}">
            <div class="stu_img">
              <pic-right-tit :img_src="item.coverImg" :title="item.title" :content="item.subTitle"></pic-right-tit>
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
        <!-- </template> -->
        <!-- </div> -->
      </div>
    </div>

    <div class="study_content"></div>
  </div>
</template>
<script>
import Project from "../Project-title-left";
import PicRightTit from "../picture-right-title";
import SpanDate from "../span-date";
import SpanTrip from "../Span-trip";
import { UTCformat, goTime } from "~/utils/UTCformat";
import { setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [setCountryMode],
  // inject: ["app"],

  data() {
    return {
      tname: {
        big: "海外游学",
        small: "用心陪伴您的旅程",
        moreURL: "/studytour",
        options: []
      },
      list: {
        all: [],
        you: [],
        xiao: [],
        chu: [],
        gao: [],
        da: [],
        zai: [],
        qin: []
      },
      kind: "all",
      index: "",

      tourMuen: [],
      url: "/dhr/client/study_tour/list",
      limit: 3,
      paramsType: "recruitStudent",
      pageName: "不限",
      cacheName: "youxue"
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
      recruitStudent: this.index,
      checkState: 1,
      by: "index_1",
      page: 1,
      limit: 3,
      showCityNum: this.cityNum
    });
    if (ErrCode == "0000") {
      this.list[this.kind] = data;
    }
    console.log("data:::::::", this.list[this.kind]);
  },
  methods: {
    async changeData() {
      if (this.list[this.kind].length > 0) return;

      const {
        ErrCode,
        Result: { data }
      } = await fetch(this.url, {
        recruitStudent: this.index,
        page: 1,
        limit: 3,
        by: "index_1",
        checkState: 1,
        showCityNum: this.cityNum
      });

      if (ErrCode == "0000") {
        this.list[this.kind] = data;
      }
    },
    // 获取游学menu
    getStudyTourMenu() {
      this.$fetch("/dhr/client/study_tour/menu").then(res => {
        if (res.ErrCode == "0000") {
          // console.log(res);
          this.tourMuen = this.tname.options = res.Result.recruitStudent;

          this.tname.options.filter((item, i) => {
            item.type = Object.keys(this.list)[i];
          });
        }
      });
    },

    _UTCformat(start, end) {
      return UTCformat(start) + "-" + UTCformat(end).substr(5);
    },
    _goTime(start, end) {
      return goTime(start, end);
    }
  },
  watch: {
    index() {
      this.changeData();
    }
  },
  created() {
    this.getStudyTourMenu();
  },
  components: {
    Project,
    PicRightTit,
    SpanDate,
    SpanTrip
  }
};
</script>
<style lang="scss" scoped>
.study {
  margin-top: 52px;
  height: 515px;
  .study_imgs {
    margin-top: 30px;
    .items {
      display: flex;
    }
    & > div {
      display: flex;
    }

    .stu_item {
      margin-right: 30px;
      padding-bottom: 20px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        box-shadow: 0 0 10px #d0c7c7;
        transform: translateY(-5px);
      }

      &:last-child {
        margin-right: 0;
      }
      .date_time {
        margin-top: 16px;
        padding-left: 12px;
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
</style>
