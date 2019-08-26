<template>
  <div style="display: flex">
    <div class="box b_one" :style="{width:box}">
      <div v-for="(item, index) in title.slice(1, 5)">
        <nuxt-link :to="{path:'/news/detail',query:{id:item.id}}">
          <div class="title_time">
            <i></i>
            <span class="title text_one hover_underline">{{ item.name }}</span>
            <span class="time">{{ _UTCTimeForMat(item.createdAt) }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="box b_two" :style="{width:box}">
      <div class="" v-for="(item,index) in title.slice(5,9)">
        <nuxt-link :to="{path:'/news/detail',query:{id:item.id}}">
          <div class="title_time">
            <i></i>
            <span class="title text_one hover_underline">{{ item.name }}</span>
            <span class="time">{{ _UTCTimeForMat(item.createdAt) }}</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { UTCTimeForMat } from "~/utils/timeFormat";
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    title: {},
    box: {
      default: `440px`
    }
  },
  methods: {
    _UTCTimeForMat(utc) {
      return UTCTimeForMat(utc);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.box {
  width: 440px;
}
.b_one {
  padding-right: 39px;
  border-right: 1px dashed #e1e1e1;
}
.b_two {
  margin-left: 30px;
}
.title_time {
  display: flex;
  justify-content: space-between;
  position: relative;
  font-size: 16px;
  overflow: hidden;
  padding: 5px 0 5px 20px;
  i {
    position: absolute;
    left: 0px;
    top: 14px;
    width: 4px;
    height: 4px;
    background-color: #ec282a;
    border-radius: 50%;
  }

  .title {
    // margin-left: 25px;
    width: 283px;
    // float: left;
  }

  .time {
    font-size: 14px;
    color: #9195a0;
    display: inline-block;
    margin-top: 2px;
  }
}
</style>
