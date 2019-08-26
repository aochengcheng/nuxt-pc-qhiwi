import {
  mapMutations
} from "vuex";

export const phone = {
  data() {
    return {
      phone: `400-877-1008`
    }
  }
}

export const fixedNav = {
  data() {
    return {
      active: 0,
      show_yy: false
    }
  },
  mounted() {
    //  this.$refs.mask.style.height = document.getElementById('app').clientHeight + 'px'
    this.section = document.querySelectorAll('.pro_items')
    window.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
    document.documentElement.scrollIntoView({
      behavior: 'smooth'
    })
  },

  methods: {
    handleScroll() {
      let section = document.querySelectorAll(".pro_items");
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop)
      let navbox = this.$refs.navBox;
      let main = this.$refs.main;
      if (scrollTop >= this.top) {
        if (!navbox.classList.contains("toFixed")) {
          navbox.classList.add("toFixed");
          this.show_yy = true
        }
        main.style.paddingTop = this.paddingTop + "px";

        this.showPhone = true
        // console.log(section);
        Array.from(section).forEach((item, index) => {
          if (
            scrollTop >=
            item.offsetTop - 50 &&
            scrollTop < item.offsetTop + item.clientHeight
          ) {
            this.active = index;
          }
          // console.log(this.active);
        });
      } else {
        if (navbox.classList.contains("toFixed")) {
          navbox.classList.remove("toFixed");
          this.show_yy = false
        }
        this.showPhone = false
        main.style.paddingTop = "0px";
      }
    },
    getActive(val) {
      this.active = val;
      let section = document.querySelectorAll(".pro_items");
      let top = section[val].offsetTop - 30;
      document.documentElement.scrollIntoView({
        behavior: 'smooth'
      })
      document.documentElement.scrollTop = top;

    }

  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  }
}

/**
 * 
 * 移民、留学刷新供应商
 * 
 *  */

export const referer = {
  data() {
    return {
      count: null,
      page: 1,
      limit: 4,
      canReferer: true,
      referer_can: true,
      merchant_data: [],
      simpleName: '',
      head_img: '',
      hot: '',

    }
  },
  computed: {
    cityNum() {
      return this.$store.state.cityNum.showCityNum;
    }
  },
  methods: {
    // 换一换
    referer() {
      // const change = this.$refs.change;
      if (this.referer_can) {
        this.referer_can = false;
        // change.classList.add("refe");
        if (this.page * this.limit >= this.count) {

          this.$message({
            message: `没有更多数据了哦~`,
            type: 'warning'
          })
          return
        }
        this.getMerchantData();
        this.page++;
        setTimeout(() => {
          // change.classList.remove("refe");
          this.referer_can = true;
        }, 1000);
      }
    },
    // 供应商
    getMerchantData() {
      fetch(this.refererURL, {
        id: this.id,
        page: this.page,
        limit: this.limit,
        showCityNum: this.cityNum
      }).then(res => {
        if (res.ErrCode == "0000") {
          // console.log(res.Result)
          this.count = res.Result.count;
          this.merchant_data = res.Result.data;
          console.log(this.merchant_data);

          if (this.merchant_data.length > 0) {
            this.simpleName = this.merchant_data[0].companyName || '';
            this.head_img = this.merchant_data[0].headPortrait || '';
            this.hot = this.merchant_data[0].actualNumber;
          }
        }
      });
    },
  },
  mounted() {
    // this.getMerchantData()
  }
}


/** 
 * 
 * 筛选条件  加载数据
 * 
 */
