<template>
  <footer class="footer">
    <div class="footer_wrapper centered">
      <div class="footer_t">
        <div class="foot_logo">
          <img src="~/static/images/foot_logo.png" alt>
        </div>

        <div class="contact_us">
          <h3>联系我们</h3>
          <div class="contact_phone">
            <a class="phone_icon"></a>
            <a class="phone_num">400-877-1008</a>
            <!-- <a class="phone_time">7*24小时服务热线</a> -->
          </div>

          <div class="contact_service">
            <a class="service_icon"></a>
            <a class="service_email">reneezeng@qhiwi.com</a>
            <!-- <a class="service_ss">合作</a> -->
          </div>

          <!-- <div class="contact_service">
            <a class="service_icon"></a>
            <a class="service_email">service@163.com</a>
            <a class="service_email">service@qq.com</a>
          </div> -->
        </div>

        <div class="service">
          <h3>关于我们</h3>
          <a href="https://36kr.com/p/5184735">媒体报道</a>
          <nuxt-link :to="{path:`/about/chinese`}">关于我们</nuxt-link>
          <nuxt-link :to="{path:`/about/english`}">About Us</nuxt-link>
        </div>

        <div class="cooper">
          <h3>商业合作</h3>
          <!-- <a href="#">开放平台</a> -->
          <a href="http://pro.qhiwi.com" target="_blank">商户端口</a>
        </div>

        <div class="Qr">
          <img src="~/static/images/wechat.jpg" alt>
          <p>去海外商户小助手</p>
        </div>
        <div class="Qr"  style="margin-left:70px">
          <img src="~/static/images/quhiwi.jpg" alt>
          <p>去海外万人大群</p>
        </div>
      </div>
    </div>

    <div class="footer_b">
      <div class="centered">
         <a href="javascript:;">友情链接</a>
        <a href="https://bj.leju.com/"  target="_blank">新浪乐居</a>
        <!-- <a href="#">安居客</a> -->
        <!-- <a href="#">贝壳</a> -->
      </div>
    </div>

    <div class="footer_b">
      <div class="centered">
        <a href="#">北京去海外科技有限公司 &nbsp;&nbsp;&nbsp; Qhiwi Technology Co，Ltd
京ICP备  &nbsp; 18051710号-1</a>
      </div>
    </div>
  </footer>
</template>

<script>
import {setCountryMode} from '~/utils/mixins'
export default {
  mixins:[setCountryMode]
};
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 80px;
  background-color: #242424;
  border-top: 4px solid #ed2530;
  color: #5e5e5e;
  a {
    color: #5e5e5e;
  }

  .footer_wrapper {
    padding-top: 50px;

    h3 {
      color: #cecece;
      font-size: 17px;
      position: relative;
      margin-bottom: 23px;

      &::before {
        position: absolute;
        content: "";
        left: -15px;
        top: 3px;
        width: 3px;
        height: 18px;
        background-color: #f22b30;
      }
    }

    .footer_t {
      height: 230px;
      display: flex;
      .foot_logo {
        width: 200px;
        position: relative;
        img {
          position: absolute;
          top: -18px;
          left: 0px;
          width: auto;
          height: auto;
        }
      }

      .contact_us {
        .contact_phone {
          height: 24px;
          display: flex;
          align-items: center;
          .phone_icon {
            background: url("../../static/images/foot_phone.png") no-repeat;
          }
        }
        .phone_num,
        .service_email {
          margin: 0 13px;
        }

        .contact_service {
          margin: 25px 0;
          display: flex;
          align-items: center;

          &:last-of-type {
            margin-bottom: 0;
          }
        }

        .service_icon,
        .phone_icon {
          width: 24px;
          height: 24px;
        }
        .service_icon {
          background: url("../../static/images/foot_email.png") no-repeat;
        }
      }

      .service,
      .cooper {
        margin-left: 90px;
        a {
          display: block;
          margin-bottom: 35px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }

      .Qr {
        margin-left: 110px;
        text-align: center;
        img {
          display: block;
          width: 150px;
          height: 150px;
        }
        p {
          margin-top: 15px;
        }
      }
    }
  }

  .footer_c {
  }

  .footer_b {
    height: 53px;
    border-top: 1px solid;
    line-height: 53px;
    a {
      margin-right: 20px;
    }
  }
}
</style>
