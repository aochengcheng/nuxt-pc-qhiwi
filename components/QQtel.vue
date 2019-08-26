<template>
  <div class="clearFix">
    <div :class="[`zixun one f_left`,{'myClass':myClass}]" @click="jumpDetails();clickRate()">咨询Ta</div>
    <div :class="[`zixun getPhone f_left`,{'myClass':myClass}]" @click="clickPhone();clickRate()" ref="getPhone">获取电话号码</div>
  </div>
</template>

<script>
import {clickRate} from '~/utils/mixins'
export default {
  mixins:[clickRate],
  props: {
    merchant_id:{},
    phone: {
      
    },
    red: {},
    myClass: {
      default:false
    }
  },
  methods: {
    clickPhone() {
      let phone = this.$refs.getPhone;
      console.log(phone);
      phone.innerHTML = this.phone;
    },
    jumpDetails() {
      
      this.$parent.showt = true;
      this.$parent.merchant_id = this.merchant_id;
    },
  }
};
</script>

<style  lang="scss" scoped>
.zixun {
  position: relative;
  // float: right;
  width: 157px;
  height: 34px;
  line-height: 33px;
  // border: 1px solid #ed2530;
  text-align: center;
  // font-weight: bold;
  border-radius: 2px;
  color: #ed2530;
  font-size: 14px;
  cursor: pointer;

  &.myClass{
    height: 44px;
    line-height: 44px;
    background-color: #FFF4F5;
    &.one {
      margin-right: 25px;
    }
  }
  &.one {
    width: 86px;
    // height: 34px;
  }
  &::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -2px;
    background: url("../static/images/qq2.png") no-repeat center/cover;
  }
}
.getPhone {
  width: 158px;

  margin-left: 5px;
  text-align: center;
  color: #ED2530;
  &::before {
    background: url("../static/images/haiwaiHouse/redPhone.png") no-repeat
      center/cover;
  }
}
</style>