// import {
//     SEOConfig
// } from '../utils/config'
import axios from 'axios'
export const screen = {
  // metaInfo() {
  //     if (!this.canmetaInfo) return

  //     console.log(SEOConfig[this.$options.name].title)
  //     return {
  //         title: SEOConfig[this.$options.name].title,
  //         meta: [{
  //                 name: "keywords",
  //                 content: SEOConfig[this.$options.name].keywords
  //             },
  //             {
  //                 name: "description",
  //                 content: SEOConfig[this.$options.name].description
  //             }
  //         ]
  //     };
  // },

  data() {
    return {
      // count: 0,
      screen_data: {},

      house_data: [],
      canmetaInfo: true,
      ds: this.count,
      params: {}
    }
  },
  created() {

    // console.log(limit)
    this.params = {
      page: 1,
      limit: this.limit || 6
    }
    if (this.$route.query.name) {
      Object.assign(this.params, {
        name: this.$route.query.name
      })
    }
    if (this.$route.query.schoolName) {
      Object.assign(this.params, {
        schoolName: this.$route.query.schoolName
      })
    }

    console.log(this.params)
    // this.getListData();
    this.params = {
      page: 1,
      limit: this.limit || 6
    }
  },
  methods: {
    getScreenData(val) {
      console.log(val)
      this.screen_data = {};
      for (var k in val) {
        this.screen_data[k] = val[k].id;
      }
      this.params = Object.assign(this.params, this.screen_data);
      console.log(this.screen_data)
      console.log(this.params)
      // this.getListData();
    },
    // 清除所有
    clear() {
      // console.log(this.$refs.options.allData)
      this.$refs.options.allData = {};
      this.params = {
        page: 1,
        limit: this.limit || 6
      };
      this.screen_data = {};

      // 城市在归置默认状态
      this.showCityNum('')
      this.getListData();
    },

    // getListData() {
    //     console.log(this.params)

    //     this.$fetch(this.merUrl, this.params).then(res => {
    //         if (res.ErrCode == "0000") {
    //             this.house_data = res.Result.data;
    //             console.log(this.house_data)
    //             this.count = res.Result.count
    //         }
    //     });
    // },
    ...mapMutations({
      showCityNum: 'STATE_CITY_NUMBER'
    })
  }
}


/** 
 * 
 * 首页请求数据、缓存
 * 
 */
import {
  fetch
} from "~/plugins/axios/http.js";

export const getHomeData = {

  // async asyncData(c){
  //     // fetch()
  //     console.log(c)
  // },

  data() {
    return {
      all_data: [],
      page: 1,
      index: '',
      cacheObj: {},

    }
  },
  methods: {
    getAllData() {
      this.all_data = []
      this.$fetch(this.url, {
        page: this.page,
        limit: this.limit || 6,
        [this.paramsType]: this.index,
        checkState: 1,
        by: 'index_1'
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.all_data = res.Result.data;

          // console.log(this.all_data)
          this.cacheObj[this.pageName] = this.all_data

          // sessionStorage.setItem(this.cacheName, JSON.stringify(this.cacheObj));
          // console.log(this.all_data)
        }
      });
    },

    // 获取缓存
    // getcache(cacheName, pageName) {
    //     let list = JSON.parse(sessionStorage.getItem(cacheName));
    //     if (pageName in list) {
    //         this.all_data = list[pageName];

    //         return false;
    //     } else {
    //         this.all_data = [];
    //         return true;
    //     }
    // },
  },
  created() {
    this.getAllData()
  }
}


/**
 * 
 * 各模块热门
 * 
 */
export const getModelHot = {
  data() {
    return {
      modelHot: []
    }
  },
  computed: {
    cityNum() {
      return this.$store.state.cityNum.showCityNum;
    }
  },
  methods: {
    getHot() {
      fetch('/dhr/client/article/list', {
        page: 1,
        limit: 5,
        cate: this.cate || 1,
        showCityNum: this.cityNum
      }).then(res => {

        if (res.ErrCode == '0000') {
          this.modelHot = res.Result.data
          // console.log(this.modelHot)
        }

      })
    }
  },
  created() {
    this.getHot()
  }
}


// 设置国家路由
import {
  mapGetters
} from "vuex";
export const setCountryMode = {
  computed: {
    cityJx() {
      // return this.cityJX
      return 11
    },
    // ...mapGetters(['cityJX'])
  },
}


/** 
 * 
 * 点击率
 * 
 * 
 */
export const clickRate = {
  methods: {
    clickRate() {
      fetch("/dhr/client/merchant_number", {
        id: this.merchant_id
      }).then(res => {
        console.log(res);
      });
    }
  }
}
