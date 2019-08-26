<template>
  <div class="scroll_bar">
    <ul>
      <li
        v-for="(item, i) in detailedDescription"
        :class="{'active': i == 0}"
        ref="li"
        @click="switchNav(i)"
      >Day{{ i +  1 }}</li>
    </ul>

    <div class="daysWrap" ref="daysBox">
      <div class="daysBox">
        <div class="items" v-for="(item, i) in detailedDescription" :key="i">
          <h3>
            Day{{ i+1 }}
            <i>{{ item.daytitle | title }}</i>
          </h3>
         <div  v-html="item.daycenten">

         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailedDescription: {}
  },
  data() {
    return {
      active: 0
    };
  },
  mounted() {
    this.section = document.querySelectorAll(".items");
    this.$refs.daysBox.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    switchNav(i) {
      this.li.forEach((val, index, arr) => {
        if (val.classList.contains("active")) val.classList.remove("active");
      });
      //   this.active = i
      this.li[i].classList.add("active");
      let section = document.querySelectorAll(".items");
      let top = section[i].offsetTop;
      this.$refs.daysBox.scrollTop = top;
    },
    handleScroll() {
      let section = document.querySelectorAll(".items");

      let scrollTop =
        this.$refs.daysBox.pageYOffset ||
        this.$refs.daysBox.scrollTop ||
        this.$refs.daysBox.scrollTop;
      Array.from(section).forEach((item, index) => {
        if (
          scrollTop >= item.offsetTop &&
          scrollTop < item.offsetTop + item.clientHeight
        ) {
          this.active = index;
        }
      });
    },
    getActive(val) {
      this.active = val;
      let section = document.querySelectorAll(".pro_items");
      let top = section[val].offsetTop - 30;
      document.documentElement.scrollTop = top;
    }
  },
  watch: {
    active(val) {
      this.active = val;
      // console.log("watch:" + this.current);

      this.li.forEach((val, index, arr) => {
        if (val.classList.contains("active")) val.classList.remove("active");
      });

      this.li[this.active].classList.add("active");
    }
  },
  computed: {
    li() {
      return this.$refs.li;
    }
  },
  filters: {
    days(value) {
      return value.split("|")[0];
    },
    title(value) {
      return value.split("|")[1];
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.scroll_bar {
  margin-top: 25px;
  display: flex;
  ul {
    width: 80px;
    li {
      width: 80px;
      height: 33px;
      background-color: #f4f5f6;
      font-size: 14px;
      color: #0d1c31;
      text-align: center;
      line-height: 33px;
      border-bottom: 1px solid #e4e4e4;
      cursor: pointer;
      &:last-child {
        border: 0;
      }

      &.active {
        background-color: #ed2530;
        color: #fff;
      }
    }
  }
  .daysWrap {
    padding-left: 30px;
    height: 500px;
    overflow: auto;
    padding-right: 30px;
    position: relative;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 262px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #f4f5f6;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      // background: #ededed;
    }
    .daysBox {
      font-size: 16px;
      line-height: 36px;
      padding-bottom: 430px;

      .items {
        margin-bottom: 40px;
        &:last-child {
          margin-bottom: 0;
        }
        h3 {
          i {
            color: #ed2530;
            margin-left: 25px;
            font-weight: normal;
          }
        }
        p {
        }
      }
    }
  }
}
</style>
