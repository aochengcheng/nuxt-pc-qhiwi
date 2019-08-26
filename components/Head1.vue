<template>
  <div class="head">
    <nuxt-link to="/">
      <h1 class="logo">
        去海外网
        <i></i>
      </h1>
    </nuxt-link>

    <div class="address" @click.stop.prevent="showCity">
      <i></i>
      <span>{{scity}}</span>
      <div class="chose_city" ref="city">
        <ul>
          <li
            v-for="(item,i)  in citys.hot"
            :key="i"
            @click="gotCity(item.id,item.city,item.letter)"
          >{{ item.city}}</li>
        </ul>
      </div>
    </div>

    <ul class="options">
      <li v-for="(item,i) in head" :key="i">
        <!-- `/${cityJX}${item.path}` -->
        <nuxt-link :to="{path:item.path}" class="nav">
          <span ref="span">{{ item.pathName }}</span>
          <i></i>
        </nuxt-link>
        <!-- <a :href="item.path">
         <span ref="span">{{ item.pathName }}</span>
          <i></i>
        </a>-->
      </li>
    </ul>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
// import { setCountryMode } from "../utils/mixins";
import { fetch } from "~/plugins/axios/http";
export default {
  async asyncData() {
    // const data = await fetch("/dhr/showCity");
    // console.log(data);
  },
  data() {
    return {
      head: [
        {
          pathName: "首页",
          path: `${this.cle ? "/" + this.cle : "/"}`
        },
        {
          pathName: "房产",
          path: `/house`
        },
        {
          pathName: "移民",
          path: `/immig`
        },
        {
          pathName: "留学",
          path: `/study`
        },
        {
          pathName: "游学",
          path: `/studytour`
        },
        {
          pathName: "海外头条",
          path: `/news`
        },
        {
          pathName: "关于我们",
          path: `/about`
        }
      ],
      citys: [],
      index: ""
    };
  },

  methods: {
    getCityCount() {
      this.$fetch("/dhr/showCity").then(res => {
        if (res.ErrCode == "0000") {
          this.citys = res.data;
          // console.log(this.citys);
        }
      });
    },
    gotCity(id, city, letter) {
      this.showCityNum(id); //改变城市站
      this.changeLetter({ letter, city });

      let cle = JSON.parse(sessionStorage.getItem("vuex")).cityNum.letter;

      this.head[0].path = `${cle ? "/" + cle : "/"}`;

      this.$router.push(`/${letter}`);
      // this.$router.push('/')
      // window.location.reload()
      // console.log("改变城市站::", this.$store.state.cityNum.showCityNum);
      // console.log("改变城市站::", city);
    },
    showCity(e) {
      let city = this.$refs.city;
      if (city.classList.contains("show")) {
        city.classList.remove("show");
        return;
      }
      city.classList.add("show");
    },
    ...mapMutations({
      showCityNum: "cityNum/pushCityNum",
      changeLetter: "cityNum/changeLetter"
    })
  },
  computed: {
    i() {
      // console.log("i===", this.$store.state.index);
      return this.$store.state.index;
    },
    scity() {
      return this.$store.state.cityNum.c;
    }
  },
  watch: {
    i(n) {
      // console.log("n++++++++++", n);
      let nav = document.querySelectorAll(".nav");
      nav.forEach(item => {
        // console.log('item',item)
        if (item.children[1].classList.contains("show")) {
          item.children[1].classList.remove("show");
        }
      });
      if (n == -1) {
        nav[0].children[1].classList.add("show");
      } else {
        nav[n].children[1].classList.add("show");
      }
    }
  },
  mounted() {
    // let cle = JSON.parse(sessionStorage.getItem("vuex")).cityNum.letter;

    // this.head[0].path = `${cle ? "/" + cle : "/"}`;

    let nav = document.querySelectorAll(".nav");
    // console.log("i::::::::::::", nav[this.i]);
    if (this.i == -1) {
      nav[0].children[1].classList.add("show");
    } else {
      nav[this.i].children[1].classList.add("show");
    }
    this.getCityCount();
    if (process.browser) {
      document.addEventListener("click", function() {
        let city = document.querySelector(".chose_city");
        if (city.classList.contains("show")) {
          city.classList.remove("show");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.head {
  height: 62px;
  width: 100%;

  .logo {
    text-indent: -999999px;
    font-size: 0;
    height: 62px;
    width: 110px;
    float: left;
    i {
      display: block;
      width: 107px;
      height: 46px;
      margin-top: 7px;
      background: url("~static/images/logo.png") no-repeat center/cover;
    }
    a {
    }
  }

  .address {
    float: left;
    width: 65px;
    height: 28px;
    border: 1px solid #e9e9e9;
    border-radius: 12px;
    margin: 17px 30px 17px 30px;
    position: relative;
    cursor: pointer;

    i {
      width: 14px;
      height: 14px;
      display: inline-block;
      background: url("~static/images/location.png") no-repeat;
      position: absolute;
      left: 7px;
      top: 6px;
    }
    span {
      font-size: 12px;
      position: absolute;
      left: 25px;
      top: 4px;
      color: #9d9ea3;
    }

    .chose_city {
      transition: max-height 0.15s ease-out;
      position: absolute;
      z-index: 99999;
      background-color: #fff;
      top: 41px;
      left: -7px;
      max-height: 0;
      overflow: hidden;
      &.show {
        max-height: 500px;
        transition: max-height 0.15s ease-in;
      }
      ul {
        li {
          font-size: 14px;
          color: #9399a5;
          padding: 16px 19px 16px 32px;
          position: relative;
          white-space: nowrap;
          border-bottom: 1px solid #9399a5;

          &:last-child {
            border: none;
          }
          &::after {
            position: absolute;
            width: 14px;
            height: 14px;
            content: "";
            background: url("~static/images/location.png") no-repeat;
            left: 13px;
            top: 19px;
          }
        }
      }
    }
  }
  .options {
    float: left;
    list-style: none;
    height: 62px;

    li {
      height: 62px;
      float: left;
      margin: 0 20px;

      a {
        display: block;
        line-height: 62px;
        color: #000;
        text-align: center;
        position: relative;
        span {
          display: inline-block;
          font-size: 18px;
        }
        .current + i {
          display: block;
        }
        i {
          position: absolute;
          bottom: 1px;
          left: 0;
          height: 4px;
          width: 100%;
          background-color: #ee2631;
          display: none;
          &.show {
            display: block;
          }
        }

        &:hover i {
          display: block;
        }
      }
    }
  }

  // .nuxt-link-active {
  //   i {
  //     display: block !important;
  //   }
  // }

  // .router-link-active > i {
  //   display: block !important;
  // }
}
</style>
