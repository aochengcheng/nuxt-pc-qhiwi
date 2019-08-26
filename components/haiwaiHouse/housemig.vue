<template>
  <div class>
    <nuxt-link :to="{path:'/news/detail',query:{id:result_data.id}}">
      <div class="housemig">
        <div class="immig_left">
          <img v-lazy="result_data.coverImg" :key="result_data.id" :alt="result_data.name"/>
          <div
            class="immig_position"
          >{{ result_data.belongCountryName+' · '+result_data.belongCityName }}</div>
        </div>

        <div class="immig_right text_one">
          <h3 class="hover_underline text_one">{{ result_data.title }}</h3>
          <div class="service_charge">
            <div class="spanclass">
              <span>物业类型：</span>
              <span>{{ houstType(result_data.hoseType) }}</span>
            </div>
            <div class="spanclass">
              <span>可选户型：</span>
              <span v-for="(item,i) in useHx(result_data.optionalRoomType)" :key="i">{{ item }}</span>
            </div>
            <div class="spanclass">
              <span>项目面积：</span>
              <span>{{ result_data.minArea}}~{{ result_data.maxArea }}㎡</span>
            </div>
            <div class="spanclass">
              <span>交楼时间：</span>
              <span>{{result_data.deliveryTime}}</span>
            </div>
          </div>
        </div>

        <div class="priceclass">
          <div class="pri">
            <Price :price="result_data.price"></Price>万起
          </div>
          <div>
            <span style="color:#3CB584">
              <i>租金收益</i>
              {{ result_data.returnRate }}% |
              <i>首付比例</i>
              {{ result_data.downPay }}%
            </span>
            <!-- <span style="color:#9399A5">| 约{{ result_data.price }}万</span> -->
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script>
import Price from "../../components/Price";
export default {
  props: {
    result_data: {}
  },
  data() {
    return {
      price: 4
    };
  },
  methods: {
    // 房产类型
    houstType(type) {
      switch (type) {
        case 1:
          return "独栋别墅";
        case 2:
          return "联排别墅";
        case 3:
          return "精品住宅";
        case 4:
          return "双拼别墅";
      }
    },
    // 可选户型
    useHx(data) {
      const type = ["一室", "二室", "三室", "四室", "四室以上"];
      let newData = data.split(",");
      let showD = [];
      let map = newData.map((val, index) => {
        let number = Number(val);
        if (number) {
          showD.unshift(type[index]);
        }
      });
      return showD;
    }
  },
  created() {
    // console.log(this.result_data);
  },
  watch: {
    result_data(v) {
      // console.log(v)
    }
  },
  components: {
    Price
  }
};
</script>
<style lang="scss" scoped>
.housemig {
  padding: 20px 0;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
  width: 840px;
  display: flex;
  color: #919ba7;
  .immig_left {
    width: 285px;
    height: 189px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .immig_position {
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);

      width: 100%;
      height: 34px;
      line-height: 34px;
      color: #fff;
      font-size: 14px;
      padding-left: 30px;
      &::after {
        position: absolute;
        content: "";
        background: url("~static/images/location.png") no-repeat center/cover;
        width: 14px;
        height: 14px;
        left: 10px;
        top: 11px;
      }
    }
  }
  .priceclass {
    position: absolute;
    right: 0;
    bottom: 32px;
    .pri {
      position: absolute;
      top: -67px;
      right: 0;
    }
    i {
      color: #9399a5;
    }
    .pricespan {
      // height: 50px;
      // line-height: 36px;
    }
  }

  .immig_right {
    padding: 4px 30px 0;
    height: 189px;
    flex: 1;
    .spanclass {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
    }

    h3 {
      font-size: 22px;
      color: #000;
    }

    .combination {
      margin-top: 21px;
    }

    .service_charge {
      margin-top: 6px;

      span {
        margin-right: 3px;
      }
    }

    .handle {
      display: flex;
      justify-content: space-between;
      margin-top: 38px;
      text-align: center;
      .handle_pro {
        .handle_date {
          color: #31b385;
          margin-bottom: 10px;
        }
        .handle_dd {
        }
      }
    }
  }
}
</style>
