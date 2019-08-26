<template>
  <div class="condition-screening clearFix">
    <div class="titspan">{{ typeName }}</div>
    <div class="itemsclass clearFix">
      <span
        :class="['itclass',{'show':i==0&&item.name=='不限'}]"
        v-for="(item,i) in listData"
        :key="i"
        :letter="item.letter"
        @click="checkType(i,item.id, item.name,item.letter,$event)"
        ref="span"
      >{{ item.name }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    typeName: {},
    listData: {},
    country_router: "", //判断是否 有国家路由
    router_params: {},
    id: 0,
    router:{
      default:'immig'
    }
  },
  mounted() {
    console.log('router_params::::::',this.router_params)
    let span = this.$refs.span;
    if (this.id) {
      span[0].classList.remove("show");
    }
    span[this.id].classList.add("show");
  },
  methods: {
    checkType(i, id, names, letter, e) {
      let params = this.router_params;

      if (letter) {
        if (params.country && !this.country_router) {
          var c;
          if (params.country.includes("page")) {
            c = params.country.replace(/page\d+/, "");
          } else {
            c = params.country;
          }
          this.$router.push({ path: `/${this.router}/${letter}/${c}` });
        }

        if (params.country && this.country_router) {
          console.log("有国家路由");
          var c;
          if (params.type && params.type.includes("page")) {
            c = params.type.replace(/page\d+/, "");
          } else {
            c = params.type ? params.type : "";
          }
          this.$router.push({
            path: `/${this.router}/${letter}/${c}`
          });
        }

        if (!params.country && !params.type) {
          this.$router.push({ path: `/${this.router}/${letter}` });
        }
      } else {
        if (params.country && !this.country_router) {
          var c;
          if (params.country.includes("page")) {
            c = params.country.replace(/page\d+/, "");
          } else {
            c = params.country;
          }
          // console.log('c::::::::',params.country)
          this.$router.push({ path: `/${this.router}/${c}` });
        }

        if (params.country && this.country_router) {
          console.log("有国家路由");
          var c;
          if (params.type && params.type.includes("page")) {
            c = params.type.replace(/page\d+/, "");
          } else {
            c = params.type ? params.type : "";
          }
          this.$router.push({
            path: `/${this.router}/${c}`
          });
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.condition-screening {
//   height: 40px;
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
    max-width:1110px;
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