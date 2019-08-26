<template>
  <div>
    <header class="centered clearFix">
      <div class="div400" @click="clickThePhone">
        <div>
          <div class="imgs">
            <span ref="phone">点击查看电话</span>
          </div>
        </div>
      </div>
    </header>

    <div class="bgc">
      <div class="centered mer_box">
        <div class="head_img" v-if="mer_data.merchant">
          <img v-lazy="mer_data.merchant.headPortrait" />
        </div>
        <h3>
          <span>
            <img src="../../static/images/merchent/redl.png" alt />
          </span>
          <span class="sname" v-if="mer_data.merchant">{{mer_data.merchant.simpleName}}</span>
          <span>
            <img src="../../static/images/merchent/redl.png" alt />
          </span>
        </h3>
        <p v-if="mer_data.merchant">{{mer_data.merchant.describe}}</p>

        <div class="cards">
          <el-carousel
            v-if="HD.length>0"
            indicator-position="outside"
            height="160px"
            :autoplay="false"
          >
            <el-carousel-item v-for="(item, i) in el_item" :key="item">
              <div class="h clearFix">
                <div class="item" v-for="d in HD.slice(i*4,(i+1)*4)">
                  <router-link :to="{path:`/hwhd`,query:{id:d.id}}">
                    <img v-lazy="d.coverImg" />
                    <span class="time">{{_UTCTimeForMat(d.startTime,'mm-dd')}}</span>

                    <p class="txt text_overflow">{{ d.title }}</p>
                  </router-link>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <main class="centered main">
      <div class="topbar">
        <ul class="clearFix">
          <li
            v-for="(item,i)  in pro"
            :key="i"
            :class="{'active':i==0}"
            ref="li"
            :type="item.type"
            @click="switchType(i,item.type,item.url)"
          >{{item.name}}</li>
        </ul>
      </div>

      <div class="content">
        <div :class="['clearFix',{current:i==0}]" ref="allc" v-for="(item,i) in 5" :key="i" none>
          <div class="loading" v-show="nomore">
            <div class="loading_wrap">
              <img src="~/static/images/rout.gif" />
            </div>
          </div>
          <!-- 头条 -->
          <div v-if="kind=='hot'">
            <div class="leftdiv">
              <div class="content_wrapper">
                <div class v-for="(hot,i) of list[kind]['data']" :key="i">
                  <nuxt-link :to="{path:'/news/detail',query:{id:hot.id}}">
                    <div class="content_box">
                      <div class="c_img">
                        <img v-lazy="hot.coverImg" :key="hot.id" />
                      </div>

                      <div class="c_txt">
                        <h3 class="c_txt_tit text_overflow">{{ hot.name }}</h3>
                        <div class="c_txt_con">
                          <p>{{hot.describe}}</p>
                        </div>

                        <div class="c_txt_source">
                          <div class="c_txt_s" v-if="hot.merchant">来源：{{ hot.merchant.simpleName }}</div>
                          <div
                            class="c_txt_t"
                            v-if="hot.merchant"
                          >发布时间：{{ _ymdFormat(hot.createdAt) }}</div>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>

              <div class="page" v-if="list[kind]['count'] > 0">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="list[kind]['count']"
                  :currentPage="list[kind]['page']"
                  :page-size="list[kind]['limit']"
                  @current-change="changePage"
                ></el-pagination>
              </div>
            </div>
            <div class="rightdiv">
              <SideRight
                v-if="mer_data.merchant&&list['hot']['hot_data'].length >0"
                :sTitle="`${mer_data.merchant.simpleName}快讯`"
                :hot_data="list[kind]['hot_data']"
                modelName="house"
              ></SideRight>
            </div>
          </div>
          <!-- 房产 -->
          <div v-if="kind=='house'">
            <div class="leftdiv">
              <Howmenyh1 :count="list[kind]['count']" type="房产项目"></Howmenyh1>
              <!-- <div class="divsx">
              <Sort :params="params" by="downPay"></Sort>
              </div>-->

              <Housemig v-for="(item,i) in list[kind]['data']" :result_data="item" :key="i"></Housemig>

              <div class="page" v-if="list[kind]['count'] > 0">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="list[kind]['count']"
                  :currentPage="list[kind]['page']"
                  :page-size="list[kind]['limit']"
                  @current-change="changePage"
                ></el-pagination>
              </div>
            </div>
            <div class="rightdiv">
              <SideRight
                v-if="mer_data.merchant&&list['house']['hot_data'].length >0"
                sTitle="房产头条"
                :hot_data="list[kind]['hot_data']"
                modelName="house"
              ></SideRight>
            </div>
          </div>
          <!-- 移民 -->
          <div v-if="kind=='immig'">
            <div class="leftdiv">
              <Howmenyh1 :count="list[kind]['count']" type="移民项目"></Howmenyh1>
              <immigs v-for="(item,i) in list[kind]['data']" :immig_data="item" :key="i"></immigs>
              <div class="page" v-if="list[kind]['count'] > 0">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="list[kind]['count']"
                  :currentPage="list[kind]['page']"
                  :page-size="list[kind]['limit']"
                  @current-change="changePage"
                ></el-pagination>
              </div>
            </div>
            <div class="rightdiv">
              <SideRight
                v-if="mer_data.merchant&&list['immig']['hot_data'].length >0"
                sTitle="移民头条"
                :hot_data="list[kind]['hot_data']"
                modelName="house"
              ></SideRight>
            </div>
          </div>
          <!-- 留学 -->
          <div v-if="kind=='study'">
            <div class="leftdiv">
              <Howmenyh1 :count="list[kind]['count']" type="留学项目"></Howmenyh1>
              <div class="wrapper_box">
                <div class="wrapper_img" v-for="(item,i) in list[kind]['data']" :key="i">
                  <nuxt-link :to="{path:'/study/detail',query:{id:item.id}}">
                    <div class="wrapper_img">
                      <div class="test"></div>
                      <div class="badge">
                        <div>
                          <img v-lazy="item.schoolBadgeImg" :key="item.id" />
                        </div>
                      </div>

                      <div class="wrapper_right">
                        <div class="badge_r">
                          <h3 class="colle_zh" @click="jumpDetails(item.id)">{{ item.schoolName }}</h3>

                          <div class="colle_en">{{ item.englishName }}</div>
                        </div>

                        <div class="badge_addr">
                          <div class="addr">
                            <country :country="item.hostCountry"></country>
                          </div>
                          <p>{{ item.hostCity }}</p>
                        </div>

                        <div class="ranking">
                          <p class="rank">
                            国内综合排名：
                            <span>{{ item.countryRanking }}</span>
                          </p>
                          <p class="ratio">
                            录取率：
                            <span>{{ item.acceptanceRate }}%</span>
                          </p>
                        </div>

                        <div class="list">
                          <!-- @click="jumpDetails(item.id)" -->
                          <span>学校教育</span>
                          <span>申请条件</span>
                          <span>专业介绍</span>
                          <span>每年学费</span>
                          <span>截止日期</span>
                          <span>开学日期</span>
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                </div>

                <div class="page" v-if="list['immig']['count'] > 0">
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="list[kind]['count']"
                    :currentPage="list[kind]['page']"
                    :page-size="list[kind]['limit']"
                    @current-change="changePage"
                  ></el-pagination>
                </div>
              </div>
            </div>
            <div class="rightdiv">
              <SideRight
                v-if="mer_data.merchant&&list['study']['hot_data'].length >0"
                sTitle="留学头条"
                :hot_data="list[kind]['hot_data']"
                modelName="house"
              ></SideRight>
            </div>
          </div>
          <!-- 游学 -->
          <div v-if="kind=='studytour'">
            <div class>
              <Howmenyh1 :count="list[kind]['count']" type="游学项目"></Howmenyh1>
              <div class="study_imgs">
                <div class="stu_item" v-for="(item,i) in list[kind]['data']" :key="i">
                  <nuxt-link :to="{path:'/studytour/detail',query:{id:item.id}}">
                    <div class>
                      <div class="stu_img">
                        <pic-right-tit
                          :img_src="item.coverImg"
                          :title="item.title"
                          :content="item.subTitle"
                        ></pic-right-tit>
                      </div>
                      <div class="date_time">
                        <span-date
                          :dataTime="_goTime(item.startTime,item.endTime) | goTime()"
                          :price="item.price"
                        >
                          <span>价格:</span>
                        </span-date>
                      </div>

                      <div class="city">
                        <span-trip
                          v-if="item.merchant"
                          :citys="item.departureCity"
                          :dataTime="_UTCformat(item.startTime,item.endTime)"
                          :merchant="item.merchant.simpleName"
                        ></span-trip>
                      </div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
              <div class="page" v-if="list[kind]['count'] > 0">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="list[kind]['count']"
                  :currentPage="list[kind]['page']"
                  :page-size="list[kind]['limit']"
                  @current-change="changePage"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Housemig from "~/components/haiwaiHouse/housemig";
