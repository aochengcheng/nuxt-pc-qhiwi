<template>
  <div class="top" v-if="canshow" @click="backTop"></div>
</template>

<script>
import { backToTop } from "~/utils/backToTop";
export default {
  data() {
    return { canshow: false };
  },
  mounted() {
    let doc = document.documentElement || document.body;
    if (doc.scrollTop > 400) {
      this.canshow = true;
    }

    document.addEventListener("scroll", e => {
      // console.log(doc.scrollTop)
      if (doc.scrollTop > 500) {
        this.canshow = true;
      } else {
        this.canshow = false;
      }
    });
  },
  methods: {
    backTop() {
      backToTop(4);
    }
  }

  // be(){
  //   document.removeEventListener('scroll')
  // }
};
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  right: 22%;
  bottom: 150px;
  width: 49px;
  height: 44px;
  background: url("../static/images/backtop.png") no-repeat center/cover;
  cursor: pointer;
}
</style>
