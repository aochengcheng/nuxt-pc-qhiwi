<template>
  <div>
    <ul>
      <li v-for="(item,i) in abroad_data" :key="i">
        <nuxt-link :to="{path:`/study/detail`,query: {id: item.id } }">
          <figure>
            <div class="badge">
              <div class="imgs">
                <img v-lazy="item.schoolBadgeImg">
              </div>
            </div>

            <div class="badge_r">
              <h3 class="colle_zh text_one">{{ item.schoolName }}</h3>

              <div class="colle_en text_one">{{ item.englishName }}</div>
            </div>
          </figure>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    abroad_data: {}
  },
  data() {
    return {
      test: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  }
};
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    margin-right: 20px;
    width: 285px;
    height: 105px;
    margin-bottom: 20px;
    // &:nth-last-child(2) {
    //   margin-bottom: 0;
    // }

    &:last-child,
    &:nth-child(4n) {
      margin-right: 0;
    }
    a {
      display: block;

      figure {
        display: flex;

        .badge {
          border: 4px solid #e1e1e1;
          border-radius: 50%;
          // padding: 10px;
          width: 100px;
          height: 100px;
          .imgs {
            width: 76px;
            height: 76px;
            overflow: hidden;
            border-radius: 50%;
            margin: 8px auto;
          }
          img {
            display: block;
          }
        }

        .badge_r {
          display: flex;
          flex-direction: column;
          margin-left: 15px;
          flex: 1;
          min-width: 0;
          .colle_zh {
            margin-top: 20px;
            font-size: 18px;
          }

          .colle_en {
            margin-top: 22px;
            font-size: 14px;
            color: #9399a5;
          }
        }
      }
    }
  }
}
</style>
