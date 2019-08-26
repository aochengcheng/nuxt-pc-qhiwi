

<template>
  <div class="paddingclass">
    <!--<h1>面包屑组件</h1>-->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="paddingclass">
      <el-breadcrumb-item :to="{ path: `/` }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item,i) in type"
        :key="i"
        
        :to="{path: item.path}"
      >{{ item.title }}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item v-else>{{type[1].title}}</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item :to="{ path: '/home' }">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home' }">活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
  </div>
</template>

<script>
import { setCountryMode } from "~/utils/mixins";
export default {
  mixins: [setCountryMode],
  props: {
    type: {
      type: Array
    }
  }
};
</script>
<style  lang="scss">
.paddingclass {
  font-size: 14px;
  height: 50px;
  line-height: 50px !important;
  .el-breadcrumb__inner {
    color: #9399a5 !important;
  }
  .el-breadcrumb__inner.is-link:hover {
    // color: #ED2530 !important;
  }

  .el-breadcrumb__inner.is-link {
    font-weight: normal;
  }
}
</style>

