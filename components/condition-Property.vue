<template>
  <div class="condition-screening">
    <div class="titspan">{{ typeName }}</div>
    <div class="itemsclass">
      <span
        :class="['itclass',{'show':i==0&&item.name=='不限'}]"
        v-for="(item,i) in type_data"
        :letter="item.letter"
        @click="checkType(i,item.id, item.name,item.letter,$event)"
        ref="span"
      >{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { bus } from "~/utils/event";
import { screen } from "~/utils/screen_data";
export default {
  mixins: [screen],
  props: {
    listData: {},
    typeName: {},
    fieldName: {},
    pushArr: {
      type: Boolean,
      default: true
    },
    buss: {
      default: "house"
    },
    country_router: "", //判断是否 有国家路由
    city_router: {}, //判断是否 有城市路由
    house_type: {}, //判断是否 有购房类型路由

    wyType: {},

    router_params: {}
  },
  data() {
    return {
      // data: [],
      type_data: this.listData
    };
  },
  created() {
    // this.changeListDataModel();
  },
  mounted() {
    console.log("router_params::::::::::", this.router_params);
    let span = this.$refs.span;
    span.forEach((val, i) => {
      if (val.classList.contains("show")) {
        val.classList.remove("show");
      }
    });
    if (this.buss == "immig/merchant") {
      span[this.wyType ? this.wyType - 1 : 0].classList.add("show");
      return;
    }
    span[this.wyType ? this.wyType : 0].classList.add("show");
  },
  methods: {
    checkType(i, id, names, letter, e) {
      let params = this.router_params;
      let path, attr;

      if (e.target.hasAttribute("letter")) {
        attr = e.target.getAttribute("letter").slice(0, 2);
      } else {
        attr = e.target.nextElementSibling.getAttribute("letter").slice(0, 2);
      }
      console.log("attr:::::::::", attr);

      var re = new RegExp(attr + "\\d?");
      // 有letter
      if (letter) {
        if (params.country && !this.country_router) {
          if (params.country.includes(attr)) {
            var wy = params.country.replace(re, "");
            if (wy.includes("page")) {
              wy = wy.replace(/page\d+/, "");
              console.log("存在opage:::", wy);
            }
            path = `/${this.buss}/${wy}${letter}`;
          } else {
            if (params.country.includes("page")) {
              var wy = params.country.replace(/page\d+/, "");
              path = `/${this.buss}/${wy}${letter}`;
            } else {
              path = `/${this.buss}/${params.country}${letter}`;
            }
          }
        }

        if (params.country && this.country_router) {
          if (params.type) {
            if (params.type.includes(attr)) {
              var wy = params.type.replace(re, "");
              if (params.type.includes("page")) {
                wy = wy.replace(/page\d+/, "");
              }
              path = `/${this.buss}/${params.country}/${wy}${letter}`;
            } else {
              path = `/${this.buss}/${params.country}/${params.type}${letter}`;
            }
          } else {
            path = `/${this.buss}/${params.country}/${letter}`;
          }
        }

        if (!params.country && !params.type) {
          path = `/${this.buss}/${letter}`;
        }
      }
      // 无letter
      else {
        console.log("不存在！！！");
        // 不存在国家路由
        if (params.country && !this.country_router) {
          if (params.country.includes(attr)) {
            var wy = params.country.replace(re, "");
            if (params.country.includes("page")) {
              wy = wy.replace(/page\d+/, "");
            }
            path = `/${this.buss}/${wy}`;
          } else {
            path = `/${this.buss}/${params.country}`;
          }
        }

        // 存在国家路由
        if (params.country && this.country_router) {
          if (params.type) {
            if (params.type.includes(attr)) {
              var wy = params.type.replace(re, "");
              if (params.type.includes("page")) {
                wy = wy.replace(/page\d+/, "");
              }
              path = `/${this.buss}/${params.country}/${wy}`;
            } else {
              path = `/${this.buss}/${params.country}/${params.type}`;
            }
          } else {
            path = `/${this.buss}/${params.country}/`;
          }
        }

        if (!params.country && !params.type) {
          path = `/${this.buss}/`;
        }
      }

      this.$router.push({ path });
    }
  }
};
</script>

<style lang="scss" scoped>
.condition-screening {
  height: 40px;
  line-height: 40px;
  font-size: 14px;

  .titspan {
    width: 90px;
    text-align: left;
    float: left;
    color: #9399a5;
  }
  .itemsclass {
    float: left;
    text-align: left;
    .itclass {
      padding-left: 10px;
      padding-right: 10px;
      float: left;
      // font-weight: bold;
      cursor: pointer;
      &.show {
        color: #ed2530;
      }
    }
  }
}
</style>