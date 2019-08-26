<template>
  <!-- 资讯 -->
  <div>
    <div class="information" v-for="(item,i) of news" :key="i" >
      <div class="info_con">
        <nuxt-link class="hover_underline" :to="{path:'/news/detail',query:{id:item.id}}">{{ item.name }}</nuxt-link>
        <p class="hour">{{ _getDateDiff(item.createdAt) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getDateDiff } from "../utils/UTCformat";
import { setCountryMode } from "../utils/mixins";
export default {
  mixins:[setCountryMode],
  props: {
    news: {}
  },
  methods: {
    _getDateDiff(t) {
      return getDateDiff(t);
    }
  }
};
</script>
<style lang="scss" scoped>
.information {
  position: relative;
  box-sizing: content-box;
  padding: 15px 0;
  margin-top: 8px;
  border-bottom: 1px dashed #fafafa;
  font-size: 14px;
  &::after {
    position: absolute;
    content: "";
    height: 10px;
    width: 10px;
    left: 0;
    top: 20px;
    border-radius: 50%;
    background-color: #ee252d;
  }
  .info_con {
    margin-left: 24px;
    line-height: 1.6;

    .hour {
      color: #9a9ea1;
      margin-top: 16px;
    }
  }
}
</style>
