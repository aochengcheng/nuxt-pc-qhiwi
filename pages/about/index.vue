<template>
  <div class="about">
    <div class="navBanner">
      <div class="centerWrap">
        <h3>去海外就上去海外网</h3>
        <p>Improve people’s experiences of cross-border services</p>
        <div class="play">
          <img src="../../static/images/about/play.png" @click="play" />
          <!-- <div class="my_video" v-show="showv">
           
          </div>-->
        </div>
      </div>
    </div>

    <div class="my_video" v-show="showv">
      <video-player
        v-show="showv"
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @fullscreenchange="onPlayerFullScreenchange($event)"
      ></video-player>
    </div>

    <div class="mask" ref="mask" @click="close"></div>
    <nav>
      <div class="centerTx clearFix">
        <div class="ml active">
          <button :class="['a_btn',{'active':en_ch}]" @click="englishChinese">关于我们</button>
        </div>
        <div class="mr">
          <button :class="['a_btn',{'active':!en_ch}]" @click="englishChinese">About Us</button>
        </div>
      </div>
    </nav>

    <!-- chinese -->
    <no-ssr>
      <div :class="['chinese',{'en': !en_ch}]">
        <div class="a_hiwi">
          <div class="hiwi_wrap clearFix">
            <div class="c">
              <h3>关于去海外</h3>
              <p
                class="hiwi_p1"
              >去海外Qhiwi隶属于北京去海外科技有限公司。去海外Qhiwi是领先的全球跨境服务搜索平台。帮助用户匹配优质的海外置业、移民、留学、游学、医疗、婚礼、创投等服务。去海外Qhiwi在B端为行业商户提供在线技术营销解决方案，研发行业首款SaaS平台去海外Pro，助力行业商户共赢中国市场。</p>

              <h2>我们的使命</h2>
              <p class="hiwi_p2">改善人们去海外的体验</p>
            </div>

            <div class="en">
              <h3>About Qhiwi</h3>
              <p
                class="hiwi_p1"
              >Qhiwi.com belongs to Beijing Qhiwi Technology Ltd. It’s a leading global cross-border services search platform that helps users match service providers in terms of overseas property, immigration, studying abroad, study tour, overseas healthcare, overseas wedding and venture capital investment. Qhiwi provides online marketing solutions and the industry’s first SaaS platform to enterprise customers and helps corporations compete well in the Chinese market.</p>

              <h2>Our Mission</h2>
              <p class="hiwi_p2">Improve people’s experiences of cross-border services</p>
            </div>
          </div>
        </div>

        <div class="a_pro">
          <div class="a_pro_ch" v-if="en_ch">
            <div class="a_pro_t">
              <h3>我们的产品</h3>
              <p>覆盖产业链，一站式营销管理</p>
            </div>
            <div class="a_pro_b clearFix">
              <div class="pro_apps">
                <div class="imgs">
                  <img src="../../static/images/about/l2.png" alt />
                </div>
                <div class="f_left">
                  <h3>去海外Pro</h3>
                  <p>商户端SaaS</p>
                </div>
              </div>
              <div class="pro_apps">
                <div class="imgs">
                  <img src="../../static/images/about/l3.png" alt />
                </div>
                <div class="f_left">
                  <h3>去海外网</h3>
                  <p>WEB/小程序/APP</p>
                </div>
              </div>
              <div class="pro_apps">
                <div class="imgs">
                  <img src="../../static/images/about/l1.png" alt />
                </div>
                <div class="f_left">
                  <h3>移动顾问APP</h3>
                  <p>销售及分销管理</p>
                </div>
              </div>
            </div>
          </div>

          <div class="a_pro_en" v-if="!en_ch">
            <div class="a_pro_t">
              <h3>Our Products</h3>
              <p>One-stop Marketing Managemen</p>
            </div>
            <div class="a_pro_b clearFix">
              <div class="pro_apps">
                <div class="imgs">
                  <img src="../../static/images/about/l2.png" alt />
                </div>
                <div class="f_left">
                  <h3>Qhiwi Pro</h3>
                  <p>SaaS platform</p>
                </div>
              </div>
              <div class="pro_apps">
                <div class="imgs">
                  <img src="../../static/images/about/l3.png" alt />
                </div>
                <div class="f_left">
                  <h3>Qhiwi.com</h3>
                  <p>web/mini-programs/App</p>
                </div>
              </div>
              <div class="pro_apps">
                <div class="imgs">
                  <img src="../../static/images/about/l1.png" alt />
                </div>
                <div class="f_left">
                  <h3>Mobile Agents</h3>
                  <p>Sales/distribution management</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="huoban">
          <div class="h_wrap" v-if="en_ch">
            <h3>合作伙伴</h3>
            <p>去海外Qhiwi为合作商户提供产业链一站式营销管理平台，实现产品管理、销售管理、分销管理、客户管理。去海外Qhiwi团队有每年数千万的海外行业精准营销投放经验，帮助合作方快速建立线上营销渠道，低成本获客，快速实现成交转化。加入去海外Qhiwi共享百万用户资源，成为用户信赖的品牌。</p>

            <div class="imgs clearFix">
              <div>
                <!-- <img src="../../static/images/about/laj.png" alt=""> -->
              </div>
              <div>
                <!-- <img src="../../static/images/about/laj1.png" alt=""> -->
              </div>
              <div>
                <!-- <img src="../../static/images/about/laj6.png" alt=""> -->
              </div>
              <div>
                <!-- <img src="../../static/images/about/laj3.png" alt=""> -->
              </div>
              <div>
                <!-- <img src="../../static/images/about/laj4.png" alt=""> -->
              </div>
              <div>
                <!-- <img src="../../static/images/about/laj5.png" alt=""> -->
              </div>
            </div>
          </div>
          <div class="h_wrap" v-if="!en_ch">
            <h3>Partners</h3>
            <p>Qhiwi provides a one-stop marketing management platform that covers all parties in the industrial chain to our business partners, helps them realize product management, sales management, distribution management and customer management.</p>

            <div class="imgs clearFix">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>

        <!-- 媒体报道 -->
        <div class="media">
          <div class="s_wrap">
            <h1 v-if="en_ch">媒体报道</h1>
            <h1 v-if="!en_ch">Media Reports</h1>
            <div class="my_swip">
              <swiper :options="swiperOption">
                <!-- <div class="imgbox"> -->

                <swiper-slide v-for="(item,i) in aboutUs" :key="i">
                  <div class="ban_items clearFix">
                    <div class="bimg">
                      <img v-lazy="item.img" />
                    </div>
                    <div class="btxt">
                      <h4>{{item.title}}</h4>
                      <p>{{item.describe}}</p>

                      <div class="bo clearFix">
                        <span>{{_UTCTimeForMat(item.createdAt)}}</span>
                        <i>
                          <a :href="item.url" target="_blank">阅读全文</a>
                        </i>
                      </div>
                    </div>
                  </div>
                </swiper-slide>

                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
                <!-- </div> -->

                <!-- <div class="centered" style="position:relative"> -->

                <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>

                <!-- </div> -->
              </swiper>
            </div>
          </div>
        </div>

        <!-- 联系我们 -->
        <div class="us">
          <div class="us_wrap">
            <h1 v-if="en_ch">联系我们</h1>
            <h1 v-if="!en_ch">Contact us</h1>
            <div class="us_content clearFix">
              <div class="items">
                <div></div>
                <p class="costom">reneezeng@qhiwi.com</p>
                <p>Email</p>
              </div>

              <div class="items">
                <div></div>
                <p class="costom">400-877-1008</p>
                <p>Phone</p>
              </div>

              <div class="items">
                <div></div>
                <p class="costom">北京、上海、深圳</p>
                <p>Address</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>
