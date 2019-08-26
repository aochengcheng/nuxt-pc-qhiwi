<template>
  <div class="immig">
    <div class="project">
      <Project :tname="tname"></Project>
    </div>

    <div class="immig_pic" ref="items">
      <!-- <img src="http://120.78.158.34/qhw/2019.6.20/1561003990272-3488.jpg" > -->
      <div>
        <div class="immig_item" v-for="(item,index) in cur" :key="index">
          <nuxt-link :to="{path:'/immig/detail',query:{id:item.id}}">
            <div class="immigr_pic" v-lazy:background-image="item.imgs">
              <div class="immig_mask">
                <div class="b">
                  <div class="immig_tit text_one">
                    <h3 class="text_one">{{ item.name }}</h3>
                  </div>
                  <div class="immig_content text_one">
                    <p class="text_one">{{ item.subtitle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Project from "../Project-title-left";
import PictrueFloat from "../Picture-float-title";
import { getHomeData, setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  // mixins: [getHomeData, setCountryMode],
  data() {
    return {
      tname: {
        big: "海外移民",
        small: "98%移民成功率，大量成功案例",
        moreURL: `/immig`,
        options: [{ id: 1, name: "技术移民" }, { id: 2, name: "投资移民" }]
      },
      kind: "all",
      list: {
        all: [],
        jishu: [],
        touzi: [],
        jiashu: [],
        liuxue: []
      },
      index: "",

      immig_country: [],

      url: "/dhr/client/migrate/list",
      limit: 6,
      paramsType: "immigrationType",
      pageName: "不限",
      cacheName: "yimin"
    };
  },
  computed: {
    cur() {
      return this.list[this.kind];
    },
    cityNum() {
      return this.$store.state.cityNum.showCityNum;
    }
  },
  async mounted() {
    let {
      ErrCode,
      Result: { data }
    } = await fetch(this.url, {
      immigrationType: this.index,
      checkState: 1,
      by: "index_1",
      page: 1,
      limit: 6,
      showCityNum: this.cityNum
    });
    if (ErrCode == "0000") {
      this.list[this.kind] = data;
    }
    // console.log("data:::::::", this.list[this.kind]);
    // console.log("data:::::::", this.cur);
  },

  methods: {
    async changeData() {
      if (this.list[this.kind].length > 0) return;

      const {
        ErrCode,
        Result: { data }
      } = await fetch(this.url, {
        immigrationType: this.index,
        page: 1,
        limit: 6,
        by: "index_1",
        checkState: 1,
        showCityNum: this.cityNum
      });

      if (ErrCode == "0000") {
        this.list[this.kind] = data;
      }
    },

    getImmigMenu() {
      fetch("/dhr/client/migrate/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.immig_country = res.Result.immigrationid;
          // console.log("immig_country::::::::", res.Result.immigrationid);

          this.tname.options = this.immig_country;
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
    this.getImmigMenu()
  },
  components: {
    Project,
    PictrueFloat
  }
};
</script>
<style lang="scss" scoped>
.immig {
  margin-top: 52px;

  .immig_pic {
    margin-top: 30px;

    & > div {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .immig_item {
      cursor: pointer;
      height: 220px;
      width: 380px;
      position: relative;
      margin-right: 30px;

      &:nth-child(-n + 3) {
        margin-bottom: 30px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: all 0.3s;
        // background-color: rgba(0, 0, 0, 0.3);
      }

      &:hover {
        &::after {
          opacity: 1;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }

      .immigr_pic {
        background-size: cover;
        width: 100%;
        height: 100%;
        margin-right: 30px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        .immig_mask {
          position: absolute;
          width: 100%;
          z-index: 11;
          height: 100%;
          top: 0;
          left: 0;
          text-align: center;
          opacity: 1;
          transition: all 0.3s;
          display: flex;
          justify-content: center;
          align-items: center;
          // background-color: rgba(0, 0, 0, 0.3);
          .b {
            color: #fff;
            display: block;
            width: 80%;
          }
          h3 {
            font-size: 30px;
            font-weight: 700;
            padding-bottom: 10px;
            position: relative;

            &::after {
              position: absolute;
              content: "";
              width: 80px;
              height: 2px;
              background-color: #fff;
              bottom: 0;
              left: 50%;
              margin-left: -40px;
            }
          }

          .immig_tit {
          }
        }

        .immig_content {
          margin: 15px auto;
          max-width: 200px;
          font-size: 14px;
        }
      }
    }
  }
  [none] {
    display: none;
    &.block {
      display: flex;
    }
  }
}
</style>
