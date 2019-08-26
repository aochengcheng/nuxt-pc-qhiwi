<template>
  <div class="project">
    <div class="p_left">
      <h1>{{ tname.big }}</h1>
      <p>{{ tname.small }}</p>
    </div>

    <div class="p_right" v-if="right_nav">
      <ul ref="ul" id="bUl">
        <li
          v-for="(item, index) in tname.options"
          :key="index"
          :class="{'select': index == 0}"
          @mouseover="changeTabClick(item.id, index, $event,item.type)"
          ref="allLi"
          :lid="item.id"
          :kind="item.type"
        >
          {{item.name}}
          <!-- <nuxt-link :to="{name:'index-hot',params:{hot:item.type}}" no-prefetch>{{ item.name }}</nuxt-link> -->
          <!-- <nuxt-link :to="''" no-prefetch>{{ item.name }}</nuxt-link> -->
        </li>

        <li @click="$router.push({path: tname.moreURL})">更多</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { fetch } from "~/plugins/axios/http.js";
export default {
  props: {
    tname: {},
    right_nav: {
      default: true
    }
  },

  methods: {
    async changeTabClick(id, i, e, type) {
      this.$parent.kind = type;
      this.$parent.index = id;
      console.log(this.$parent.kind);

      this.allLi.forEach(item => {
        if (item.classList.contains("select")) {
          item.classList.remove("select");
        }
      });

      this.allLi[i].classList.add("select");
    },
    createLastLi() {
      const ul = this.$refs.ul;
      let ele = document.createElement("li");
      ele.innerHTML = "更多";
      ele.classList.add("ele");
      ul.appendChild(ele);
    },
    ...mapActions({
      changeCate: "hot/changeCate"
    })
  },
  computed: {
    allLi() {
      return this.$refs.allLi;
    }
  }
};
</script>
<style lang="scss" scoped>
.project {
  display: flex;
  justify-content: space-between;
  .p_left {
    display: flex;
    h1 {
      font-size: 36px;
      font-weight: normal;
    }
    p {
      font-size: 16px;
      margin-top: 21px;
      margin-left: 10px;
      color: #9496a5;
    }
  }
  .p_right {
    ul {
      height: 100%;
      display: flex;
      padding-top: 10px;
    }
    .ele {
      color: #bcc0cb;
      display: block;
      height: 100%;
      font-size: 18px;
      // margin-right: 25px;
    }
    li {
      margin-right: 25px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }

      color: #bcc0cb;
      display: block;
      height: 100%;
      font-size: 18px;

      &:hover {
        color: #3cb486;
      }
      &:hover {
        border-bottom: 2px solid #3cb486;
      }

      &.select {
        color: #3cb486;
        border-bottom: 2px solid #3cb486;
      }
    }
  }
}
</style>
