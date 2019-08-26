<template>
  <nav class="nav_top">
    <ul>
      <a
        href="javascript:;"
        v-text="item.tit"
        v-for="(item,i) in list"
        :key="i"
        :type="item.type"
        :class="{'active': i == 0}"
        @click="switchNav(i,item.type)"
        ref="li"
      ></a>
    </ul>
  </nav>
</template>
<script>
import { setCountryMode } from "~/utils/mixins";
import { hotModel } from "~/utils/config";
export default {
  mixins: [setCountryMode],
  props: {
    list: {
      type: Array
    },
    active: {
      default: 0
    },
    remoteUrl: {
      default: false
    }
  },
  data() {
    return {
      current: this.active,
    };
  },
  mounted() {
  },
  metaInfo() {
    return {
      title: this.hotTitle,
      meta: [
        {
          name: "keywords",
          content: this.keywords
        },
        {
          name: "description",
          content: this.description
        }
      ]
    };
  },
  methods: {
    switchNav(i,type) {
      console.log(i);
      this.li.forEach((val, index, arr) => {
        if (arr[index].classList.contains("active"))
          arr[index].classList.remove("active");
      });

      this.li[i].classList.add("active");
      this.$emit("getActive",i, type);
    },
    // title、关键词、描述
    changeTitleAndKeywords(type) {
      this.$parent.modelURL = type;
      console.log(this.$parent.modelURL);
      this.$parent.hotTitle = hotModel[type].title;
      this.$parent.description = hotModel[type].description;
      this.$parent.keywords = hotModel[type].keywords;
      console.log( this.keywords)
      // this.$router.push({ path: `/${this.cityJX}/news/${type}` });
    }
  },
  watch: {
    active(val) {
      this.current = val;
      // console.log("watch:" + this.current);

      this.li.forEach(function(val, index, arr) {
        if (arr[index].classList.contains("active"))
          arr[index].classList.remove("active");
      });

      this.li[this.current].classList.add("active");
    }
  },
  computed: {
    li() {
      return this.$refs.li;
    }
  }
};
</script>
<style lang="scss" scoped>
.nav_top {
  ul {
    display: flex;

    a {
      position: relative;
      padding: 10px 32px;
      border-radius: 4px;
      display: block;
      font-size: 18px;
      text-align: center;
      position: relative;
      cursor: pointer;
      &.active::after {
        position: absolute;
        content: "";
        width: 16px;
        height: 16px;
        background-color: #ed2530;
        transform: rotate(45deg);
        left: 50%;
        bottom: -5px;
        margin-left: -8px;
        z-index: -1;
      }
      &.active {
        background-color: #ed2530;
        color: #fff;
      }
    }
  }
}
</style>