import Pagination from "~/components/Pagination.vue";
import Howmenyh1 from "~/components/Howmeny-h1";
import Sort from "~/components/sort";
import immigs from "~/components/immig";
import PicRightTit from "~/components/picture-right-title";
import SpanDate from "~/components/span-date";
import SpanTrip from "~/components/Span-trip";
import country from "~/components/Country";
import SideRight from "~/components/side_right";
import { ymdFormat, UTCformat, goTime } from "~/utils/UTCformat";
import { setCountryMode } from "~/utils/mixins";
import { UTCTimeForMat } from "~/utils/timeFormat";
import { fetch, post } from "~/plugins/axios/http.js";
import { backToTop } from "~/utils/backToTop";
export default {
  layout: "merchant",
  mixins: [setCountryMode],
  components: {
    Housemig,
    Pagination,
    SideRight,
    Howmenyh1,
    Sort,
    immigs,
    PicRightTit,
    SpanDate,
    SpanTrip,
    country,
    SideRight
  },

  async asyncData(ctx) {
    // 获取供应商详情

    const { Result: mer_data } = await post("/dhr/client/house/merchant_page", {
      id: ctx.query.merchant_id || 8
      // showCityNum: ctx.$store.state.number || 1
    });

    console.log("mer_data::", mer_data);

    return {
      mer_data
    };
  },

  data() {
    return {
      merchantId: "",
      mer_data: {},
      pro: [
        {
          name: "头条",
          type: "hot",
          url: "/dhr/client/article/list"
        },
        {
          name: "房产",
          type: "house",
          url: "/dhr/client/house/list"
        },
        {
          name: "移民",
          type: "immig",
          url: "/dhr/client/migrate/merchant/list"
        },
        {
          name: "留学",
          type: "study",
          url: "/dhr/client/study_abroad/merchant/list"
        },
        {
          name: "游学",
          type: "studytour",
          url: "/dhr/client/study_tour/list"
        }
      ],
      list: {
        hot: {
          data: [],
          hot_data: [],
          page: 1,
          limit: 10,
          count: 0,
          url: "/dhr/client/article/list"
        },
        house: {
          data: [],
          hot_data: [],
          page: 1,
          limit: 10,
          count: 0,
          url: "/dhr/client/house/list"
        },
        immig: {
          data: [],
          hot_data: [],
          page: 1,
          limit: 10,
          count: 0,
          url: "/dhr/client/migrate/merchant/list"
        },
        study: {
          data: [],
          hot_data: [],
          page: 1,
          limit: 10,
          count: 0,
          url: "/dhr/client/study_abroad/merchant/list"
        },
        studytour: {
          data: [],
          hot_data: [],
          page: 1,
          limit: 9,
          count: 0,
          url: "/dhr/client/study_tour/list"
        }
      },
      kind: "hot",
      merchant_id: this.$route.query.merchant_id || 8,
      phone: "",

      HD: [],
      el_item: [],
      simpleName: "",
      describe: "",

      // 暂无更多
      nomore: true
    };
  },
  head() {
    return {
      title:
        this.mer_data.merchant &&
        this.mer_data.merchant.simpleName +
          "-" +
          this.mer_data.merchant.describe,
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: '去海外'
        },
        {
          hid: "description",
          name: "description",
          content: '去海外'
        }
      ]
    };
  },

  metaInfo() {
    return {
      title:
        this.mer_data.merchant &&
        this.mer_data.merchant.simpleName +
          "-" +
          this.mer_data.merchant.describe,
      meta: [
        {
          name: "keywords",
          content: ""
        },
        {
          name: "description",
          content: ""
        }
      ]
    };
  },
  mounted() {
    fetch("/dhr/client/article/list", {
      page: 1,
      limit: 10,
      merchant_id: this.merchant_id,
      by: "index_1"
    }).then(res => {
      if (res.ErrCode == "0000") {
        this.list[this.kind]["data"] = res.Result.data;
        this.list[this.kind]["count"] = res.Result.count;

        if (this.list[this.kind]["data"].length == 0) {
          this.nomore = false;
        } else if (this.list[this.kind]["data"].length > 0) {
          this.nomore = false;
        }
      }
    });

    fetch("/dhr/client/article/list", {
      page: 1,
      limit: 5,
      merchant_id: this.merchant_id
    }).then(res => {
      if (res.ErrCode == "0000") {
        this.list[this.kind]["hot_data"] = res.Result.data;
      }
    });
  },
  methods: {
    _goTime(start, end) {
      return goTime(start, end);
    },
    async changePage(page) {
      backToTop(2, 540);
      let params = {
        page,
        limit: this.list[this.kind]["limit"],
        merchant_id: this.merchant_id
      };
      if (this.kind == "hot") {
        Object.assign(params, { by: "index_1" });
      }
      const {
        Result: { data }
      } = await fetch(this.list[this.kind]["url"], params);

      console.log("a::", data);
      this.list[this.kind]["data"] = data;
    },

    // 活动
    getHD() {
      fetch("/dhr/merchant/activity/management", {
        shelf: 1,
        checkState: 1,
        merchant_id: this.$route.query.merchant_id,
        by: "index",
        page: 1,
        limit: 100
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.HD = res.Result.data;
          this.el_item = Math.ceil(this.HD.length / 4);
          console.log("this.HD::", this.HD);
          console.log(this.el_item);
        }
      });
    },
    _UTCTimeForMat(utc, time) {
      return UTCTimeForMat(utc, time);
    },

    switchType(i, type, url) {
      console.log(type);
      const li = this.$refs.li;
      const allc = this.$refs.allc;
      li.forEach((item, i) => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
        if (allc[i].classList.contains("current")) {
          allc[i].classList.remove("current");
        }
      });
      li[i].classList.add("active");
      allc[i].classList.add("current");

      /**
       *
       */
      this.kind = type;
      let all_data = this.list[this.kind];
      this.getData(
        url,
        all_data["data"],
        all_data["page"],
        all_data["limit"],
        all_data["count"],
        i
      );
    },

    getData(url, data, page, limit, count, cate) {
      if (this.list[this.kind]["data"].length > 0) return;
      this.$fetch(url, {
        page: page,
        limit: limit,
        merchant_id: this.merchant_id
      }).then(res => {
        console.log(res);
        if (res.ErrCode == "0000") {
          this.list[this.kind]["count"] = res.Result.count;

          //   this[data] = this.list[this.kind][data].concat(res.Result.data);
          this.list[this.kind]["data"] = res.Result.data;
          if (this.list[this.kind]["data"].length == 0) {
            this.nomore = false;
          } else if (this.list[this.kind]["data"].length > 0) {
            this.nomore = false;
          }

          console.log(" this.nomore::", this.nomore);

          console.log(this.list[this.kind]["data"]);
        }
      });
      if (
        this.list[this.kind]["hot_data"].length > 0 ||
        cate == "" ||
        cate == 4
      )
        return;
      this.$fetch("/dhr/client/article/list", {
        page: 1,
        limit: 5,
        merchant_id: this.merchant_id,
        cate
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.list[this.kind]["hot_data"] = res.Result.data;
        }
      });
    },

    getListData() {
      this.$fetch(this.list[this.kind]["url"], {
        page: this.list[this.kind]["page"],
        limit: this.list[this.kind]["limit"],
        merchant_id: this.merchant_id,
        by: "index_1"
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.list[this.kind]["data"] = res.Result.data;

          //   this.count = res.Result.count;
        }
      });
    },

    _ymdFormat(t) {
      return ymdFormat(t);
    },
    _UTCformat(start, end) {
      let UTCTime = UTCformat(start) + "-" + UTCformat(end).substr(5);

      return UTCTime;
    },

    //   获取电话
    clickThePhone() {
      let phone = this.$refs.phone;
      phone.innerHTML = this.mer_data.merchant.xuNiPhone || "400-877-1008";
    },
    //获取活动列表
    getactivity() {
      post("/dhr/merchant/activity/management", {
        merchant_id: parseInt(this.merchant_id) || 8
      });
    }
  },
  created() {
    this.getHD();
  }
};
</script>

