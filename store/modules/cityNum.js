// if (process.browser) {
//   var le = JSON.parse(window.sessionStorage.getItem('vuex'))
//   console.log('le:::::::::::', le.cityNum.letter)
//   var a = le.cityNum.letter
// }

const state = () => ({
  showCityNum: 1,
  letter:'',
  c: '北京'
})

const mutations = {
  pushCityNum(state, val) {
    state.showCityNum = val
  },
  changeLetter(state, val) {
    state.letter = val.letter
    state.c = val.city
  }
}


export default {
  namespaced: true,
  state,
  mutations,
}
