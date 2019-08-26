<template>
  <div class="country_box">
    <div class="country">{{ title }}</div>

    <div class="box">
      <div class="country_wrap">
        <ul>
          <li
            :class="{current:i ==  0}"
            v-for="(item, i) in countryMenu"
            :key="i"
            @click="screenCountry(i,item.id,item.name,item.letter)"
            ref="country"
          >{{ item.name }}</li>
        </ul>
      </div>

      <div class="city_wrap">
        <ul v-for="(item, is) in c_city" :key="is" ref="citys">
          <li
            v-for="(items, i) in item.city"
            :letter="items.letter"
            :class="{show: i==0}"
            :key="i"
            @click="screenCity(i,items.id,items.name,$event,items.letter)"
            ref="allCity"
          >{{ items.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "~/utils/event";
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    buss:{
      default:'house'
    },
    title: {},
    countryMenu: {},
    listData: {},

    setCountrymod: {},
    setCitymod: {},

    // 国家类型
    typeOf: {},
    country_router: "",
    id: {},
    cid: {},

    exitType: {}, // 判断是否存在房产类型筛选
    wyExitType: {}, //判断是否存在物业类型

    params: {} // 所有的路由信息
  },
  data() {
    return {
      countrytype: [],
      country_data: {},
      city_data: {},

      //改造城市
      c_city: this.countryMenu,
      s_country: "",
      s_city: ""
    };
  },
  created() {
    this.changeCityModel();
  },
  mounted() {
    console.log("this.id:::::::::", this.id);
    let country = this.$refs.country;
    let citys = this.$refs.citys;
    let allCity = this.$refs.allCity;

    country.forEach((val, i) => {
      if (val.classList.contains("current")) {
        val.classList.remove("current");
      }
      if (citys[i].classList.contains("show")) {
        citys[i].classList.remove("show");
      }
    });
    allCity.forEach((val, i) => {
      if (val.classList.contains("show")) {
        val.classList.remove("show");
      }
    });

    let i = this.id ? this.id : 0;
    country[i].classList.add("current");
    citys[i].classList.add("show");

    // console.log("citys.children:::::", citys[i].children);
    if (i > 0) {
      citys[i].children[this.cid ? this.cid : 0].classList.add("show");
    }

    if (i == 0) {
      citys[i].classList.remove("show");
    }

    // this.emp_data();
    // this.emp_data2();

    // this.clear_all1();
    // this.clear_all2();
  },

  computed: {
    country() {
      return this.$refs.country;
    }
  },
  methods: {
    /**
     *
     *  改造1
     *
     * */
    changeCityModel() {
      this.c_city.map(item => {
        if (item.city && item.letter) {
          item.city.map((city, i) => {
            if (i == 0) {
              return;
            }
            city.letter = item.letter.slice(0, 2) + i;
          });
        }
      });
      // console.log("改变后 的数据::::::", this.c_city);
    },

    // 选择固定国家
    setFiexdCountry(n) {
      let c = this.$refs.country;
      let citys = this.$refs.citys;
      let allCity = this.$refs.allCity;
      if (this.typeOf == n) {
        c[n].classList.add("current");
        citys[n].classList.add("show");
        citys[n].firstChild.classList.add("show");

        // bus.$emit("send_data", this.country_data, "hostCountryNum", true);
      }
    },

    screenCountry(i, id, names, letter) {
      console.log('letter:::::::::',letter);
      let citys = this.$refs.citys;
      let country = this.$refs.country;
      let allCity = this.$refs.allCity;

      let params = this.params;
      if (letter) {
        if (params.country && !this.country_router) {
          var c;
          if (params.country.includes("page")) {
            c = params.country.replace(/page\d+/, "");
          } else {
            c = params.country;
          }
          // console.log('c::::::::',params.country)
          this.$router.push({ path: `/${this.buss}/${letter}/${c}` });
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
            path: `/${this.buss}/${letter}/${c}`
          });
        }

        if (!params.country && !params.type) {
          this.$router.push({ path: `/${this.buss}/${letter}` });
        }
      } else {
        console.log("params.country+++++=============", params.country);
        if (params.country && !this.country_router) {
          var c;
          if (params.country.includes("page")) {
            c = params.country.replace(/page\d+/, "");
          } else {
            c = params.country;
          }
          this.$router.push({ path: `/${this.buss}/${c}` });
        } else if (params.type) {
          var c;
          if (params.type.includes("page")) {
            c = params.type.replace(/page\d+/, "");
          } else {
            c = params.type;
          }
          this.$router.push({ path: `/${this.buss}/${c}` });
        } else if (params.country && this.country_router) {
          this.$router.push({ path: `/${this.buss}` });
        } else {
          this.$router.push({ path: `/${this.buss}` });
        }
      }
    },

    screenCity(i, id, names, e, letter) {
      console.log("letter:::::::", letter);
      let params = this.params;

      if (e.target.hasAttribute("letter")) {
        var attr = e.target.getAttribute("letter").slice(0, 2);
      }
      let re = new RegExp("-" + attr + "\\d+");

      if (letter) {
        console.log("re:::::::::::", re);
        let city;
        if (params.country.includes(attr)) {
          city = params.country.replace(re, "");
        }

        // if (params.country.includes("page")) {
        //   city = city.replace(/page\d+/, "");
        // }
        if (params.country && !params.type) {
          this.$router.push({ path: `/${this.buss}/${city}-${letter}` });
        }
        if (params.country && params.type) {
          var c;
          if (params.type.includes("page")) {
            c = params.type.replace(/page\d+/, "");
          } else {
            c = params.type;
          }
          this.$router.push({
            path: `/${this.buss}/${city}-${letter}/${c}`
          });
        }
      } else {
        // let city2;
        console.log("params.country=======", params.country);

        if (params.country && !params.type) {
          if (params.country.includes("-")) {
            let country = params.country.split("-")[0];
            this.$router.push({ path: `/${this.buss}/${country}` });
          }
        }
        if (params.country && params.type) {
          var c;
          if (params.type.includes("page")) {
            c = params.type.replace(/page\d+/, "");
          } else {
            c = params.type;
          }
          if (params.country.includes("-")) {
            let country = params.country.split("-")[0];
            this.$router.push({
              path: `/${this.buss}/${country}/${c}`
            });
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.country_box {
  // height: 40px;
  line-height: 40px;
  font-size: 14px;
  .country {
    width: 90px;
    text-align: left;
    float: left;
    color: #9399a5;
  }
  .box {
    display: flex;
    flex-direction: column;

  }
  .country_wrap {
    float: left;
    // height: 40px;
    line-height: 40px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        // font-weight: bold;
        padding: 0 10px;
        cursor: pointer;
        &.current {
          color: #ed2530;
        }
      }
    }
  }
  .city_wrap {
    background-color: #fff;
    white-space: nowrap;
    display: inline-block;

    ul {
      display: none;
      white-space: nowrap;
      box-shadow: 0px 0px 10px #f5eaea;
      height: 0;
      overflow: hidden;
      transition: all 0.3s;
      &.show {
        display: inline-block;
        height: auto;
      }
      li {
        display: inline-block;
        padding: 0 10px;
        // font-weight: 600;
        font-size: 12px;
        cursor: pointer;

        &.show {
          color: #ed2530;
        }
      }
    }
  }
}
</style>
