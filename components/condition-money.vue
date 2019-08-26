<template>
  <div class="condition-screening">
    <div class="titspan">总价</div>
    <div class="itemsclass">
      <span
        :class="['itclass',{'show':i==0&&item.name=='不限'}]"
        class="itclass"
        v-for="(item,i) in data"
        @click="checkLi(i,item.id,item.name)"
        ref="span"
      >{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { bus } from "../utils/event";
import { screen } from "../utils/screen_data";
export default {
  mixins: [screen],
  props: {
    cost: {}
  },
  data() {
    return {
      data: [],
      allcost: {}
    };
  },
  methods: {
    checkLi(i, id, names) {
      let span = this.$refs.span;
      span.forEach((val, i) => {
        if (val.classList.contains("show")) {
          val.classList.remove("show");
        }
      });
      span[i].classList.add("show");
      this.allcost = {
        id,
        names,
        type: "cost",
        index: i
      };
      bus.$emit("send_data", this.allcost, "cost");
      this.$parent.params.page = 1;
      // console.log( this.$parent.params.page)
    },
    emp_data() {
      bus.$on("empty_data", (index, text) => {
        if (text == this.allcost["names"]) {
          let span = this.$refs.span;
          span[index].classList.remove("show");
        }
      });
    }
  },
  mounted() {
    this.emp_data();
  },
  watch: {
    cost(val) {
      this.data = val;
      // console.log(this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
.condition-screening {
  height: 40px;
  line-height: 40px;
  font-size: 14px;

  .titspan {
    width: 90px;
    text-align: left;
    float: left;
    color: #9399a5;
  }
  .itemsclass {
    float: left;
    text-align: left;
    .itclass {
      padding-left: 10px;
      padding-right: 10px;
      float: left;
      // font-weight: bold;
      cursor: pointer;
      &.show {
        color: #ed2530;
      }
    }
  }
}
</style>