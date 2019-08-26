<template>
  <div class="lunbo">
    <div class="my_swiper">
      <a href="javascript:;" v-for="(item,i) in banner_img" :key="i" class="slide">
        <div :class="['item',{active:i==index}]" ref="items">
          <img :src="item" preview="1"/>
        </div>
      </a>
      <div class="prev" @click="prev"></div>
      <div class="next" @click="next"></div>
    </div>

    <div class="snav">
      <ul class="clearFix" ref="ulbox">
        <li
          v-for="(item,i)  in allImg"
          :key="i"
          :data-count="item.imgs.length"
          @mouseenter="hover(item.index)"
        >
          <img v-lazy="item.imgs[0]" />
          <p>{{ item.name+`( ${item.imgs.length} )` }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      house_detail: [],
      allImg: {},

      banner_img: [],
      index: 0
    };
  },
  methods: {
    next() {
      if (this.index >= this.banner_img.length - 1) {
        return;
      }
      this.index++;
      console.log(this.index);
      this.addClass();
    },
    prev() {
      if (this.index <= 0) {
        return;
      }
      this.index--;
      this.addClass();
    },

    hover(i) {
      let ulbox = this.$refs.ulbox;
      let items = this.$refs.items;
      let count = 0;
      for (var ah = 0; ah < i; ah++) {
        count += parseInt(ulbox.children[ah].dataset.count);
      }
      console.log(count);
      this.index = count;
    },

    addClass() {
      let items = this.$refs.items;
      if (items[this.index].classList.contains("active")) {
        items[this.index].classList.remove("active");
      }
      items[this.index].classList.add("active");
    },

    // 获取详情数据
    getDetailData() {
      const { id } = this.$route.query;
      this.$fetch(`/dhr/client/house/${this.id}`).then(res => {
        if (res.ErrCode == "0000") {
          this.house_detail = res.Result;
          console.log(this.house_detail);
          let json = JSON.parse;
          let img = Object.values(json(this.house_detail.peripheralImgs));
          let img1 = Object.values(json(this.house_detail.appearanceImg));
          let img2 = Object.values(json(this.house_detail.localtionImgs));
          let img3 = Object.values(json(this.house_detail.templateImgs));
          let img4 = Object.values(json(this.house_detail.apartmentImgs));

          this.banner_img = this.banner_img.concat(img1, img, img3, img4, img2);
          console.log(this.banner_img.length);
          let allImg = {};
          allImg.waijingtu = {
            index: 0,
            name: "外景图",
            imgs: img1
          };
          allImg.yangbanjian = {
            index: 1,
            name: "周边配套",
            imgs: img
          };
          allImg.huxingtu = {
            index: 2,
            name: "样板间",
            imgs: img3
          };
          allImg.quweitu = {
            index: 3,
            name: "户型图",
            imgs: img4
          };
          allImg.zhoubian = {
            index: 4,
            name: "区位图",
            imgs: img2
          };
          this.allImg = allImg;
          console.log(allImg);
        }
      });
    }
  },
  created() {
    this.getDetailData();
  }
};
</script>
<style scoped  lang="scss">
.lunbo {
  width: 670px;
  .my_swiper {
    width: 670px;
    height: 445px;
    position: relative;
    .item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      display: none;
      opacity: 0;
      transition: opacity 0.3s;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
      }

      &.active {
        display: block;
        opacity: 1;
        animation: fadeIn 0.5s;
      }
    }
    .prev,
    .next {
      height: 44px !important;
      width: 44px !important;
      background-size: 44px 44px;
      position: absolute;
      top: 50%;
      margin-top: -22px;
    }
    .prev {
      background-image: url("../static/images/hot/left.png");
      left: 20px;
      &:hover {
        background-image: url("../static/images/hot/left_b.png");
      }
    }
    .next {
      background-image: url("../static/images/hot/right.png");
      right: 20px !important;
      &:hover {
        background-image: url("../static/images/hot/right_b.png");
      }
    }
  }
  .snav {
    margin-top: 20px;
    ul {
      li {
        width: 125px;
        height: 83px;
        float: left;
        margin-right: 11px;
        position: relative;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          border: 1px solid red;
        }
        img {
          width: 100%;
        }

        p {
          position: absolute;
          left: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          width: 100%;
          height: 26px;
          line-height: 26px;
          text-align: center;
          color: #fff;
        }
      }
    }
  }

  /*动画效果*/
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0; /*初始状态 透明度为0*/
    }
    20% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5; /*中间状态 透明度为0.5*/
    }
    70% {
      opacity: 0.7;
    }
    100% {
      opacity: 1; /*结尾状态 透明度为1*/
    }
  }
}
</style>
