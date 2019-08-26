<template>
  <div class="condition-screening clearFix">
    <div class="titspan">{{ typeName }}</div>
    <div class="itemsclass">
      <span
        v-for="(item,i) in listData"
        :class="['itclass',{'show':i==0&&item.name=='不限'}]"
        :letter="item.letter"
        @click="checkLi(i,item.id,item.name,item.letter)"
        ref="span"
        :key="i"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { bus } from "~/utils/event";
import { screen } from "~/utils/screen_data";
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [screen, setCountryMode],
  props: {
    listData: {
      type: Array
    },
    typeName: {},
    fieldName: {},
    pushArr: {
      type: Boolean,
      default: true
    },
    canReload: {
      default: true
    },

    // 是否存在国家路由
    country_router: "",
    //是否存在城市路由
    city_router: {},
    //是否存在物业类型
    wyExitType: {},

    h_type: {},

    router_params: {}
  },
  data() {
    return {
      data: [],
      house_data: {},
      // 改造数据
      c_listData: this.listData
    };
  },
  created() {
    //  console.log(this.listData);
    this.changeListDataModel();
  },
  mounted() {
    console.log("city_router:!!!!!!!!!!!!!!!++", this.city_router);
    let span = this.$refs.span;
    span.forEach((val, i) => {
      if (val.classList.contains("show")) {
        val.classList.remove("show");
      }
    });
    span[this.h_type].classList.add("show");
  },
  methods: {
    /**
     *
     * 改造数据
     *
     */
    changeListDataModel() {
      this.c_listData.map((item, i) => {
        if (item.id) {
          item.letter = "ty" + i;
        }
      });
      console.log("this.c_listData:::::", this.c_listData);
    },
    checkLi(i, id, names, letter) {
      console.log("letter:::", letter);

      let params = this.router_params;

      let path;
      if (letter) {
        if (params.country && !this.country_router) {
          if (params.country.includes("ty")) {
            var ty = params.country.replace(/ty\d?/, "");
            if(params.country.includes("page")){
              ty=ty.replace(/page\d+/,'')
            }
            console.log("ty:::::::", ty);

            path = `/house/${ty}${letter}`;

          }  else {
            path = `/house/${letter}${params.country}`;
          }
        }

        if (params.country && this.country_router) {
          console.log("params.country:==============:", params.country);

          if (params.type && params.type.includes("ty")) {
            var ty = params.type.replace(/ty\d+/, "");
            if (params.type.includes("page")) {
              ty = ty.replace(/page\d?/, "");
            }
            this.$router.push({
              path: `/house/${params.country}/${letter}${ty ? ty : ""}`
            });
          } else if (params.type && params.type.includes("page")) {
            var ty = params.type.replace(/page\d+/, "");
            this.$router.push({
              path: `/house/${params.country}/${letter}${ty ? ty : ""}`
            });
          } else {
            this.$router.push({
              path: `/house/${params.country}/${letter}${
                params.type ? params.type : ""
              }`
            });
          }
          //  path = `/house/${params.country}/${letter}${ty?ty:''}`;
        }

        if (!params.country && !params.type) {
          path = `/house/${letter}`;
        }

        this.$router.push({ path });
      } else {
        if (params.country && !this.country_router) {
          if (params.country.includes("ty")) {
            var ty = params.country.replace(/ty\d+/, "");
            if (params.country.includes("page")) {
              ty = ty.replace(/page\d+/, "");
            }
            console.log("ty:::::::", ty);
            path = `/house/${ty}`;
          }
        }

        if (params.country && this.country_router) {
          console.log("params.country:==============:", params.country);

          if (params.type.includes("ty")) {
            let type = params.type.replace(/ty\d+/, "");
            if (type.includes("page")) {
              type = type.replace(/page\d+/,'')
            }
            path = `/house/${params.country}/${type}`;
          }
        }

        if (!params.country && !params.type) {
          path = `/house/`;
        }

        this.$router.push({ path });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.condition-screening {
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
    max-width: 1110px;
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