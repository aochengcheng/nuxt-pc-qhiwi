<template>
  <div class="hot_container">
    <GreyStripe></GreyStripe>
    <div class="hot_wrapper centered">
      <Bread :type="type"></Bread>

      <div class="hot_box">
        <div class="hot_left">
          <!-- <Swiper :banner="banner"></Swiper> -->
          <div>
            <slide :banner="banner" :title="true"/>
          </div>

          <div class="hot_ds">
            <div class="hot_it" v-for="(item,i) in smallbanner">
              <div class="box">
                <a :href="item.host">
                  <img v-lazy="item.imgPath" :key="item.id" />
                </a>
              </div>
              <p>{{ item.title }}</p>
            </div>
          </div>

          <div class="classification">
            <small-nav :list="list" @getActive="getActive" :remoteUrl="true"></small-nav>
            <main class="content">
              <!--  v-show="pageLoading" -->
              <div class="loading loading2" :style="{paddingBottom:(pageLoading?'50px':'0px')}">
                <div class="loading2_wrap">
                  <img src="~/static/images/d.gif" />
                </div>
              </div>
              <ul>
                <li>
                  <div class="content_wrapper">
                    <div class="" v-for="(hot,i) of type_list[kind]['data']" :key="i">
                      <nuxt-link :to="{path:'/news/detail',query:{id:hot.id}}">
                        <div class="content_box">
                          <div class="c_img">
                            <img v-lazy="hot.coverImg" :key="hot.id" :alt="hot.name"/>
                          </div>

                          <div class="c_txt">
                            <h3 class="c_txt_tit text_overflow">{{ hot.name }}</h3>
                            <div class="c_txt_con">
                              <p>{{hot.describe}}</p>
                            </div>

                            <div class="c_txt_source">
                              <div class="c_txt_s">来源：{{ hot.merchant.simpleName }}</div>
                              <div class="c_txt_t">发布时间：{{ _ymdFormat(hot.createdAt) }}</div>
                            </div>
                          </div>
                        </div>
                      </nuxt-link>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="loading" v-show="type_list[kind]['count'] <= 0">
                <div class="loading_wrap">
                  <img src="~/static/images/rout.gif" />
                </div>
              </div>

              <div class="page" v-show="type_list[kind]['count'] > 0">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="type_list[kind]['count']"
                  :currentPage="type_list[kind]['page']"
                  :page-size="10"
                  @current-change="changePage"
                ></el-pagination>
              </div>
            </main>
          </div>
        </div>

        <div class="hot_right">
          <h3>24小时快讯</h3>

          <info-mation :news="newsList"></info-mation>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GreyStripe from "~/components/Grey-stripe";
