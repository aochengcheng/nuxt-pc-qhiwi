<template>
  <div class="">
    <nuxt-link :to="{path:'/immig/detail',query:{id:immig_data.id}}">
      <div class="immig">
        <div class="immig_left">
          <pictrue-float :bgimg="bgimg" :title="title" :details="details"></pictrue-float>
        </div>

        <div class="immig_right">
          <h3>{{ immig_data.name }}</h3>
          <p class="combination">{{ immig_data.subtitle }}</p>

          <div class="service_charge clearFix">
            <div class="qd_zj f_left">
              总计动用资金：
              <i>约{{ immig_data.totalUseOfFunds }}</i>
            </div>

            <div class="f_right fuwu">
              <span>服务费</span>
              <Price :price="price"></Price>
              <i>万</i>
            </div>
          </div>

          <div class="handle">
            <div class="handle_pro">
              <p class="handle_date text_one">{{ immig_data.handlingCycle }}</p>
              <p class="handle_dd">办理周期</p>
            </div>
            <div class="handle_pro">
              <p class="handle_date text_one">{{ immig_data.identityType }}</p>
              <p class="handle_dd">身份类别</p>
            </div>
            <div class="handle_pro">
              <p
                class="handle_date text_one"
              >{{ immig_data.investmentQuota == '无' ?immig_data.investmentQuota: '￥'+immig_data.investmentQuota+'万' }}</p>
              <p class="handle_dd">投资额度</p>
            </div>
            <div class="handle_pro">
              <p class="handle_date text_one">{{ immig_data.demand }}</p>
              <p class="handle_dd">居住要求</p>
            </div>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import Price from "~/components/Price";
import PictrueFloat from "./Picture-float-title";
export default {
  props: ["immig_data"],
  data() {
    return {
      immig_country: []
    };
  },
  computed: {
    price() {
      return this.immig_data.referenceServiceFee || 0;
    },
    bgimg() {
      return this.immig_data.imgs || "";
    },
    title() {
      return this.immig_data.name || "";
    },
    details() {
      return this.immig_data.subtitle || "";
    }
  },
  components: {
    Price,
    PictrueFloat
  }
};
</script>
<style lang="scss" scoped>
.immig {
  width: 840px;
  height: 220px;
  display: flex;
  color: #919ba7;
  padding: 20px 0;
  box-sizing: content-box;
  border-bottom: 1px solid #e4e4e4;
  cursor: pointer;
  .immig_left {
    width: 380px;
    height: 220px;
    border-radius: 5px;
    overflow: hidden;
    img {
      display: block;
    }
  }

  .immig_right {
    padding: 10px 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h3 {
      font-size: 22px;
      color: #000;
    }

    .combination {
      // margin-top: 21px;
    }

    .service_charge {
      margin-top: 20px;
      .qd_zj {
        font-size: 14px;
        color: #9399a5;
        width: 255px;
        height: 40px;
        line-height: 40px;
        padding-left: 12px;
        background-color: #f8f8f8;
      }
      .fuwu {
        margin-top: -6px;
      }
      i {
        color: #ed2530;
      }
      span {
        margin-right: 3px;
      }
    }

    .handle {
      display: flex;
      justify-content: space-between;
      padding-top: 30px;
      padding-bottom: 6px;
      text-align: center;
      .handle_pro {
        // flex-basis: 25%;
        width: 85px;
        .handle_date {
          color: #31b385;
          margin-bottom: 10px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
