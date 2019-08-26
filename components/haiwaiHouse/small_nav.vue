<template>
  <nav class="nav_top">
    <ul>
      <li v-for="(item,i) in list"
       v-text="item"
       :class="{'active': i == 0}"
       @click="switchNav(i)"
       ref="li">
       </li>
    </ul>
  </nav>
</template>
<script>
export default {
        props:{
            list:{
                type:Array,
                requred:true
            }
        },

  methods: {
    switchNav(i) {
      this.li.forEach(function(val,index, arr) {
       if (arr[index].classList.contains('active'))
         arr[index].classList.remove('active')
      })
      
      this.li[i].classList.add('active')
    }
  },
  computed: {
    li() {
      return this.$refs.li
    }
  }
};
</script>
<style lang="scss" scoped>
.nav_top {
  ul {
    display: flex;
    li {
      position: relative;
      width: 130px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
      color: #000;
      font-size: 18px;
      cursor: pointer;
      &.active::after {
        position: absolute;
        content: '';
        width: 16px;
        height: 16px;
        background-color: #ed2530;
        transform: rotate(45deg);
        left: 50%;
        bottom: -5px;
        margin-left: -8px;
      }
      &.active {
        color: #fff;
        background-color: #ed2530;
      }
    }
  }
}
</style>