import Bread from "~/components/Breadcrumb";
import SmallNav from "~/components/small_nav";
import infoMation from "~/components/information";
import Pagination from "~/components/Pagination.vue";
import slide from "~/components/slider/slide";
import { ymdFormat, getDateDiff } from "~/utils/UTCformat";
import { setCountryMode } from "~/utils/mixins";
import { backToTop } from "~/utils/backToTop";
import { hotModel } from "~/utils/config";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [setCountryMode],
  async asyncData(ctx) {
    const [a, b, hot] = await Promise.all([
      fetch("/dhr/activity/news", {
        typeOf: 51,
        businessNum: 5
      }),
      fetch("/dhr/activity/news", {
        typeOf: 50
      }),
      fetch("/dhr/client/article/list", {
        page: 1,
        limit: 10,
        checkState: 1
      })
    ]);

    console.log("banner::::", a.Result.data);
    return {
      banner: a.Result.data,
      smallbanner: b.Result.data,
      newsList: hot.Result.data,

      showCityNum:  ctx.store.state.cityNum.showCityNum
    };
  },
  head() {
    return {
      title: hotModel.hours.title,
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: hotModel.hours.keywords
        },
        {
          hid: 'description',
          name: 'description',
          content: hotModel.hours.description
        }
      ]
    };
  },

  data() {
    return {
      type: [
        {
          title: "海外头条",
          path: ""
        }
      ],
      hot: [1, 2, 3],
      display: true,
      list: [
        {
          tit: "房产",
          id: "#a1",
          type: "house"
        },
        {
          tit: "游学",
          id: "#a2",
          type: "studytour"
        },
        {
          tit: "移民",
          id: "#a3",
          type: "immig"
        },
        {
          tit: "留学",
          id: "#a4",
          type: "study"
        },
        {
          tit: "医疗",
          id: "#a5",
          type: "yiliao"
        }
      ],

      page: 1,
      limit: 10,
      index: 1,
      count: 1,
      hot_data: [],
      modelURL: "house",
      //  seo
      hotTitle: hotModel["hours"]["title"],
      keywords: hotModel["hours"]["keywords"],
      description: hotModel["hours"]["description"],

      kind: "house",
      type_list: {
        house: {
          data: [],
          count: 0,
          page:1
        },
        studytour: {
          data: [],
          count: 0,
          page:1
        },
        immig: {
          data: [],
          count: 0,
          page:1
        },
        study: {
          data: [],
          count: 0,
          page:1
        },
        yiliao: {
          data: [],
          count: 0,
          page:1
        }
      },
      s_change: 1,

      pageLoading: false
    };
  },
  methods: {
    changePage(page) {
      this.pageLoading = true;
      // this.type_list[this.kind].data = [];
      console.log('page::',page);
      backToTop(10, 790);
      this.type_list[this.kind]['page']=page
      this.page = page;
      this.getHotList();
    },
    getHotList() {
      fetch(`/dhr/client/article/list`, this.params()).then(res => {
        if (res.ErrCode == "0000") {
          this.count = res.Result.count;
          this.hot_data = res.Result.data;
          console.log(this.hot_data);
          this.type_list[this.kind].data = res.Result.data;
          this.type_list[this.kind].count = res.Result.count;
          this.pageLoading = false;
        }
      });
    },
    get24NewsList() {
      fetch(`/dhr/client/article/list`, {
        page: 1,
        limit: 10,
        checkState: 1,
        showCityNum:this.showCityNum
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.newsList = res.Result.data;
          console.log(this.newsList);
        }
      });
    },
    params() {
      let params = {
        page: this.type_list[this.kind]['page'],
        limit: this.limit,
        checkState: 1,
        by: "index_1",
        showCityNum:this.showCityNum
      };
      // if (this.index == 0) {
      //   params = Object.assign(params, { by: "createdAt" });
      // } else {
      //   params = Object.assign(params, { cate: this.index });
      // }

      params = Object.assign(params, { cate: this.index });

      return params;
    },
    getActive(i, type) {
      this.page = 1;
      this.s_change = 1;
      console.log('s_change:::::',this.s_change)
      this.index = i + 1;
      this.kind = type;
      if (this.type_list[this.kind].data.length > 0) return;
      this.getHotList();
    },
    _ymdFormat(t) {
      return ymdFormat(t);
    }
  },
  created() {
    this.getHotList();
    this.get24NewsList();
  },
  components: {
    Bread,
    // Swiper,
    SmallNav,
    infoMation,
    GreyStripe,
    Pagination,
    slide
  }
};
</script>
<style lang="scss" scoped>
.hot_container {
  .hot_wrapper {
    .hot_box {
      display: flex;
      .hot_left {
        width: 840px;
        .hot_ds {
          margin-top: 20px;
          display: flex;
          .hot_it {
            margin-right: 15px;
            position: relative;
            .box {
              width: 270px;
              height: 180px;
              img {
              }
            }
            &:last-child {
              margin-right: 0;
            }
            img {
              display: block;
            }
            p {
              font-size: 16px;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 36px;
              padding: 6px;
              color: #fff;
              background-color: rgba(0, 0, 0, 0.4);
            }
          }
        }

        .classification {
          margin-top: 40px;
          .content {
            margin-top: 17px;
            .loading2_wrap {
              position: absolute;
              width: 100px;
              left: 50%;
              top: 20px;
              margin-left: -50px;
            }

            ul {
              li {
                // display: none;
                &.active {
                  display: block;
                }
              }
            }
            .loading2 {
              overflow: hidden;
            }
            .loading {
              padding-bottom: 50px;

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

            .page {
              padding-top: 20px;
              display: flex;
              justify-content: flex-end;
            }
          }
        }
      }

      .hot_right {
        margin-left: 62px;
        h3 {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
