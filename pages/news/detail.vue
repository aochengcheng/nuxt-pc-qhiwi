<template>
  <div class="hot_details">
    <grey-stripe></grey-stripe>
    <div class="hot_details_wrapper centered">
      <div class="hot_wr">
        <Bread :type="type" />
        <div class="hot_txt_tit">
          <h3 v-if="content">{{ content.name }}</h3>
          <div class="release">
            <span v-if="content.merchant">{{ content.merchant.simpleName }}</span>
            发布于：{{ _UTCformat(content.createdAt) }}
          </div>
        </div>

        <div class="hot_content">
          <div class="first" v-html="content['content']">
            <p class="first_top"></p>
          </div>

          <div class="statement">本网声明：本站作品未经授权不得转载</div>

          <div class="hot_phone">
            <div class="btn" @click="clickThePhone">
              <i></i>
              <!-- <b v-if="content.merchant">{{ content.merchant.phone }}</b> -->
              <b ref="phone">免费电话</b>
            </div>
          </div>

          <div class="hot_f">
            <h3>您可能感兴趣的文章</h3>
            <div class="hot_f_w">
              <div class="hot_wrap" v-for="(item, i) in hot_data" :key="i">
                <nuxt-link :to="{path:'/news/detail',query:{id:item.id}}">
                  <div class="imgs">
                    <img v-lazy="item.coverImg" />
                  </div>
                  <p class="hover_underline">{{ item.name }}</p>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hot_r">
        <div class="hot_news">
          <div class="rad_img">
            <div class="img_b" v-if="content.merchant">
              <nuxt-link :to="{path:`/merchant`,query:{merchant_id:content.merchant.id}}">
                <img v-lazy="content.merchant.headPortrait" />
              </nuxt-link>
            </div>
            <h3 v-if="content.merchant">{{content.merchant.simpleName}}</h3>
          </div>

          <div class="hot_data">
            <div v-for="(item, i) in hot_data" :key="i" class="hot_data_items">
              <nuxt-link :to="{path:'/news/detail',query:{id:item.id}}">
                <p class="hot_data_c hover_underline">{{ item.name }}</p>
                <p class="hot_data_hour">{{ _getDateDiff(item.createdAt) }}</p>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="hot_info">
          <h3>相关文章</h3>
          <info-mation :news="hot_data"></info-mation>
        </div>
      </div>
    </div>
    <back-top />
  </div>
</template>
<script>
import GreyStripe from "~/components/Grey-stripe";
import Bread from "~/components/Breadcrumb";
import infoMation from "~/components/information";
import { UTCformat, getDateDiff } from "~/utils/UTCformat";
import { setCountryMode, phone } from "~/utils/mixins";
import { fetch } from "~/plugins/axios/http.js";
import backTop from "~/components/backtop.vue";
export default {
  mixins: [setCountryMode],
  watchQuery: ["id"],
  async asyncData(ctx) {
    const [contentAll, hotData] = await Promise.all([
      fetch("/dhr/client/article/" + ctx.query.id),
      fetch("/dhr/client/article/list", {
        page: 1,
        limit: 3,
        by: "createdAt"
      })
    ]);
    let content, hot_data;
    contentAll.ErrCode == "0000"
      ? (content = contentAll.Result)
      : (content = []);
    hotData.ErrCode == "0000"
      ? (hot_data = hotData.Result.data)
      : (hot_data = []);
    return {
      content,
      hot_data,
      type: [
        {
          title: "海外头条",
          path: `/news`
        },
        {
          title:  content.name,
          path: ""
        }
      ]
    };
  },
  head() {
    return {
      title:
        this.content.merchant &&
        this.content.name +
          "-" +
          this.content.merchant.simpleName +
          "-去海外网",
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: ""
        },
        {
          hid: "description",
          name: "description",
          content: ""
        }
      ],
      // script: [{ type: "application/ld+json" }]
    };
  },
  data() {
    return {
      phone: `400-877-1008`
    };
  },
  methods: {
    clickThePhone() {
      let phone = this.$refs.phone;
      phone.innerHTML = this.content.merchant.xuNiPhone || this.phone;
    },

    _UTCformat(t) {
      return UTCformat(t);
    },
    _getDateDiff(t) {
      return getDateDiff(t);
    }
  },

  components: {
    GreyStripe,
    Bread,
    infoMation,
    backTop
  }
};
</script>

<style>
.first {
  /* text-indent: 2em; */
  font-size: 16px !important;
  color: #0d1c31;
}
.first p {
  padding: 15px 0 !important;
}
.first p img {
  display: block;
  margin: 0 auto;
  /* width: 400px !important; */
  /* height: 266px !important; */
}
</style>

<style lang="scss" scoped>
.hot_details {
  .hot_details_wrapper {
    display: flex;
    .hot_wr {
      width: 840px;
      .hot_txt_tit {
        padding: 21px 0;
        border-bottom: 1px dashed #dcdcdc;
        h3 {
          font-size: 22px;
        }
        .release {
          margin-top: 20px;
          color: #95989f;
          span {
            color: #40b388;
            margin-right: 10px;
          }
        }
      }
      .hot_content {
        padding-top: 30px;

        .first {
          // text-indent: 2em;
          font-size: 16px !important;
          p {
            padding: 20px 0 !important;
          }
          img {
            width: 400px !important;
            height: 260px !important;
          }
          .first_top {
            font-size: 15px;
            line-height: 2;
          }
        }

        .statement {
          color: #9698a5;
          margin-top: 20px;
        }

        .hot_phone {
          height: 100px;
          padding: 30px 0;
          border-bottom: 1px solid #e4e4e4;
          .btn {
            cursor: pointer;
            width: 191px;
            height: 40px;
            margin: 0 auto;
            text-align: center;
            background-color: #ed2530;
            font-size: 14px;
            line-height: 40px;
            color: #fff;
            // text-align: center;
            position: relative;
            letter-spacing: 1px;
            i {
              position: absolute;
              display: inline-block;
              width: 24px;
              height: 24px;
              left: 9px;
              top: 8px;
              background: url("../../static/images/hot/phone.png") no-repeat;
            }
            b {
              padding-left: 10px;
            }
          }
        }

        .hot_f {
          margin-top: 51px;

          h3 {
            font-size: 22px;
          }
          .hot_f_w {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
          }
          .hot_wrap {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            .imgs {
              width: 270px;
              height: 180px;
            }
            img {
              display: block;
              width: 100%;
            }

            p {
              font-size: 17px;
              margin-top: 20px;
              width: 270px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
          }
        }
      }
    }

    .hot_r {
      margin-left: 60px;
      margin-top: 80px;
      width: 300px;
      .hot_news {
        width: 300px;
        height: 383px;
        border: 1px solid #e4e4e4;
        padding: 102px 14px 0;
        position: relative;
        .rad_img {
          position: absolute;
          // position: absolute;
          top: -52px;
          left: 30px;
          text-align: center;
          .img_b {
            cursor: pointer;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 1px 3px 5px #ccc;
            img {
              display: block;
            }
          }

          h3 {
            margin-top: 15px;
            font-size: 15px;
          }
        }

        .hot_data {
          padding: 5px 0 25px;
          border-top: 1px solid #f5f5f5;
          .hot_data_items {
            padding-top: 10px;
            font-size: 14px;
            &:first-child {
              padding-top: 0;
            }
          }
          .hot_data_c {
            line-height: 2;
          }

          .hot_data_hour {
            margin-top: 7px;
            color: #a0a9b2;
          }
        }
      }

      .hot_info {
        margin-top: 31px;
        h3 {
          font-size: 18px;
        }
      }
    }
  }
}
</style>
