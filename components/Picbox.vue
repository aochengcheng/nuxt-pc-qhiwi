<template>
  <div class="picbox">
    <nuxt-link :to="{path:'/house/detail',query:{id:house_data.id}}">
      <figure v-if="house_data">
        <div class="imgs">
          <img v-lazy="house_data.coverImg" :key="house_data.id" />
        </div>
        <div class="pic_details">
          <div class="figcation text_one">{{ house_data.title }}</div>

          <div>
            <slot name="hl_yl_price"></slot>
          </div>

          <div class="pic_txt clearFix">
            <div class="pic_total">总价</div>

            <div class="pic_price">
              <slot name="house_price"></slot>万起
            </div>

            <div class="pic_country">
              <Country :country="house_data.belongCityName"></Country>
            </div>
          </div>
        </div>
      </figure>
    </nuxt-link>
  </div>
</template>
<script>
import Price from "./Price";
import Country from "./Country";
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    // 接受图片的大小

    house_data: {},
    // 是否刷新页面
    canReferer: {
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    getDetails(id) {
      this.$router.push({
        path: `/house/details`,
        query: { id }
      });
      if (this.canReferer) {
      }
    }
  },
  components: {
    Price,
    Country
  }
};
</script>
<style lang="scss" scoped>
.picbox {
  cursor: pointer;
  width: 285px;
  overflow: hidden;
  margin-right: 20px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 10px #d0c7c7;
    transform: translateY(-5px);
    .pic_details::after {
      background-color: rgba(226, 222, 222, 0.1);
    }
  }
  &:nth-child(4n) {
    margin-right: 0;
  }
  figure {
    padding-bottom: 20px;
    .imgs {
      width: 285px;
      height: 190px;
      border-radius: 5px;
      overflow: hidden;
    }
    .pic_details {
      padding: 20px 10px 0;
      position: relative;
      &::after {
        position: absolute;
        z-index: -1;
        content: "";
        top: 0;
        bottom: -20px;
        left: 0;
        right: 0;
      }
      .figcation {
        font-size: 18px;
        font-weight: 700;
      }

      .pic_txt {
        margin-top: 17px;
        position: relative;
        // height: 40px;
        display: flex;
        align-items: center;

        div {
          display: inline-block;
        }
        .pic_total {
          font-size: 14px;
          color: #b8b9bd;
        }
        .pic_price {
          transform: translateY(-3px);
          margin-left: 6px;
          display: inline-block;
          vertical-align: top;
          color: #b8b9bd;
        }
        .pic_country {
          margin-left: auto;
          color: #b8b9bd;
        }
      }
    }
  }
}
</style>
