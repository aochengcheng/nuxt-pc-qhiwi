<template>
  <div class="immigration_agencies">
    <div class="agen_top">
      <div class="agen_top_l">
        <span>{{ title }}</span>
      </div>
      <div class="agen_top_r">
        <div class="agen_top_r_c" @click="$parent.referer">
          <i></i>
          <span @click="$parent.referer">换一换</span>
        </div>

        <div class="agen_top_r_b">
          <nuxt-link :to="{path:plannerPath}">
            <span>更多</span>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="agen_bottom">
      <div class="agen_bottom_box" v-for="(item,i) in mer_data" :key="i">
        <div class="img">
          <Sign
            :head_img="item.headPortrait"
            :simpleName="item.simpleName"
            :hot="item.actualNumber"
            :id="item.id"
            :type="type"
          ></Sign>
        </div>

        <div class="txt">
          <QQtel :phone="item.xuNiPhone||phone" :merchant_id="item.id"></QQtel>
        </div>
      </div>
    </div>

    <div v-if="showt">
      <Consultation
        @closeMain="closeMain"
        :typeOf="typeOf"
        :showCity="showCity"
        :sourceDescription="sourceDescription"
        :sourceTitle="sourceTitle"
        :merchant_id="merchant_id"
      ></Consultation>
    </div>
  </div>
</template>
<script>
import Sign from "./sign";
import QQtel from "./QQtel";
import Consultation from "~/components/consultation";
import { phone } from "~/utils/mixins";
export default {
  mixins: [phone],
  props: {
    plannerPath: {},
    mer_data: {},
    title: {
      type: String
      // default: "移民机构"
    },
    type: {},
    typeOf: {},
    showCity: {},
    sourceDescription: {},
    sourceTitle: {}
  },
  data() {
    return {
      showt: false,
      merchant_id: ""
    };
  },
  methods: {
    closeMain(val) {
      this.showt = val;
    }
  },
  components: {
    Sign,
    QQtel,
    Consultation
  }
};
</script>
<style lang="scss" scoped>
.immigration_agencies {
  padding: 20px;
  height: 213px;
  box-shadow: 0 0 20px #f3f2f2;
  .agen_top {
    display: flex;
    justify-content: space-between;

    font-size: 17px;

    .agen_top_l {
      span {
        // font-weight: 500;
      }
    }

    .agen_top_r {
      display: flex;

      .agen_top_r_c {
        color: #7ecdad;
        cursor: pointer;
        i {
          display: inline-block;
          width: 14px;
          height: 14px;
          background: url("../static/images/Refresh.png") no-repeat;
        }
        span {
          margin: 5px;
        }
      }

      .agen_top_r_b {
        span {
          margin-left: 17px;
          color: #8c98a4;
          cursor: pointer;
        }
      }
    }
  }

  .agen_bottom {
    margin-top: 31px;
    // padding-right: 25px;
    display: flex;
    .agen_bottom_box {
      display: flex;
      flex-direction: column;
      padding: 0 33px 0 20px;
      // border-right: 1px solid #E4E4E4;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
      .txt {
        // padding-left: 70px;
        padding-top: 13px;
      }
    }
  }
}
</style>