<style  lang="scss">
.cards {
  .el-carousel__button {
    width: 50px;
    height: 2px;
  }
  .el-carousel__indicator.is-active button {
    background-color: #ed2530;
    opacity: 1;
  }
}
</style>

<style scoped lang="scss">
.div400 {
  float: right;
  width: 300px;
  height: 80px;
  line-height: 80px;
  color: #3cb584;
  background: rgba(246, 246, 246, 1);
  padding-left: 70px;
  .imgs {
    padding-left: 34px;
    position: relative;
    font-size: 18px;
    cursor: pointer;
    &::after {
      position: absolute;
      content: "";
      background: url("../../static/images/haiwaiHouse/tel.png") no-repeat
        center / cover;
      width: 36px;
      height: 36px;
      left: -15px;
      top: 23px;
    }
  }
}
.bgc {
  background: url("../../static/images/merchent/m_bg.png") no-repeat center;
  height: 270px;
  .mer_box {
    padding: 58px 0;
    text-align: center;
    position: relative;
  }
  .head_img {
    position: absolute;
    width: 90px;
    height: 90px;
    left: 50%;
    margin-left: -45px;
    top: -45px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 1px 3px 5px #ccc;
  }
  h3 {
    font-size: 36px;
    font-weight: 400;
    color: #3f5169;

    img {
      width: auto;
      height: auto;
      display: inline;
    }
    .sname {
      padding: 0 30px;
    }
  }
  p {
    color: #3e5068;
    font-size: 24px;
    margin-top: 20px;
  }
}
.cards {
  position: absolute;
  bottom: -156px;
  width: 100%;
  .h {
    .item {
      float: left;
      height: 160px;
      width: 285px;
      margin-right: 20px;
      color: #fff;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .time {
        background-color: #ed2530;
        font-size: 14px;
        position: absolute;
        left: 0;
        top: 0;
        padding: 7px;
        color: #fff;
      }
      .txt {
        font-size: 18px;
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        margin-top: 0;
      }
    }
  }
}

