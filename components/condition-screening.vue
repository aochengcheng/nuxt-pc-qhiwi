<template>
  <div class="country_box">
    <div class="country">{{ '国家' }}</div>

    <div class="box">
      <div class="country_wrap">
        <ul>
          <li
            v-for="(item, i) in countrytype"
            :key="i"
            @click="showCity(i,item.id,item.name)"
            ref="country"
          >{{ item.name }}</li>
        </ul>
      </div>

      <div class="city_wrap">
        <ul v-for="(item, i) in countrytype" :key="i" ref="citys">
          <li
            v-for="(items, i) in item.city"
            :key="i"
            @click="screenCity(i,items.id,items.name,$event)"
            ref="allCity"
          >{{ items.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../utils/event";
export default {
  data() {
    return {
      countrytype: [],
      country_data: {},
      city_data: {}
    };
  },
  mounted() {
    this.getMenuData();
    this.emp_data()
    this.emp_data2()

    this.clear_all1()
    this.clear_all2()
  },
  methods: {
    showCity(i, id, names) {
      let citys = this.$refs.citys;
      let country = this.$refs.country;
      citys.forEach((val, i) => {
        if (val.classList.contains("show")) {
          val.classList.remove("show");
        }
        if (country[i].classList.contains("current")) {
          country[i].classList.remove("current");
        }
      });
      citys[i].classList.add("show");
      country[i].classList.add("current");

      this.country_data = {
        id,
        names,
        type: "belongCountry",
        index: i
      };
      bus.$emit("send_data", this.country_data, "belongCountry");
    },

    emp_data() {
      bus.$on("empty_data", (index, text) => {
        if (text == this.country_data["names"]) {
          let country = this.$refs.country;
          country[index].classList.remove("current");
        }
      });
    },
    emp_data2() {
      bus.$on("empty_data", (index, text) => {
        if (text == this.city_data["names"]) {
          let allCity = this.$refs.allCity;
          allCity[index].classList.remove("show");
        }
      });
    },

     removeClass(type, clas) {
     
            let span = this.$refs[type];
            span.forEach((val, i) => {
                if (val.classList.contains(clas)) {
                    val.classList.remove(clas);
                }
            });
        },
        clear_all1() {
            bus.$on("clear", data => {
              console.log(data)
                this.removeClass('country', 'current')
            });
        },
        clear_all2() {
            bus.$on("clear", data => {
                this.removeClass('allCity', 'show')
            });
        },

    screenCity(i,id, names, e) {
      let allCity = this.$refs.allCity;
      console.log(allCity);
      allCity.forEach((val, i) => {
        if (val.classList.contains("show")) {
          val.classList.remove("show");
        }
      });
      e.target.classList.add("show");

      this.city_data = {
        id,
        names,
        type: "belongCity",
        index: i
      };
      bus.$emit("send_data", this.city_data, "belongCity");
    },
    // 获取menu
    getMenuData() {
      this.$fetch("/dhr/client/house/menu").then(res => {
        if (res.ErrCode == "0000") {
          this.countrytype = res.Result.country;
          console.log(this.countrytype);
        }
      });
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
    height: 40px;
    line-height: 40px;
    ul {
      display: flex;
      li {
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
    ul {
      display: none;
      &.show {
        display: block;
      }
      li {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        &.show {
          color: #ed2530;
        }
      }
    }
  }
}
</style>
