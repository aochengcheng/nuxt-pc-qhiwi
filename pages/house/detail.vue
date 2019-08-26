<template>
  <div class="container">
    <div class="Greyback" id="dong">
      <div class="centered">
        <!-- style="color:#9497a0" -->
        <Breadcrumb :type="type"></Breadcrumb>

        <div class="Bannerdiv">
          <h1>{{ house_detail.title }}</h1>
          <houseSwipe :id="$route.query.id"></houseSwipe>
        </div>
        <div class="housediv">
          <div class="housedivli clearFix">
            <div class="divtop"></div>
            <div class="divd">
              <span class="span1">￥</span>
              <span class="span2">{{ house_detail.price }}</span>
              <span class="span1">万</span>
              <p class="span3">总价</p>
            </div>
            <div class="divd">
              <span class="span2">{{ house_detail.downPay }}</span>
              <span class="span1">%</span>
              <p>首付</p>
            </div>
            <div class="divd">
              <span class="span2">{{ house_detail.returnRate }}</span>
              <span class="span1">%</span>
              <p>回报率</p>
            </div>
          </div>
          <div class="Discount">
            <span>优惠折扣</span>
            <p>{{ house_detail.discount }}</p>
          </div>
          <div style="clear: both"></div>
          <div class="housestrip1">
            <span>代理商：</span>
            <span style="color: #ED2530">{{ house_detail.merchant.simpleName }}</span>
          </div>

          <div style="clear: both"></div>
          <hr style="height:1px;border:none;border-top:1px dashed #e4e4e4;" />
          <div class="housestrip">
            <span>项目面积：</span>
            <span>{{ house_detail.minArea}}~{{ house_detail.maxArea }}㎡</span>
          </div>
          <div class="housestrip">
            <span>产权年限：</span>
            <span>{{ house_detail.propertyRightYears }}</span>
          </div>

          <div class="housestrip">
            <span>物业类型：</span>
            <span>{{ houstType(house_detail.hoseType) }}</span>
          </div>
          <!-- <div class="housestrip">
            <span>能否贷款：</span>
            <span>能</span>
          </div>-->
          <div class="housestrip">
            <span>交房标准：</span>
            <span>{{ deliverCriterion(house_detail.deliverCriterion) }}</span>
          </div>
          <div class="housestrip">
            <span>交房时间：</span>
            <span>{{ house_detail.deliveryTime }}</span>
          </div>
          <div class="housestrip" v-if="house_detail.optionalRoomType">
            <span>可选户型：</span>
            <span
              v-for="(item,i) in useHx(house_detail.optionalRoomType)"
              :key="i"
            >{{ item + '&nbsp;&nbsp;' }}</span>
          </div>
          <div style="clear: both"></div>
          <hr style="height:1px;border:none;border-top:1px dashed #e4e4e4;" />
          <div class="housedizi clearFix">
            <div class="f_left">
              <!-- <span>所在地区：</span> -->
              <span
                class="text_one"
              >{{ house_detail.belongCountryName +'·'+ house_detail.belongCityName }}</span>
            </div>
          </div>
          <div class="housestripimg">
            <Sign
              :head_img="house_detail.merchant.headPortrait"
              :simpleName="house_detail.merchant.simpleName"
              :hot="house_detail.hot"
              :id="house_detail.merchant.id"
            ></Sign>
          </div>
          <div class="housestripimg phoneand" style="margin-left=25px">
            <!-- <Qqtel :phone="house_detail.merchant.phone" red="#ED2530"></Qqtel> -->
            <div class="zixun one f_left" @click="jumpDetails();clickRate()">咨询Ta</div>
            <div
              class="zixun getPhone f_left"
              @click="clickPhone();clickRate()"
              ref="getPhone"
            >获取电话号码</div>
          </div>
        </div>
      </div>
    </div>

    <div class="smalltitl" ref="navBox">
      <div class="centered clearFix">
        <div class="smallnavdiv">
          <SmallNav :list="list" :active="active" @getActive="getActive"></SmallNav>
        </div>

        <div class="div400" v-show="showPhone" @click="clickThePhone">
          <div>
            <div class="imgs">
              <span ref="phone">点击查看电话</span>
            </div>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <Greystripe></Greystripe>
    </div>

    <!-- main部分  -->
    <main class="main centered clearFix" ref="main">
      <div class="leftdiv">
        <section class="pro_items" ref="pro_items">
          <p class="titleP" id="a1">项目介绍</p>
          <p class="centerP" v-html="house_detail.content"></p>
        </section>
        <section class="pro_items" ref="pro_items">
          <p class="titleP" id="a3">周边设施</p>
          <div class="centerT" v-if="peripheral&&peripheral.education">
            <img src="~static/images/haiwaiHouse/School.png" />
            {{peripheral.education.name}} EDUCATION
          </div>
          <p
            class="centerP"
            v-if="peripheral&&peripheral.education"
            v-html="peripheral.education.content"
          ></p>

          <div class="centerT" v-if="peripheral&&peripheral.shopping">
            <img src="~static/images/haiwaiHouse/School.png" />
            {{peripheral.shopping.name}} SHOPPING
          </div>
          <p
            class="centerP"
            v-if="peripheral&&peripheral.shopping"
            v-html="peripheral.shopping.content"
          ></p>

          <div class="centerT" v-if="peripheral&&peripheral.leisuretime">
            <img src="~static/images/haiwaiHouse/School.png" />
            {{peripheral.leisuretime.name}} SHOPPING
          </div>
          <p
            class="centerP"
            v-if="peripheral&&peripheral.leisuretime"
            v-html="peripheral.leisuretime.content"
          ></p>

          <div class="centerT" v-if="peripheral&&peripheral.hospital">
            <img src="~static/images/haiwaiHouse/School.png" />
            {{peripheral.hospital.name}} SHOPPING
          </div>
          <p
            class="centerP"
            v-if="peripheral&&peripheral.hospital"
            v-html="peripheral.hospital.content"
          ></p>

          <div class="centerT" v-if="peripheral&&peripheral.traffic">
            <img src="~static/images/haiwaiHouse/School.png" />
            {{peripheral.traffic.name}} SHOPPING
          </div>
          <p
            class="centerP"
            v-if="peripheral&&peripheral.traffic"
            v-html="peripheral.traffic.content"
          ></p>
        </section>

        <section class="pro_items" ref="pro_items">
          <p class="titleP" id="a4">物业配套</p>
          <div class="PropertyMatching">
            <img src="~static/images/haiwaiHouse/AirConditioner.png" />
            <span class="MatTitl">空调设施</span>
            <span class="MatTcent">
              <i
                class="gouclass"
                v-if="property.airConditioning&&property.airConditioning.SplitType"
              >√</i>
              分体式空调
            </span>
          </div>
          <div class="PropertyMatching">
            <img src="~static/images/haiwaiHouse/Kitchen.png" />
            <span class="MatTitl">厨房配置</span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.Cupboard">√</i>
              橱柜
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.Refrigerator">√</i>
              冰箱
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.Washingmachine">√</i>
              洗衣机
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.MicrowaveOven">√</i>微波炉
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.Oven.Washingmachine">√</i>
              烤箱
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.Dishwasher">√</i>洗碗机
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.kitchen&&property.kitchen.Heater">√</i>
              热水器
            </span>
          </div>
          <div class="PropertyMatching">
            <img src="~static/images/haiwaiHouse/bathroom.png" />
            <span class="MatTitl">卫浴配置</span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.bathroom&&property.bathroom.shower">√</i>
              淋浴
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.bathroom&&property.bathroom.Bathtub">√</i>
              浴缸
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.bathroom&&property.bathroom.Pedestalpan">√</i>
              坐便器
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.bathroom&&property.bathroom.Basin">√</i>
              台盆
            </span>
          </div>
          <div class="PropertyMatching">
            <img src="~static/images/haiwaiHouse/ParkingLot.png" />
            <span class="MatTitl">停 车 场</span>

            <span class="MatTcent">
              <i class="gouclass" v-show="property.yard&&property.yard.Singlegarage">√</i>
              双车库
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-show="property.yard&&property.yard.Doublegarage">√</i>
              单车库
            </span>
          </div>
          <div class="PropertyMatching">
            <img src="~static/images/haiwaiHouse/Garden.png" />
            <span class="MatTitl">花园配置</span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.Garden&&property.Garden.PrivateCourtyard">√</i>
              私人庭院
            </span>

            <span class="MatTcent">
              <i class="gouclass" v-if="property.Garden&&property.Garden.SwimmingPool">√</i>游泳池
            </span>
          </div>
        </section>
      </div>
      <div class="rightdiv">
        <SideRight sTitle="房产头条" :hot_data="modelHot" modelName="house"></SideRight>
      </div>
    </main>
    <div class="th_like centered">
      <h1>猜你喜欢</h1>
      <div class="flex like_wrap">
        <Picbox v-for="(item, index) in like" :key="index" :house_data="item">
          <Price slot="house_price" :price="item.price" :fontSize="22"></Price>
        </Picbox>
      </div>
    </div>

    <div v-if="showt">
      <Consultation
        @closeMain="closeMain"
        :typeOf="1"
        :showCity="house_detail.showCity"
        :sourceDescription="'null'"
        :sourceTitle="house_detail.title"
        :merchant_id="house_detail.merchant.id"
      ></Consultation>
    </div>
  </div>
