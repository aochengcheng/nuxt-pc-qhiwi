const state = () => ({
  hotdata: [],
  cate: 1
})

const mutations = {
  getHotData(state, hot) {
    state.hotdata = hot
  },
  changeCate(state, cate) {
    state.cate = cate
  }
}

const actions = {
  getHotData({
    commit
  }, hot) {
    commit('getHotData', hot)
  },
  changeCate({
    commit
  }, cate) {
    commit('changeCate', cate)
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
