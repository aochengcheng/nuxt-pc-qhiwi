<template>
  <div class="sort">
    <ul>
      <li class="current" ref="self" @click="self_sort">
        <p class="txt">默认排序</p>
      </li>
      <li v-for="(item, i) in sTitle" :idx="i" @click="selectData(i, $event)" ref="li">
        <p class="txt">{{ item }}</p>
        <p class="so" ref="so">
          <span class="top"></span>
          <span class="bottom"></span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    sTitle: {
      type: Array,
      requred: true,
      default() {
        return ["总价", "首付比例"];
      }
    },
    params: {},
    by: {},
    router_params: {},
    country_router: "",

    // 自定义sort
    sort: {
      default: "or"
    },
    root:{
      default:'house'
    }
  },

  mounted() {
    this.add(0, "or1", ".top");
    this.add(0, "or2", ".bottom");
    this.add(1, "or3", ".top");
    this.add(1, "or4", ".bottom");
    // let params = this.router_params;
    // let allLi = this.$refs.li;
    //   let self = this.$refs.self;
    //   let params = this.router_params;
    //   let allLi = this.$refs.li;
    //   let self = this.$refs.self;
    // if (
    //   params.country &&
    //   !this.country_router &&
    //   params.country.includes("or1")
    // ) {
    //   allLi[0].querySelector(".top").classList.add("active");
    //   self.classList.remove("current");
    //   allLi[0].classList.add("current");
    // }
    // if (params.type && params.type.includes('or1')) {
    //   console.log('  allLi[0]::::::',  allLi[0])
    //    allLi[0].querySelector('.top').classList.add("active");
    //    self.classList.remove("current");
    //    allLi[0].classList.add("current");
    // }
  },
  methods: {
    add(n, or, el) {
      let params = this.router_params;
      let allLi = this.$refs.li;
      let self = this.$refs.self;

      // console.log('params::', params.country.match(/or\d+/))
      // if (params.country&&!params.country.match(/or\d+/)) {
      //   return;
      // }
      // if (params.type&&!params.type.match(/or\d+/)) {
      //   return;
      // }
      if (
        params.country &&
        !this.country_router &&
        params.country.includes(or)
      ) {
        allLi[n].querySelector(el).classList.add("active");
        allLi[n].classList.add("current");
        self.classList.remove("current");
      }
      if (
        params.country &&
        this.country_router &&
        params.type &&
        params.type.includes(or)
      ) {
        allLi[n].querySelector(el).classList.add("active");
        allLi[n].classList.add("current");
        self.classList.remove("current");
      }
    },
    self_sort() {
      let params = this.router_params;

      console.log("params.type:::::::", params);
      let or = new RegExp(this.sort + "\\d+");
      if (params.country && !this.country_router) {
        var wy = params.country.replace(or, "");
        this.$router.push({ path: `/${this.root}/${wy}` });
      }
      if (params.country && this.country_router) {
        var wy = params.type.replace(or, "");
        this.$router.push({ path: `/${this.root}/${params.country}/${wy}` });
      }

      if (!params.country && !params.type) {
  
        this.$router.push({ path: `/${this.root}/` });
      }
    },

    selectData(i, e) {
      console.log(i);
      let path;
      let params = this.router_params;
      let or = new RegExp(this.sort + "\\d+");
      if (i == 0) {
        if (params.country && !this.country_router) {
          if (params.country.includes(this.sort)) {
            var wy = params.country.replace(or, "");
          }
          if (params.country.includes(this.sort+"1")) {
            this.$router.push({ path: `/${this.root}/${wy}${this.sort}2` });
          } else if (params.country.includes(this.sort+"2")) {
            this.$router.push({ path: `/${this.root}/${wy}${this.sort}1` });
          } else {
            console.log("wy:::::::::", wy);
            if (params.country.includes(this.sort)) {
              let wy = params.country.replace(or, "");
              this.$router.push({ path: `/${this.root}/${wy}${this.sort}1` });
            } else {
              this.$router.push({ path: `/${this.root}/${params.country}${this.sort}1` });
            }
          }
        }

        if (params.country && this.country_router) {
          console.log("存在国家路由");
          if (params.type && params.type.includes(this.sort)) {
            var wy = params.type.replace(or, "");
        
          } else {
            var wy = params.type;
          }
          if (params.type && params.type.includes(this.sort+"1")) {
            this.$router.push({
              path: `/${this.root}/${params.country}/${wy ? wy : ""}${this.sort}2`
            });
          } else if (params.type && params.type.includes(this.sort+"2")) {
            this.$router.push({
              path: `/${this.root}/${params.country}/${wy ? wy : ""}${this.sort}1`
            });
          } else {
            this.$router.push({
              path: `/${this.root}/${params.country}/${wy ? wy : ""}${this.sort}1`
            });
          }
        }

        if (!params.country && !params.type) {
          this.$router.push({ path: `/${this.root}/${this.sort}1` });
        }
      }

      if (i == 1) {
        if (params.country && !this.country_router) {
          if (params.country.includes(this.sort)) {
            var wy = params.country.replace(or, "");
          }
          if (params.country.includes(this.sort+"3")) {
            this.$router.push({ path: `/${this.root}/${wy}${this.sort}4` });
          } else if (params.country.includes("or4")) {
            this.$router.push({ path: `/${this.root}/${wy}${this.sort}3` });
          } else {
            this.$router.push({ path: `/${this.root}/${wy}${this.sort}3` });
          }
        }

        if (params.country && this.country_router) {
          if (params.type && params.type.includes(this.sort)) {
            var wy = params.type.replace(or, "");
          } else {
            var wy = params.type;
          }
          if (params.type && params.type.includes(this.sort+"3")) {
            this.$router.push({
              path: `/${this.root}/${params.country}/${wy ? wy : ""}${this.sort}4`
            });
          } else if (params.type && params.type.includes(this.sort+"4")) {
            this.$router.push({
              path: `/${this.root}/${params.country}/${wy ? wy : ""}${this.sort}3`
            });
          } else {
            this.$router.push({
              path: `/${this.root}/${params.country}/${wy ? wy : ""}${this.sort}3`
            });
          }
        }
        if (!params.country && !params.type) {
          this.$router.push({ path: `/${this.root}/${this.sort}3` });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sort {
  ul {
    display: flex;
    li {
      margin-right: 30px;
      display: flex;
      align-items: center;
      color: #9399a5;
      font-size: 16px;
      &:last-child() {
        margin-right: 0;
      }

      .txt {
        margin-right: 6px;
        cursor: pointer;
      }

      &.current {
        .txt {
          color: #ed2530;
        }
      }

      .so {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 9px;
        height: 14px;

        span {
          width: 9px;
          height: 6px;
          cursor: pointer;
        }
        .top {
          background: url("~static/images/haiwaiHouse/triangle-s-b.png")
            no-repeat center/cover;
          margin-bottom: 2px;

          &.active {
            background: url("~static/images/haiwaiHouse/triangle-s-r.png")
              no-repeat center/cover;
          }
        }
        .bottom {
          background: url("~static/images/haiwaiHouse/triangle-x-b.png")
            no-repeat center/cover;
          &.active {
            background: url("~static/images/haiwaiHouse/triangle-x-r.png")
              no-repeat center/cover;
          }
        }
      }
    }
  }
}
</style>