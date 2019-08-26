import Vue from 'vue'

Vue.filter('goTime', (value) => {
  return Math.floor(value / (24 * 3600 * 1000))
})
