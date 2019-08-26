<template>
  <div class="hd">
    <ul class="clearFix">
      <li v-for="i in HD" :key="i.id">
        <nuxt-link :to="{path:`/hwhd`,query:{id:i.id}}">
          <div class="img_content">
            <img v-lazy="i.coverImg" />
            <span>{{_UTCTimeForMat(i.startTime,'mm-dd')}}</span>
            <p class="text_overflow">{{ i.title }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { setCountryMode } from "~/utils/mixins";
import { UTCTimeForMat } from "~/utils/timeFormat";
export default {
  mixins: [setCountryMode],
  props:{
    HD:{}
  },
  data() {
    return {
      // HD: []
    };
  },
  methods: {
    // 活动
    // getHD() {
    //   this.$fetch("/dhr/merchant/activity/management", {
    //     shelf: 1,
    //     checkState: 1,
    //     by:'index_1',
    //     limit:4
    //   }).then(res => {
    //     if (res.ErrCode == "0000") {
    //       console.log(res);
    //       this.HD = res.Result.data;
    //     }
    //   });
    // },
    _UTCTimeForMat(utc, time = true) {
      return UTCTimeForMat(utc, time);
    }
  },
  created() {
    // this.getHD();
  }
};
</script>
<style scoped lang="scss">
.hd {
  ul {
    padding-bottom: 52px;
    li {
      float: left;
      width: 285px;
      height: 160px;
      border-radius: 4px;
      overflow: hidden;
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
      .img_content {
        width: 285px;
        height: 160px;
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.2);
          top: 0;
          left: 0;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        span {
          position: absolute;
          left: 0;
          top: 0;
          background-color: #ed2530;
          border-radius: 2px;
          color: #fff;
          font-size: 14px;
          padding: 8px 10px;
          z-index: 1;
        }
        p {
          position: absolute;
          width: 90%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          font-size: 18px;
          text-align: center;
          z-index: 1;
        }
      }
    }
  }
}
</style>

