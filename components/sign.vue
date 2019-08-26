<template>
  <div class="sign">
    <div class="heads" @click="getMerchant">
      <img class="imgclass" v-lazy="head_img" />
    </div>
    <div class="details">
      <span @click="getMerchant">{{ simpleName }}</span>
      <i>
        咨询量：
        <em>{{ hot }}</em>
      </i>
    </div>
  </div>
</template>

<script>
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    head_img: {},
    simpleName: {
      default: "西游记旅行"
    },
    hot: {
      default: "100"
    },
    id: {},
    type: {}
  },

  methods: {
    getMerchant() {
      console.log(this.id);
      this.$router.push({
        path: `/merchant`,
        query: { merchant_id: this.id, type: this.type }
      });
    }
  }
};
</script>

<style  lang="scss" scoped>
.sign {
  height: 60px;
  // line-height: 60px;
  font-size: 18px;
  // float: left;
  display: flex;
  .heads {
    cursor: pointer;
  }

  .imgclass {
    border-radius: 100%;
    height: 60px;
    width: 60px;
    margin-right: 15px;
    object-fit: cover;
  }

  .details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // text-align: center;
    span {
      cursor: pointer;
    }
    i {
      font-size: 14px;
      color: #9399a5;
    }
  }
}
</style>