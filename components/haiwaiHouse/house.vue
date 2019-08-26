<template>
  <div class="house">
    <div class="project">
      <Project :tname="tname"></Project>
    </div>

    <div class="house_list">
      <div class="items">
        <Picbox v-for="(item, idx) in list[kind]" :house_data="item" :key="idx">
          <Price slot="house_price" :price="item.price" :fontSize="22"></Price>
        </Picbox>
      </div>
    </div>
  </div>
</template>
<script>
import Project from "../Project-title-left";
import Picbox from "../Picbox";
import Price from "../Price";
import { getHomeData, setCountryMode } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
export default {
  // mixins: [getHomeData],
  data() {
    return {
      tname: {
        big: "海外好房",
        small: "永久产权，可贷款",
        moreURL: "/house",
        options: []
      },
      index: "",
      list: {
        all: [],
        england: [],
        canada: [],
        australia: [],
        thailand: []
      },
      kind: "all",

      url: "/dhr/client/house/list",
      limit: 8,
      paramsType: "belongCountry",
      house_menu: [],

      cacheName: "house",
      pageName: "不限"
    };
  },
  computed: {
    house_list_data() {
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
      belongCountry: this.index,
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
  methods: {
    async changeData() {
      if (this.list[this.kind].length > 0) return;

      const {
        ErrCode,
        Result: { data }
      } = await fetch(this.url, {
        belongCountry: this.index,
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
    // 获取房产国家
    getMenuData() {
      this.$fetch("/dhr/client/house/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.house_menu = res.Result.country;
          this.tname.options = this.house_menu.slice(0, 5);

          this.tname.options.filter(item => {
            item.type = item.letter;
            if (item.letter == "" || item.letter == undefined) {
              item.type = "all";
            }
            // this.list[item.type] = [];
          });

          // console.log("options:::::", this.tname.options);
        }
      });
    },

    init() {
      this.getMenuData();
    }
  },
  created() {
    this.tname.moreURL = `/house`;
    this.init();
  },
  watch: {
    index() {
      this.changeData();
    }
  },
  components: {
    Project,
    Picbox,
    Price
  }
};
</script>
<style lang="scss" scoped>
.house {
  margin-top: 52px;
}

.house_list {
  margin-top: 30px;
  height: 600px;
  .items {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    // height: 600px;
  }
  [none] {
    // display: none;
    flex-wrap: wrap;
    // justify-content: space-between;
    &.block {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
    }
  }
}
</style>
