<template>
  <div class="self">
    <div class="site_nav_bar">
      <div class="site_nav_bar_box centered">
        <div class="site_nav_bar_left f_left">
          <div class="site_nav_bar_left f_left">
            <div class="top_left">
              <h1>去海外就上去海外网 &nbsp;</h1>
            </div>
          </div>
        </div>

        <div class="site_nav_bar_right f_right">
          <div class="sh">
            <a href="/" style="color:red;">去海外网首页</a>
          </div>
        </div>
      </div>
    </div>
    <nuxt />

    <Foot />
  </div>
</template>
<script>
import Foot from "~/components/foot/foot";
export default {
  components: {
    Foot
  }
};
</script>

<style lang="scss" scoped>
.site_nav_bar {
  height: 40px;
  background-color: #242424;
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
