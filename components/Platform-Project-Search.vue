<template>
  <div class="search clearFix" @mouseleave="moverOut">
    <ul class="classify f_left">
      <li
        v-for="(item, key) in side_bar"
        :key="key"
        @mouseenter="moveIn(key)"
        ref="leftMenu"
      >
        {{ item }}
        <span v-if="key>3">Soon</span>
      </li>
    </ul>

    <!-- 房产 -->
    <div class="details_box f_right">
      <div class="over_hidden">
        <ul class="details" ref="ul">
          <li ref="li">
            <div class="topBar">
              <span
                class="xf"
                v-for="(item, i) in top_bar"
                @click="moveBar(i)"
                :key="i"
                ref="newHouse"
              >
                {{ item }}
                <i v-if="i==1">敬请期待</i>
              </span>

              <span class="mark" ref="footBar"></span>
            </div>

            <div class="form">
              <input
                type="text"
                class="inp"
                placeholder="请输入项 目名称"
                v-model="house_search"
                @keydown="enterSend('house',$event)"
              />

              <button class="searchBtn" @click="houstSearch">搜索</button>
            </div>

            <div class="content">
              <div class="region r1">
                <h3>热门地区</h3>
                <nuxt-link :to="h.url" v-for="(h,hoti) in hot" :key="hoti">{{h.country}}</nuxt-link>
              </div>

              <div class="region r2">
                <h3>购房目的</h3>
                <a :href="type.url" v-for="(type, typei)  in type" :key="typei">{{type.type}}</a>
              </div>

              <div class="region r3">
                <h3>购房预算</h3>
                <a :href="ys.url" v-for="(ys,ysi)  in yuxuan" :key="ysi">{{ ys.money }}</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 移民 -->
    <div class="details_box yimin f_right some">
      <div class="over_hidden clearFix">
        <div class="oz f_left itm">
          <ul>
            <h3>欧洲</h3>
            <li v-for="(item,i)  in ouzhou">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="yz f_left itm">
          <ul>
            <h3>亚洲</h3>
            <li v-for="(item,i)  in yazhou" :key="i">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="mz f_left itm">
          <ul>
            <h3>美洲</h3>
            <li v-for="(item,i)  in meizhou" :key="i">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="dyz f_left itm">
          <ul>
            <h3>大洋洲</h3>
            <li v-for="(item,i)  in dayangzhou" :key="i">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>

          <ul>
            <h3>非洲</h3>
            <li v-for="(item,i)  in  feizhou" :key="i">
              <nuxt-link :to="item.url">{{item.country}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 留学 -->
    <div class="details_box liuxue f_right">
      <div class="over_hidden">
        <ul class="details" ref="ul">
          <li ref="li">
            <div class="form">
              <input type="text" class="inp" placeholder="请输入项目名称" v-model="study_search" @keydown="enterSend('study',$event)"/>

              <button class="searchBtn" @click="studySearch">搜索</button>
            </div>

            <div class="content">
              <div class="region r1">
                <h3>意向国家</h3>
                <nuxt-link :to="item.url" v-for="(item,i) in yxgj" :key="i">{{ item.country }}</nuxt-link>
              </div>

              <div class="region r2">
                <h3>热门学校</h3>
                <nuxt-link :to="item.url" v-for="(item,i) in rmxx" :key="i">{{item.country}}</nuxt-link>
              </div>

              <div class="region r3">
                <h3>目标学位</h3>
                <nuxt-link :to="item.url" v-for="(item,i) in mbxw" :key="i">{{item.country}}</nuxt-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 游学 -->
    <div class="details_box youxue f_right some">
      <div class="over_hidden clearFix">
        <div class="dx f_left itm">
          <ul>
            <h3>招生对象</h3>
            <li v-for="(item,i)  in duixiang" :key="i">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="zt f_left itm">
          <ul>
            <h3>热门主题</h3>
            <li v-for="(item,i)  in zhuti" :key="i">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="gj f_left itm">
          <ul>
            <h3>游学国家</h3>
            <li v-for="(item,i)  in guojia" :key="i">
              <nuxt-link :to="item.url">{{ item.country }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { setCountryMode } from "../utils/mixins";
export default {
  // mixins: [setCountryMode],
  data() {
    return {
      num: 0,
      side_bar: ["房产", "移民", "留学", "游学", "医疗", "婚礼", "海外创投"],
      top_bar: ["新房/二手房"],

      // 房产
      hot: [],
      type: [],
      yuxuan: [],

      // 移民
      ouzhou: [],
      yazhou: [],
      meizhou: [],
      dayangzhou: [],
      feizhou: [],

      i: "",

      // 留学
      yxgj: [],
      rmxx: [],
      mbxw: [],

      // 游学
      duixiang: [],
      zhuti: [],
      guojia: [],

      // 房产搜搜
      house_search: "",
      study_search: ""
    };
  },
  created() {
    /**
     * 房产
     */
    this.hot = [
      {
        country: "英国",
        url: `/house/england`
      },
      {
        country: "加拿大",
        url: `/house/canada`
      },
      {
        country: "澳大利亚",
        url: `/house/australia`
      },
      {
        country: "泰国",
        url: `/house/thailand`
      },
      {
        country: "美国",
        url: `/house/america`
      },
      {
        country: "日本",
        url: `/house/japan`
      },
      {
        country: "越南",
        url: `/house/vietnam`
      },
      {
        country: "菲律宾",
        url: `/house/thephilippines`
      },
      {
        country: "马来西亚",
        url: `/house/malaysia`
      }
    ];
    this.type = [
      {
        type: "投资",
        url: `/house/ty1`
      },
      {
        type: "教育留学",
        url: `/house/ty2`
      },
      {
        type: "自住",
        url: `/house/ty3`
      },
      {
        type: "度假养老",
        url: `/house/ty4`
      }
    ];
    this.yuxuan = [
      {
        money: "50万以下",
        url: `/house/zj1`
      },
      {
        money: "200-300万",
        url: `/house/zj2`
      },
      {
        money: "300-500万",
        url: `/house/zj3`
      },
      {
        money: "500-700万",
        url: `/house/zj4`
      }
    ];

    // 移民
    this.ouzhou = [
      {
        country: "希腊",
        url: `/immig/greece`
      },
      {
        country: "英国",
        url: `/immig/england`
      },
      {
        country: "西班牙",
        url: `/immig/spain`
      },
      {
        country: "葡萄牙",
        url: `/immig/portugal`
      },
      {
        country: "马耳他",
        url: `/immig/malta`
      },
      {
        country: "爱尔兰",
        url: `/immig/ireland`
      },
      {
        country: "塞浦路斯",
        url: `/immig/cyprus`
      },
      {
        country: "摩尔多瓦",
        url: `/immig/moldova`
      }
    ];

    this.yazhou = [
      {
        country: "泰国",
        url: `/immig/thailand`
      },
      {
        country: "新加坡",
        url: `/immig/singapore`
      },
      {
        country: "菲律宾",
        url: `/immig/thephilippines`
      },
      {
        country: "马来西亚",
        url: `/immig/malaysia`
      },
      {
        country: "中国香港",
        url: `/immig/hk`
      }
    ];
    this.meizhou = [
      {
        country: "美国",
        url: `/immig/america`
      },
      {
        country: "加拿大",
        url: `/immig/canada`
      },
      {
        country: "圣基茨",
        url: `/immig/saintkitts`
      },
      {
        country: "安提瓜",
        url: `/immig/antigua`
      },
      {
        country: "圣卢西亚",
        url: `/immig/saintlucia`
      },
      {
        country: "格林纳达",
        url: `/immig/grenada`
      },
      {
        country: "多米尼克",
        url: `/immig/dominica`
      }
    ];
    this.dayangzhou = [
      {
        country: "澳大利亚",
        url: `/immig/australia`
      },
      {
        country: "新西兰",
        url: `/immig/newzealand`
      },
      {
        country: "瓦努阿图",
        url: `/immig/vanuatu`
      }
    ];
    this.feizhou = [
      {
        country: "几内亚比绍",
        url: `/immig/guinea-bissau`
      }
    ];
    // 留学
    this.yxgj = [
      {
        country: "英国",
        url: `/study/england`
      },
      {
        country: "加拿大",
        url: `/study/canada`
      },
      {
        country: "澳大利亚",
        url: `/study/australia`
      },
      {
        country: "美国",
        url: `/study/america`
      }
    ];
    this.rmxx = [
      {
        country: "哈佛大学",
        url: `/study/detail?id=3`
      },
      {
        country: "麻省理工",
        url: `/study/detail?id=7`
      },
      {
        country: "斯坦福大学",
        url: `/study/detail?id=11`
      },
      {
        country: "墨尔本大学",
        url: `/study/detail?id=19`
      },
      {
        country: "多伦多大学",
        url: `/study/detail?id=87`
      }
    ];
    this.mbxw = [
      {
        country: "小学",
        url: `/study/sc1`
      },
      {
        country: "中学",
        url: `/study/sc2`
      },
      {
        country: "高中",
        url: `/study/sc3`
      },
      {
        country: "本科",
        url: `/study/sc4`
      },
      {
        country: "硕士",
        url: `/study/sc5`
      },
      {
        country: "博士",
        url: `/study/sc6`
      }
    ];

    // 游学
    this.duixiang = [
      {
        country: "幼儿",
        url: `/studytour/zs1`
      },
      {
        country: "小学生",
        url: `/studytour/zs2`
      },
      {
        country: "初中生",
        url: `/studytour/zs3`
      },

      {
        country: "高中生",
        url: `/studytour/zs4`
      },
      {
        country: "大学生在职人员",
        url: `/studytour/zs5`
      },
      {
        country: "亲子",
        url: `/studytour/zs6`
      }
    ];
    this.zhuti = [
      {
        country: "高端夏令营",
        url: `/studytour/zt1`
      },
      {
        country: "K12教育",
        url: `/studytour/zt2`
      },
      {
        country: "名校精英教育",
        url: `/studytour/zt3`
      },
      {
        country: "语言学校",
        url: `/studytour/zt4`
      },
      {
        country: "主题营地",
        url: `/studytour/zt5`
      },
      {
        country: "商科项目",
        url: `/studytour/zt6`
      }
    ];
    this.guojia = [
      {
        country: "英国",
        url: `/studytour/england`
      },

      {
        country: "加拿大",
        url: `/studytour/canada`
      },
      {
        country: "澳大利亚",
        url: `/studytour/australia`
      },
      {
        country: "美国",
        url: `/studytour/america`
      }
    ];
  },

  methods: {
    // 回车跳转
    enterSend(type, e) {
      let keyCode = e.keyCode | 0;
      if (type == "house") {
        if (keyCode == 13) {
          this.houstSearch();
        }
      } else if (type == "study") {
        if (keyCode == 13) {
          this.studySearch();
        }
      }
    },

    // 留学搜搜
    studySearch() {
      this.$router.push({
        path: `/study`,
        query: { schoolName: this.study_search }
      });
    },
    // 房产搜搜
    houstSearch() {
      this.$router.push({
        path: `/house`,
        query: { name: this.house_search }
      });
    },

    moveIn(i) {
      if (i > 3) return;
      this.i = i;
      let leftMenu = this.$refs.leftMenu;
      let items = [...document.querySelectorAll(".details_box")];
      leftMenu.forEach((val, i) => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
        if (i < 4) {
          if (items[i].classList.contains("show")) {
            items[i].classList.remove("show");
          }
        }
      });
      leftMenu[i].classList.add("active");

      items[i].classList.add("show");
    },
    moverOut() {
      let leftMenu = this.$refs.leftMenu;
      let items = [...document.querySelectorAll(".details_box")];
      leftMenu.forEach((val, i) => {
        if (val.classList.contains("active")) {
          val.classList.remove("active");
        }
        if (i < 4) {
          if (items[i].classList.contains("show")) {
            items[i].classList.remove("show");
          }
        }
      });
    },
    moveBar(i) {
      var house_width = this.$refs.footBar.offsetWidth,
        footBar = this.$refs.footBar;
      console.log(house_width);
      footBar.style.left = house_width * i + "px";
    },
    tag(key) {
      this.num = key;
      var height = this.$refs.li.offsetHeight;
      console.log(height);
      var ul = this.$refs.ul;
      ul.style.marginTop = -key * height + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: normal;
}
ul {
  list-style: none;
}
.search {
  // width: 725px;
  height: 350px;
  // border-radius: 8px;
  // background-color: rgb(242, 247, 253);
  // background-image:linear-gradient(to right, #f2f7fd 77%, transparent 149%);
  // overflow: hidden;
  margin-top: 17px;

  .classify {
    overflow: hidden;
    float: left;
    // height: 100%;
    width: 118px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 6px;
    text-align: left;
    li {
      height: 47px;
      font-size: 16px;
      padding-left: 24px;
      line-height: 47px;
      box-sizing: border-box;
      border-bottom: 1px solid #dee5f3;
      cursor: pointer;
      position: relative;
      span {
        color: #3cb584;
        font-size: 12px;
        // float: right;
        // padding-right: 23px;
        position: absolute;
        right: 10px;
        top: -13px;
      }
      &:nth-child(-n + 4):after {
        position: absolute;
        content: "";
        background: url("../static/images/right.png") no-repeat center/cover;
        width: 9px;
        height: 16px;
        right: 20px;
        top: 16px;
      }
      &.active {
        &::after {
          background: url("../static/images/active_right.png") no-repeat
            center/cover;
        }
      }

      &:last-child {
        border: none;
      }
    }
  }

  .details_box {
    display: none;
    width: 644px;
    height: 329px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 25px 30px 11px 30px;
    float: left;
    // width: calc(100% - 100px);
    box-sizing: border-box;
    border-radius: 6px;
    margin-left: 5px;
    &.show {
      display: block;
    }

    .over_hidden {
      height: 100%;
      overflow: hidden;
      .details {
        transition: all 0.5s;
        li {
          height: 300px;
          margin: 0;
          .topBar {
            border-bottom: 1px solid #ddd;
            height: 40px;
            overflow: hidden;
            position: relative;
            &::after {
              position: absolute;
              content: "";
              width: 100%;
              height: 2px;
              left: 0;
              bottom: 0;
              // background-color: rgb(235, 238, 242);
            }
            span.xf {
              float: left;
              width: 150px;
              // font-weight: 600;
              position: relative;
              height: 40px;
              text-align: center;
              font-size: 14px;
              cursor: pointer;
              i {
                color: #3cb584;
                position: absolute;
                font-size: 12px;
                right: 1px;
                top: -3px;
              }
            }

            .mark {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 150px;
              height: 2px;
              background-color: red;
              z-index: 2;
              transition: all 0.3s;

              &::after {
                position: absolute;
                content: "";
                width: 20px;
                height: 20px;
                transform: rotate(45deg);
                top: 0;
                left: 65px;
                background-color: red;
              }
            }
          }
        }

        // form
        .form {
          margin-top: 25px;
          height: 55px;
          padding: 8px;
          background-color: rgba(0, 0, 0, 0.05);

          box-sizing: border-box;
          .inp {
            width: 450px;
            height: 40px;
            float: left;
            padding: 14px;
          }

          .searchBtn {
            float: left;
            width: 100px;
            height: 40px;
            background-color: rgb(237, 37, 48);
            line-height: 40px;
            color: #fff;
            margin-left: 0px;
            cursor: pointer;
            margin-left: 9px;
            outline: none;
            border: 0;
          }
        }

        // content
        .content {
          padding-top: 16px;
          overflow: hidden;

          .region {
            float: left;
            box-sizing: border-box;
            height: 155px;
          }

          .region:first-child {
            padding-right: 57px;
            border-right: 1px dashed #ccc;
            width: 40%;
            h3 {
              text-align: left;
              padding-bottom: 15px;
            }

            a {
              color: #9399a5;
              font-size: 14px;
              text-decoration: none;
              display: inline-block;
              float: left;
              margin-bottom: 5px;
              margin-right: 20px;
              text-align: left;
            }
          }

          .region:nth-child(2),
          .region:nth-child(3) {
            h3 {
              text-align: left;
              padding-bottom: 15px;
            }
            width: 30%;
            border-right: 1px dashed #ccc;
            padding: 0 40px 0 58px;
            text-align: left;
            a {
              color: rgb(170, 174, 185);
              font-size: 14px;
              text-decoration: none;
              display: block;
              // float: left;
              // width: 50px;
              // padding-right: 20px;
              margin-bottom: 5px;
            }
          }

          .region:nth-child(3) {
            border: none;
          }
        }
      }
    }
  }

  .some {
    h3 {
      font-size: 16px;
      padding-bottom: 11px;
    }
    a {
      font-size: 14px;
      color: #9399a5;
    }
  }

  .yimin {
    padding: 60px 0 0;
    .itm {
      position: relative;
      &::after {
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        width: 1px;
        height: 196px;

        border-right: 1px dashed #ddd;
      }
    }
    .oz {
      padding-left: 64px;
      width: 165px;
    }
    .yz,
    .mz {
      width: 153px;
      padding-left: 55px;
    }
    .dyz {
      width: 170px;
      padding-left: 55px;
      &::after {
        border-right: 0;
      }
      ul:last-child {
        margin-top: 50px;
      }
    }
    ul {
      li {
        margin-bottom: 5px;
      }
    }
  }
  .liuxue {
    .form {
      margin-top: 15px !important;
    }
  }

  .youxue {
    padding: 60px 0 0;
    ul {
      li {
        margin-bottom: 5px;
      }
    }
    .itm {
      position: relative;
      &::after {
        position: absolute;
        content: "";
        right: 0;
        top: 0;
        width: 1px;
        height: 196px;
        border-right: 1px dashed #ddd;
      }
    }
    .dx {
      width: 231px;
      padding-left: 80px;
    }
    .zt {
      width: 200px;
      padding-left: 68px;
    }
    .gj {
      width: 211px;
      padding-left: 66px;
    }
  }

  .active {
    background-color: rgb(228, 51, 67);
    color: #fff;
  }
}
</style>
