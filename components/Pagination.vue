<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    :current-page="parseInt(currentPage)"
    @current-change="c_page"
  ></el-pagination>
</template>
<script>
export default {
  props: {
    total: 0,
    currentPage: {
      type: String
    },
    pageSize: {
      default: 6
    },
    country_router: "", //判断是否 有国家路由
    router_params: {},
    buss:{
      default:'house'
    }
  },
  mounted(){
    console.log('this.currentPage::',this.currentPage)
  },
  data() {
    return {
     
    };
  },
  methods: {
    c_page(cpage) {
      console.log(cpage);
      let params = this.router_params;
      if (params.country && !this.country_router) {
        if (params.country.includes("page")) {
          var c = params.country.replace(/page\d+/, "");
          this.$router.push({
            path: `/${this.buss}/${c}${"page" + cpage}`
          });
        } else {
          this.$router.push({
            path: `/${this.buss}/${params.country}${"page" + cpage}`
          });
        }
      }

      if (params.country && this.country_router) {
        if (params.type) {
          if (params.type.includes("page")) {
            var wy = params.type.replace(/page\d+/, "");
            this.$router.push({
              path: `/${this.buss}/${params.country}/${wy}${"page" + cpage}`
            });
          } else {
            this.$router.push({
              path: `/${this.buss}/${params.country}/${params.type}${"page" + cpage}`
            });
          }
        } else {
          this.$router.push({
            path: `/${this.buss}/${params.country}/${"page" + cpage}`
          });
        }
      }
      if (!params.country && !params.type) {
        this.$router.push({ path: `/${this.buss}/${"page" + cpage}` });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
