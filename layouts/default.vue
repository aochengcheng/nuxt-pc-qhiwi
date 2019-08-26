<template>
  <div class="self">
    <sitebar />
    <!-- header部分 -->
    <header class="header centered">
      <!-- v-if="!merchant" -->
      <div>
        <Head />
      </div>
    </header>
    <nuxt />

    <Foot />
  </div>
</template>
<script>
import sitebar from "~/components/site_nav_bar";
import Head from "~/components/head1";
import Foot from "~/components/foot/foot";
export default {
  fetch(ctx){
    console.log('default::::::::::',fetch)
  },
  components: {
    sitebar,
    Head,
    Foot
  }
};
</script>

<style>
</style>
