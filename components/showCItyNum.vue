<template>
  <div class="condition-screening">
    <div class="titspan">{{ typeName }}</div>
    <div class="itemsclass">
      <span
        class="itclass"
        v-for="(item,i) in data"
        @click="checkLi(i,item.id,item.name)"
        ref="span"
        :key="i"
      >{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { bus } from "../utils/event";
import { screen } from "../utils/screen_data";
import { mapMutations } from 'vuex'
export default {
  mixins: [screen],
  props: {
    listData: {},
    typeName: {},
    fieldName: {
        default: 'showCityNum'
    },
    pushArr: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: [],
      house_data: {}
    };
  },
  mounted() {
    this.emp_data();
    // console.log(this.data);
  },
  beforeDestroy() {
     this.showCityNum(null)
  },
  methods: {
    checkLi(i, id, names) {
      console.log(id)
      let span = this.$refs.span;
      span.forEach((val, i) => {
        if (val.classList.contains("show")) {
          val.classList.remove("show");
        }
      });
      span[i].classList.add("show");

      this.house_data = {
        id,
        names,
        type: this.fieldName,
        index: i
      };
      if (!this.pushArr) {
        const field = this.fieldName
        this.$parent.params = Object.assign(this.$parent.params, {
          [field]:this.house_data.id
        })
        this.$parent.getListData()
        return
      }

      this.showCityNum(id)
      sessionStorage.setItem('changeCityNum',id)
      console.log(this.house_data)
      bus.$emit("send_data", this.house_data, this.fieldName, true);

        //  this.$parent.getListData()
    },




    emp_data() {
      bus.$on("empty_data", (index, text) => {
        if (text == this.house_data["names"]) {
          let span = this.$refs.span;
          span[index].classList.remove("show");
        }
      });
    },
    ...mapMutations({
        showCityNum: 'STATE_CITY_NUMBER'
    })
  },
  watch: {
    listData(val,old) {
      this.data = val;
      // console.log(this.data);

    }
  },
  beforeDestroy(){
    sessionStorage.removeItem('changeCityNum')
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
    max-width: 1110px;
    // font-weight: bold;
    .itclass {
      padding-left: 10px;
      padding-right: 10px;
      float: left;
      cursor: pointer;
      &.show {
        color: #ed2530;
      }
    }
  }
}
</style>