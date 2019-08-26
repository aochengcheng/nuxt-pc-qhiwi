<template>
  <div class="recommend">
    <div class="re_t">
      <div class="r_tui">
        <h3>精品推荐</h3>
      </div>

      <div class="r_country">
        <a :href="item.host" v-for="(item, key) in recommend" :key="key">{{ item.title }}</a>
      </div>
    </div>

    <!-- 热门项目 -->
    <div class="re_b">
      <div class="r_tui">
        <h3>热门项目</h3>
      </div>

      <div class="r_txt">
        <p>
          <a :href="item.host" v-for="(item,key) in hot" :key="key">{{ item.title }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommend: {},
    hot: {}
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.recommend {
  height: 317px;
  width: 300px;
  border: 1px solid #e4e4e4;
  padding: 20px 15px;

  .re_t {
    padding-bottom: 8px;
    border-bottom: 1px dashed #e4e4e4;
    .r_country {
      margin-top: 20px;
      a {
        color: #9496a3;
        display: inline-block;
        margin-right: 23px;
        margin-bottom: 12px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .r_tui {
    h3 {
      width: 74px;
      height: 22px;
      line-height: 22px;
      background-color: #eb273b;
      color: #fff;
      text-align: center;
      margin-bottom: 20px;
    }
  }

  .re_b {
    padding-top: 20px;

    .r_txt {
      
      a {
        color: #9496a3;
        margin-right: 15px;
        line-height: 2;
      }
    }
  }
}
</style>