</template>

<script>
// import Swiper from "~/components/haiwaiHouse/swiper";
import SmallNav from "~/components/small_nav";
import Project from "~/components/Project-title-left";
import Picture from "~/components/Picture";
import Sign from "~/components/sign";
import Qqtel from "~/components/QQtel";
import Consultation from "~/components/consultation";
import SideRight from "~/components/side_right";
import Greystripe from "~/components/Grey-stripe";
import Breadcrumb from "~/components/Breadcrumb";
// import HaiWaiFootPic from "~/model/foot_pic/foot_pic";
import Picbox from "~/components/Picbox";
import Price from "~/components/Price";
import houseSwipe from "~/components/houseSwiper";
import { SEOConfig } from "~/utils/config";
import { fetch } from "~/plugins/axios/http.js";
import { fixedNav, getModelHot, clickRate, phone } from "~/utils/mixins";
export default {
  mixins: [fixedNav, getModelHot, clickRate, phone],

  async asyncData(ctx) {
    const { ErrCode, Result: house_detail } = await fetch(
      "/dhr/client/house/" + ctx.query.id
    );

    const { Result: res } = await fetch(`/dhr/client/house/list`, {
      limit: 4,
      page: 1
    });

    console.log("data:::::::", res);

    if (ErrCode == "0000") {
      console.log("house_detail::::::", house_detail);
    }

    let property = JSON.parse(house_detail.property);
    let peripheral;
    if (house_detail.peripheral) {
      peripheral = JSON.parse(house_detail.peripheral);
      console.log("peripheral：：：", peripheral);
    }

    return {
      merchant_id: house_detail.merchant_id,
      peripheral,
      property,
      like: res.data,
      house_detail,
      type: [
        {
          title: "海外房产",
          path: "/house"
        },
        {
          title: house_detail.title,
          path: ""
        }
      ]
    };
  },
  data() {
    return {
      showt: false,
      active: 0,
      list: [
        {
          tit: "项目介绍"
        },
        {
          tit: "周边设施"
        },
        {
          tit: "物业配套"
        }
      ],
      top: 860, // 屏幕距离上面的距离
      paddingTop: 100,
      // type: [
      //   {
      //     title: "海外房产",
      //     path: "/house"
      //   },
      //   {
      //     title: "",
      //     path: ""
      //   }
      // ],
      // href: location.href,

      house_detail: {
        merchant: {
          simpleName: ""
        }
      },
      banner_img: [],

      // 热门cate
      cate: 1,
      //  bar到达顶部出现showPhone
      showPhone: false,

      // 猜你喜欢
      like: []
    };
  },
  // id变化刷新页面
  watchQuery: ["id"],
  head() {
    return {
      title:
        this.house_detail.title &&
        this.house_detail.title +
          "-" +
          this.house_detail.merchant.simpleName +
          "-去海外网",
      meta: [
        {
          hid: "keyword",
          name: "keywords",
          content: SEOConfig.house.keywords
        },
        {
          hid: "description",
          name: "description",
          content: SEOConfig.house.description
        }
      ]
    };
  },

  components: {
    Project,
    Picture,
    Sign,
    Qqtel,
    SmallNav,
    Greystripe,
    SideRight,
    Breadcrumb,

    Consultation,
    Picbox,
    Price,
    houseSwipe
  },
  mounted() {
    //  this.$refs.mask.style.height = document.getElementById('app').clientHeight + 'px'
    window.addEventListener("scroll", this.handleScroll); // 监听（绑定）滚轮滚动事件
  },
  computed: {
    proitems() {
      return this.$refs;
    }
  },

  methods: {
    // 猜你喜欢
    you_like() {
      fetch(`/dhr/client/house/list`, {
        limit: 4,
        page: 1
      }).then(res => {
        if (res.ErrCode == "0000") {
          this.like = res.Result.data;
          console.log(this.like);
        }
      });
    },
    clickPhone() {
      let phone = this.$refs.getPhone;
      console.log(phone);
      phone.innerHTML = this.house_detail.merchant.xuNiPhone || this.phone;
    },
    clickThePhone() {
      let phone = this.$refs.phone;
      phone.innerHTML = this.house_detail.merchant.xuNiPhone || this.phone;
    },
    // 房产类型
    houstType(type) {
      switch (type) {
        case 1:
          return "独栋别墅";
        case 2:
          return "联排别墅";
        case 3:
          return "精品住宅";
        case 4:
          return "酒店公寓";
        case 5:
          return "商铺";
        case 6:
          return "庄园";
        case 7:
          return "土地";
        case 8:
          return "商业地产";
        case 9:
          return "其他";
      }
    },
    // 交房标准
    deliverCriterion(data) {
      switch (data) {
        case 1:
          return "精装交付";
        case 0:
          return "其他";
      }
    },
    // 可选户型
    useHx(data) {
      const type = ["一室", "二室", "三室", "四室", "四室以上"];

      if (data) {
        var newData = data.split(",");
      }
      // console.log(newData);
      let showD = [];
      let map = newData.map((val, index) => {
        let number = Number(val);
        if (number) {
          showD.unshift(type[index]);
        }
      });
      return showD;
    },
    // 获取详情数据
    getDetailData() {
      const { id } = this.$route.query;
      fetch(`/dhr/client/house/${id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.house_detail = res.Result;
          this.merchant_id = res.Result.merchant_id;
          console.log(this.house_detail);
          // this.type[1].title = this.house_detail.title;

          this.property = JSON.parse(res.Result.property);
          if (res.Result.peripheral) {
            this.peripheral = JSON.parse(res.Result.peripheral);
            console.log("this.peripheral：：：", this.peripheral);
          }
        }
      });
    },
    jumpDetails() {
      this.showt = true;
      console.log(this.showt);
    },
    closeMain(val) {
      this.showt = val;
    }
  },

  created() {
    // this.you_like();
    // this.getDetailData();
  }
};
</script>

<style lang="scss">
.container {
  .el-breadcrumb__inner.is-link {
    color: #606266;
  }
}
</style>


<style lang="scss" scoped>
.el-breadcrumb__inner.is-link,
.el-breadcrumb__inner a {
  color: red !important;
}
#consultation {
  display: none;
}
.site_nav_bar {
  height: 40px;
  background-color: #f6f6f6;
  border-bottom: 1px solid #e4e4e4;

  .site_nav_bar_box {
    .site_nav_bar_right {
      display: flex;
      .sh {
        line-height: 40px;
        margin-right: 15px;
      }

      .user {
        margin-left: 15px;
        padding-top: 9px;
      }
    }
  }
}
// header
.header {
  height: 80px;
}
// banner
#colorid {
  margin-top: 1px;
  height: 40px;
  line-height: 40px;
  background: #666;
  color: #fff !important;
}
.Bannerdiv {
  color: #fff;
  height: 547px;
  width: 670px;
  margin-right: 20px;
  float: left;
  h1 {
    height: 60px;
    line-height: 55px;
    font-size: 26px;
  }
}
.housediv {
  float: left;
  margin-top: 60px;
  margin-bottom: 29px;
  width: 510px;
  height: 547px;
  background: #fff;
  .housestrip1 {
    margin-left: 35px;
    width: 220px;
    float: left;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #9399a5;
  }
  .housestrip {
    font-size: 14px;
    margin-left: 35px;
    width: 220px;
    float: left;
    height: 36px;
    line-height: 36px;
    color: #9399a5;
  }
  .housestripimg {
    margin-left: 35px;
    // width: 220px;
    float: left;
    &.phoneand {
      margin-left: 25px;
      padding-top: 10px;
    }
  }
  .housedizi {
    color: #9399a5;
    font-size: 14px;
    margin-left: 35px;
    height: 74px;
    line-height: 74px;
    span {
      position: relative;
      padding-left: 20px;
      &::after {
        position: absolute;
        content: "";
        width: 14px;
        height: 14px;
        left: 0;
        top: 3px;
        background: url("../../static/images/location.png") no-repeat
          center/cover;
      }
    }
  }
  .zixun {
    position: relative;
    width: 157px;
    height: 34px;
    border: 1px solid #ed2530;
    padding: 13px 0;
    border-radius: 2px;
    line-height: 1;
    color: #ed2530;
    font-size: 14px;
    text-align: center;
    cursor: pointer;

    &.one {
      width: 86px;
      height: 44px;
      padding: 13px 0;
    }
    &::before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 5px;
      background: url("../../static/images/qq2.png") no-repeat center/cover;
    }
  }
  .getPhone {
    width: 158px;
    height: 44px;
    margin-left: 15px;
    text-align: center;
    background-color: #ed2530;
    color: #fff;
    &::before {
      background: url("../../static/images/haiwaiHouse/phone.png") no-repeat
        center/cover;
      // position: absolute;
      // left: 0;
      // top: 0;
    }
  }
  .Discount {
    padding-left: 35px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    position: initial;
    span {
      margin-top: 9px;
      width: 60px;
      height: 18px;
      line-height: 18px;
      background: rgba(237, 37, 48, 1);
      border-radius: 2px;
      float: left;
      text-align: center;
      display: block;
      color: #fff;
      margin-right: 4px;
      font-size: 12px;
    }
    p {
      color: #ed2530;
      font-size: 12px;
    }
  }
  .housedivli {
    width: 100%;
    .divtop {
      height: 8px;
      width: 100%;
      background: #ff8585;
    }
    .divd {
      margin-top: 40px;
      margin-bottom: 30px;
      width: 33.33%;
      float: left;
      text-align: center;
      .span1 {
        color: #ed2530;
        font-size: 14px;
      }
      .span2 {
        color: #ed2530;
        font-size: 30px;
        font-weight: bold;
      }
      .span3 {
        color: #0d1c31;
        font-size: 14px;
      }
    }
  }
}

// main
.main {
  margin-top: 0px;
  // transition: all .3s;
  // box-sizing: content-box;
  .leftdiv {
    width: 840px;
    float: left;
    .titleP {
      height: 64px;
      line-height: 64px;
      font-size: 22px;
      font-weight: bold;
      color: rgba(13, 28, 49, 1);
      border-bottom: 1px solid #e4e4e4;
      margin-bottom: 10px;
    }
    .centerT {
      height: 64px;
      line-height: 64px;
      img {
        margin-top: 15px;
        margin-right: 5px;
        height: 32px;
        width: 32px;
        float: left;
      }
      font-size: 16px;
      font-weight: bold;
      color: #0d1c31;
    }
    .centerP {
      margin-top: 10px;
      color: #0d1c31;
      font-size: 16px;
      line-height: 36px;
    }
    .divimg {
      margin: auto;
      margin-left: 70px;
      img: {
        width: 600px;
        height: 400px;
      }
    }
    .PropertyMatching {
      height: 64px;
      line-height: 64px;
      white-space: nowrap;
      img {
        margin-top: 15px;
        height: 32px;
        width: 32px;
        float: left;
      }
      .MatTitl {
        width: 110px;
        display: inline-block;
        padding-left: 30px;
        font-size: 16px;
        font-weight: 400;
        color: #0d1c31;
      }
      .gouclass {
        width: 20px;
        height: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #ed2530;
      }
      .MatTcent {
        padding-left: 20px;
        padding-right: 25px;
        position: relative;
        font-size: 16px;
        font-weight: 400;
        color: #9399a5;
        i {
          position: absolute;
          left: 0;
          top: -20px;
        }
      }
    }

    .divsx {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 40px;
      border: 1px solid #eee;
    }
  }

  .rightdiv {
    float: right;
  }
  .selection-condition {
    height: 50px;
    line-height: 50px;
    .selection {
      margin-left: 80px;
      text-align: left;
      float: left;
    }
  }
}
.smallnavdiv {
  width: 840px;
  padding-top: 16px;
  height: 80px;
  margin-right: 60px;
  float: left;
}
.div400 {
  float: left;
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
.Greyback {
  width: 100%;
  background: #333333;
  overflow: hidden;
  .smalltitl {
    width: 100%;
    height: 80px;
    line-height: 80px;
  }
}

.th_like {
  h1 {
    font-size: 36px;
    font-weight: normal;
  }
  .like_wrap {
    margin-top: 30px;
  }
}
</style>

