<template>
  <div class="Howmeny-h1">
    <span>共有</span>
    <span style="color: #3CB584">{{ count }}</span>
    <span>个{{ type }}</span>
  </div>
</template>

<script>
export default {
    props: {
        count: {},
        type: {
          default:'房产'
        }
    }
};
</script>

<style lang="scss" scoped>
.Howmeny-h1 {
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  font-size: 22px;
  height: 40px;
  line-height: 40px;
  color: #0d1c31;
}
</style>