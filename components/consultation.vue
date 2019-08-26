<template>
  <div class="consultation">
    <div class="conter">
      <span @click="jumpDetails2"></span>
      <h1 class="titlep">预约咨询</h1>
      <p class="conterp">去海外商户将尽快联系您</p>
      <div class="inputdiv">
        <input type="text" placeholder="请输入姓名" v-model="name" maxlength="5" minlength="1" />
      </div>
      <div class="inputdiv">
        <input type="telephone" placeholder="请输入电话" v-model="phone" minlength="11" maxlength="11" />
        <i class="error" v-if="isErr">{{errMSG}}</i>
      </div>

      <div class="button" @click="sendMSG">立即预约</div>
    </div>
  </div>
</template>
<script>
import { post } from "~/plugins/axios/http.js";
export default {
  props: {
    typeOf: {},
    showCity: {},
    sourceTitle: {},
    sourceDescription: {},
    merchant_id: {},
    source:{
      default:1
    },
    sourceDetailed:{
      default:true
    }
  },
  data() {
    return {
      name: "",
      phone: "",
      isErr: false,
      errMSG:''
    };
  },
  mounted(){
    console.log('merchant_id:::',this.merchant_id)
  },
  methods: {
    sendMSG() {     
      if (this.name && this.phone) {
        post("/dhr/visitNumber/add", {
          name: this.name,
          phone: this.phone,
          typeOf: this.typeOf,
          showCity: this.showCity,
          sourceTitle: this.sourceTitle,
          showCityNum: 1,
          sourceDescription: this.sourceDescription,
          merchant_id: this.merchant_id,
          source:this.source,
          sourceDetailed: this.sourceDetailed ? 2 : 1,
        }).then(res => {
          console.log(res);
          if (res.ErrCode == "0000") {
            this.jumpDetails2("remove");
            let success = this.$refs.success;

            this.$message({
              message: "咨询成功",
              type: "success",
              duration: 1500
            });
          }else if (res.ErrCode = '1000') {
            this.errMSG =  res.ErrMsg
            this.isErr = true
          }
        });
      } else {
        this.$message({
          message: "请输入正确的内容",
          type: "error",
          duration: 1500
        });
      }
    },

    jumpDetails2() {
      let showt = false;
      this.$emit("closeMain", showt);
    }
  }
};
</script>
<style lang="scss" scoped>
.consultation {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  .conter {
    z-index: 1000;
    position: relative;
    top: 50%;
    left: 50%;
    margin-left: -215px;
    margin-top: -200px;
    width: 430px;
    height: 396px;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
    text-align: center;
    span {
      position: absolute;
      width: 34px;
      height: 34px;
      right: -15px;
      top: -15px;
      background: url("../static/images/Close.png") no-repeat center;
      cursor: pointer;
    }
    .clossimg {
      float: right;
      margin-right: -17px;
      margin-top: -17px;
    }
    .titlep {
      color: #0d1c31;
      height: 70px;
      line-height: 70px;
      font-size: 30px;
      font-weight: 400;
    }
    .conterp {
      color: #9399a5;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: 400;
    }
    .inputdiv {
      margin-top: 25px;
      margin-left: 46px;
      width: 337px;
      height: 50px;
      line-height: 50px;
      border: #dcdcdc 1px solid;
      position: relative;
      input {
        width: 337px;
        height: 50px;
        line-height: 50px;
        border-radius: 2px;
        padding-left: 20px;
        placeholder {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(147, 153, 165, 1);
        }
      }
      .error{
        position: absolute;
        content: '';
        color: red;
        font-size: 12px;
        right: 2px;
        top: 0;
      }
    }

    .button {
      margin-top: 40px;
      margin-left: 46px;
      width: 337px;
      height: 60px;
      line-height: 60px;
      background: rgba(237, 37, 48, 1);
      border-radius: 2px;
      color: #fff;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
</style>
