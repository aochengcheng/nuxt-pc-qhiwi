<template>
  <div class="selection-condition">
    <span
      class="spankuan"
      v-for="(item, i) in allData"
      :typed="item.type"
      :index="item.index"
      :html="item.names"
      @click="empty"
    >{{ item.names }} X</span>
  </div>
</template>

<script>
import { bus } from "~/utils/event";
import {mapMutations}  from 'vuex'
export default {
  props: {
    selectedItem: {
      type: Array
    }
  },
  data() {
    return {
      allData: {}
    };
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      bus.$on("send_data", (data, type, removeCity , canSendMsg = false) => {
        this.$set(this.allData, type, data);
        if (removeCity) {
          this.$delete(this.allData,'belongCity')
        }
        if (removeCity) {
          this.$delete(this.allData,'hostCityNum')
        }
        if (!canSendMsg) {
          console.log(this.allData)
          this.$emit("getScreenData", this.allData);
        }
      });
    },
    empty(e) {
      let text = e.target;
      const type = text.getAttribute("typed");
      const index = text.getAttribute("index");
      const html = text.getAttribute("html");
      if (type in this.allData) {
        this.$delete(this.allData, type);
      }

      // 城市在归置默认状态
      this.showCityNum(1);

      bus.$emit("empty_data", index, html);
      this.$emit("getScreenData", this.allData);
      // 筛选数据
      //   this.page = 1;
      //   this.allListData = [];
      //   this.getAllList(this.result_data);
    },
    ...mapMutations({
      showCityNum: "CITY_NUMBER"
    })
  },
  watch: {
    allData(val) {
      if (Object.keys(val).length == 0) {
        console.log("值为空");
        bus.$emit("clear", 11);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.selection-condition {
  // height: 50px;
  // line-height: 50px;
  color: #666;
  margin-left: 2px;
  margin-right: 2px;
  float: left;
  span {
    margin-top: 15px;
    padding: 0 20px;
    display: block;
    float: left;
    height: 20px;
    line-height: 20px;
    // width: 60px;
    text-align: center;
    cursor: pointer;
  }
  .spankuan {
    border: 1px solid #ED2530;
    color: #ED2530;
    margin-right: 10px;
    border-radius: 4px;
  }
}
</style>