<script>
import { setCountryMode } from "~/utils/mixins";
import { UTCTimeForMat } from "~/utils/timeFormat";
import { fetch } from "~/plugins/axios/http.js";
export default {
  mixins: [setCountryMode],
  async asyncData(ctx) {
    const { Result: aboutUs } = await fetch(
      "/dhr/m/advertise/about/us?showCityNum=3"
    );
    return {
      aboutUs
    };
  },
  head() {
    return {
      title: "去海外网简介_去海外就上去海外网【去海外网】",
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: "去海外网简介_去海外就上去海外网【去海外网】"
        },
        {
          hid: "description",
          name: "description",
          content: "去海外网简介_去海外就上去海外网【去海外网】"
        }
      ]
    };
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: require("../../static/video/qhiwi_video.mp4") //url地址
            // src: 'http://www.html5videoplayer.net/videos/madagascar3.mp4'//url地址
            // src: "" //url地址
          }
        ],
        poster: require("../../static/images/about/banner.png"), //你的封面地址
        width: process.browser ? document.documentElement.clientWidth : 0,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`;
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      showv: false,

      en_ch: true
    };
  },
  methods: {
    englishChinese() {
      this.en_ch = !this.en_ch;
    },

    close(e) {
      this.$refs.mask.style.display = "none";
      this.showv = !this.showv;
      this.$refs.videoPlayer.player.pause();
      this.$refs.videoPlayer.player.currentTime(0);
    },
    play() {
      this.$refs.mask.style.display = "block";
      this.showv = !this.showv;
      console.log(this.$refs.videoPlayer.player);
      this.$refs.videoPlayer.player.play();
      // this.$refs.videoPlayer.player.Fullscreen()
    },
    onPlayerFullScreenchange(player) {
      player.exitFullscreen(); //强制退出全屏，恢复正常大小
      // this.videoDialogVisible = true;
    },
    _UTCTimeForMat(t) {
      return UTCTimeForMat(t);
    }
  }
};
</script>


<style>
.about .swiper-button-prev,
.about .swiper-button-next {
  width: 60px;
  height: 60px;
  background-image: url("../../static/images/about/LeftArrow.png");
  background-size: 60px;
  margin-top: -79px;
}
.about .swiper-button-next {
  background-image: url("../../static/images/about/RightArrow.png");
}

.about .swiper-container {
  height: 100%;
}

.about .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
  width: 14px;
  height: 14px;
  position: relative;
  top: 3px;
}
.swiper-pagination-bullet-custom {
  width: 8px;
  height: 8px;
}
</style>

<style scoped lang="scss">
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: none;
}
.my_video {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  width: 1000px;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -500px;
  z-index: 999;
}
.about {
  h3 {
    font-weight: normal;
  }
  .navBanner {
    height: 450px;
    position: relative;
    background: url("../../static/images/about/banner.png") no-repeat center;
    position: relative;
    .centerWrap {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h3 {
        font-size: 44px;
        color: #fff;
        font-weight: normal;
      }
      p {
        font-size: 16px;
        margin-top: 33px;
        color: #fff;
      }
      .play {
        width: 55px;
        height: 55px;
        margin: 68px auto 0;

        img {
        }
      }
    }
  }
  nav {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid #e0e2e5;
    .centerTx {
      font-size: 16px;
      color: #9ba1ac;
      // margin: 0 auto;
      display: inline-block;
      // width: 200px;
      .a_btn {
        font-size: 16px;
        outline: none;
        border: none;
        background-color: transparent;
        height: 60px;
        line-height: 60px;
        position: relative;
        cursor: pointer;
        &.active {
          color: red;
          &::after {
            position: absolute;
            content: "";
            height: 2px;
            width: 100%;
            background-color: #ed2530;
            bottom: 0;
            left: 0;
          }
        }
      }

      div {
        float: left;
        cursor: pointer;
        position: relative;
      }
      .ml {
      }
      .mr {
        margin-left: 80px;
      }
    }
  }

  .chinese {
    .a_hiwi {
      padding-top: 100px;
      background-color: #fff;
      .hiwi_wrap {
        width: 754px;
        margin: 0 auto;
        text-align: center;
        position: relative;
        overflow: hidden;
        padding-bottom: 100px;
        .en {
          position: absolute;
          top: 0;
          left: 100%;
          width: 100%;
        }
        h3 {
          font-weight: normal;
          font-size: 44px;
        }
        h2 {
          font-weight: normal;
          font-size: 24px;
          margin-top: 100px;
        }
        .hiwi_p1 {
          margin-top: 80px;
          font-size: 16px;
          color: #9399a5;
          line-height: 26px;
        }
        .hiwi_p2 {
          margin-top: 40px;
          font-size: 16px;
        }
      }
    }
    .a_pro {
      padding: 100px 0;
      text-align: center;
      background-color: #fafafa;
      .a_pro_t {
        text-align: center;
        h3 {
          font-size: 44px;
        }
        p {
          font-size: 14px;
          margin-top: 20px;
        }
      }
      .a_pro_b {
        margin-top: 120px;
        display: inline-block;
        text-align: left;
        .pro_apps {
          float: left;
          margin-right: 220px;
          &:last-child {
            margin-right: 0;
          }
          .imgs {
            width: 80px;
            height: 80px;
            float: left;
            margin-right: 15px;
            img {
            }
          }
          h3 {
            font-size: 18px;
            margin-top: 12px;
          }
          p {
            font-size: 16px;
            color: #9399a5;
            margin-top: 12px;
          }
        }
      }
    }
    .huoban {
      width: 754px;
      margin: 0 auto;
      background-color: #fff;
      text-align: center;
      padding: 90px 0 100px;
      .h_wrap {
        h3 {
          color: #ed2530;
          font-size: 44px;
        }
        p {
          color: #9399a5;
          font-size: 16px;
          line-height: 26px;
          padding-top: 30px;
        }
        .imgs {
          padding-top: 80px;
          div {
            width: 214px;
            height: 76px;
            float: left;

            margin-right: 40px;
            text-align: center;
            &:nth-child(1) {
              background: url("../../static/images/about/laj.png") no-repeat
                center;
            }
            &:nth-child(2) {
              background: url("../../static/images/about/laj1.png") no-repeat
                center;
            }
            &:nth-child(3) {
              background: url("../../static/images/about/laj3.png") no-repeat
                center;
            }
            &:nth-child(4) {
              background: url("../../static/images/about/laj4.png") no-repeat
                center;
            }
            &:nth-child(5) {
              background: url("../../static/images/about/laj5.png") no-repeat
                center;
            }
            &:nth-child(6) {
              background: url("../../static/images/about/laj6.png") no-repeat
                center;
            }
            &:nth-child(3n) {
              margin-right: 0;
            }
            &:nth-child(-n + 3) {
              margin-bottom: 40px;
            }
            img {
              display: inline-block;
              width: auto;
              height: auto;
            }
          }
        }
      }
    }
    .media {
      background-color: #fafafa;
      padding: 100px 0 30px;
      .s_wrap {
        width: 1100px;

        margin: 0 auto;
        h1 {
          font-size: 44px;
          font-weight: normal;
          text-align: center;
          margin-bottom: 44px;
        }

        .my_swip {
          height: 366px;
        }

        .ban_items {
          padding: 27px 31px 26px 20px;
          width: 867px;
          background-color: #fff;
          margin: 0 auto;
          .bimg {
            float: left;
            width: 261px;
            height: 244px;
          }
          .btxt {
            float: left;
            width: 546px;
            padding-left: 37px;
            h4 {
              font-size: 18px;
              line-height: 25px;
              padding-top: 10px;
            }
            p {
              font-size: 14px;
              color: #9399a5;
              line-height: 20px;
              padding-top: 23px;
              height: 173px;
            }
            .bo {
              font-size: 14px;
              height: 34px;
              line-height: 34px;
              // margin-top: 74px;
              span {
                color: #9399a5;
                float: left;
              }
              i {
                float: right;
                width: 98px;
                height: 34px;
                border: 1px solid #ed2530;
                text-align: center;
                a {
                  color: #ed2530;
                }
              }
            }
          }
        }
      }
    }

    .us {
      background-color: #fff;
      padding: 100px;
      .us_wrap {
        width: 1080px;
        margin: 0 auto;
        h1 {
          font-size: 44px;
          font-weight: normal;
          text-align: center;
        }
        .us_content {
          padding-top: 90px;
          .items {
            width: 360px;
            float: left;
            text-align: center;
            div {
              width: 40px;
              height: 40px;
              background: url("../../static/images/about/Email_Icon.png")
                no-repeat center;
              margin: 0 auto;
            }
            p {
              font-size: 14px;
              color: #bfc4ce;
              margin-top: 5px;
            }
            .costom {
              color: #ed2530;
              font-size: 18px;
              margin-top: 10px;
            }
            &:nth-child(2) {
              div {
                background: url("../../static/images/about/Phone_Icon.png")
                  no-repeat center;
              }
            }
            &:nth-child(2) {
              div {
                background: url("../../static/images/about/Address_Icon.png")
                  no-repeat center;
              }
            }
          }
        }
      }
    }
  }

  .chinese.en {
    .c {
      position: relative;
      //   left: -100%;
      opacity: 0;
      transition: all 0.3s;
    }
    .en {
      left: 0 !important;
      transition: all 0.3s ease;
      transition-delay: 0.2s;
    }
  }
  .chinese {
    .c {
      opacity: 1;
      transition-delay: 0.3s;
      transition: all 0.5s ease-out;
    }
    .en {
      left: 100% !important;
      transition: all 0.4s ease;
    }
  }
}
</style>