.main {
  padding-top: 150px;
  .topbar {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 2px;
      background-color: #ed2530;
      left: 0;
      bottom: 2px;
    }
    ul {
      border: 1px solid #e3e3e3;
      border-bottom: none;
      display: inline-block;
      li {
        float: left;
        width: 130px;
        height: 44px;
        line-height: 44px;
        border-right: 1px solid #e3e3e3;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        &:last-child {
          border: none;
        }
        &.active {
          background-color: #ed2530;
          color: #fff;
          border: none;
        }
      }
    }
  }
  .content {
    min-height: 800px;
    [none] {
      display: none;
    }
    .current {
      display: block;
    }
    .leftdiv {
      width: 840px;
      float: left;
      .divsx {
        width: 100%;
        height: 40px;
        line-height: 40px;
      }
    }
    .content_wrapper {
      display: flex;
      color: #9fa3ac;
      box-sizing: content-box;
      flex-direction: column;
      .content_box {
        display: flex;
        border-bottom: 1px solid #e3e3e3;
        padding: 20px 0;
      }
      .c_img {
        height: 160px;
        width: 240px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }

      .c_txt {
        flex: 1;
        padding: 11px 0 0 31px;

        .c_txt_tit {
          cursor: pointer;
          font-size: 18px;
          font-weight: 500;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .c_txt_con {
          margin-top: 21px;
          line-height: 1.6;
          height: 42px;
          overflow: hidden;
          p {
            color: #9399a5;
            font-size: 14px;
            // text-overflow:  -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        .c_txt_source {
          display: flex;
          margin-top: 50px;
          .c_txt_s {
          }
          .c_txt_t {
            margin-left: 10px;
          }
        }
      }
    }

    .rightdiv {
      // width: 200px;
      padding-left: 60px;
      padding-top: 20px;
      float: left;
    }

    // 留学
    .wrapper_box {
      position: relative;
    }
    .wrapper_img {
      display: flex;
      width: 840px;
      box-sizing: content-box;
      padding: 20px 0;
      border-bottom: 1px solid #e4e4e4;
      position: relative;
      overflow: hidden;
      .test {
        z-index: -1;
        width: 0;
        left: -50px;
        top: 0;
        bottom: 20px;
        position: absolute;
        transition: all 0.3s;
        background-color: rgba(0, 0, 0, 0.3);
        opacity: 0.1;
        border-radius: 0 10px;
      }
      &:hover {
        .test {
          right: 0;
          width: 100%;
          transform: skewX(20deg);
        }
      }
      .badge {
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url("../../static/images/abroad/yuna.png") no-repeat
          center/cover;
        & > div {
          display: block;
          width: 106px;
          height: 106px;
          overflow: hidden;
          border-radius: 50%;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          // margin: 20px auto 0;
        }
      }
    }
    .wrapper_right {
      padding-top: 10px;
      padding-left: 30px;
      font-size: 14px;

      .badge_r {
        .colle_zh {
          font-size: 22px;
          cursor: pointer;
        }

        .colle_en {
          margin-top: 21px;
          color: #8f949a;
        }
      }
    }
    .badge_addr {
      margin-top: 11px;
      display: flex;
      .addr {
      }
      p {
        margin-left: 6px;
      }
    }

    .ranking {
      color: #9399a5;
      margin-top: 21px;
      display: flex;
      span {
        color: #35b987;
        font-weight: bold;
      }

      .ratio {
        margin-left: 41px;
      }
    }

    .list {
      margin-top: 11px;

      span {
        cursor: pointer;
        padding-right: 9px;
        margin-right: 9px;
        border-right: 2px solid #dad9de;
        color: #9399a5;

        &:last-child {
          padding-right: 0;
          margin-right: 0;
          border: 0;
        }
      }
    }

    // 游学
    .study_imgs {
      margin-top: 30px;
      display: flex;
      flex-wrap: wrap;
      .stu_item {
        margin-right: 30px;
        padding-bottom: 20px;
        cursor: pointer;
        margin-bottom: 30px;
        transition: all 0.3s;
        &:hover {
          box-shadow: 0 0 10px #d0c7c7;
          transform: translateY(-5px);
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        .date_time {
          margin-top: 10px;
          padding-left: 10px;
          span {
            margin-left: 10px;
            padding-bottom: 2px;
            color: #9a9b9f;
          }
        }

        .stu_img {
          width: 380px;
        }

        .city {
          margin-top: 30px;
          padding: 0 12px;
        }
      }
    }
  }

  .loading {
    // padding-bottom: 50px;

    position: relative;
    transition: all 0.5s;
    .loading_wrap {
      position: absolute;
      width: 50px;
      height: 50px;
      left: 50%;
      top: 100px;
      margin-left: -25px;
    }
    img {
    }
  }
}
</style>
