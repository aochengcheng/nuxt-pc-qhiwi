<template>
  <div class="side_right">
    <h3>{{ sTitle }}</h3>
    <div class="hot_wrapper" v-for="(item,i) in  hot_data" :key="i">
      <nuxt-link :to="{path:'/news/detail',query:{id:item.id}}">
        <div class="hot_item">
          <div class="hot_img">
            <img v-lazy="item.coverImg" />
          </div>

          <div class="hot_txt">
            <p class="hover_underline text_overflow">{{ item.name }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    sTitle: {
      default: "移民热门"
    },
    hot_data: {},
    modelName: {}
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.side_right {
  h3 {
    font-size: 18px;
    margin-bottom: 21px;
    font-weight: normal;
  }

  .hot_wrapper {
    width: 290px;
    cursor: pointer;
    .hot_item {
      margin-bottom: 20px;
      display: flex;
      .hot_img {
        width: 120px;
        height: 80px;
        border-radius: 4px;
        overflow: hidden;
        img {
          display: block;
        }
      }

      .hot_txt {
        padding: 5px 11px;
        flex: 1;
        p {
          font-size: 16px;
          // font-weight: 600;
        }
      }
    }
  }
}
</style>
