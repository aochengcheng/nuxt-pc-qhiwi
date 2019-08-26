import VueLazyLoad from 'vue-lazyload'
import Vue from 'vue'
Vue.use(VueLazyLoad, {
  // error:'./static/error.png',
  loading: require('~/static/images/lazy.png')
})