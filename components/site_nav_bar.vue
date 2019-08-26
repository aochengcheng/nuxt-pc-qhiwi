<template>
  <div class="site_nav_bar">
    <div class="site_nav_bar_box centered">
      <div class="site_nav_bar_left f_left">
        <div class="top_left">
          <h1>去海外就上去海外网 &nbsp;</h1>
        </div>
      </div>

      <div class="site_nav_bar_right f_right">
        <div class="sh">
          <a href="http://pro.qhiwi.com">商户入口</a>
        </div>

        <div class="phone">
          <Head400></Head400>
        </div>

        <div class="user">
          <HeadUser/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import Head400 from "~/components/Head400";
import HeadUser from "~/components/Head-top-user";
export default {
  components: {
    Head400,
    HeadUser
  }
};
</script>
<style lang="scss" scoped>
.site_nav_bar {
  height: 40px;
  background-color: #f6f6f6;
  border-bottom: 1px solid #e4e4e4;
  color: #a2a5ae;

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
  .top_left {
    h1 {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      font-weight: normal;
    }
  }
}
</style>
