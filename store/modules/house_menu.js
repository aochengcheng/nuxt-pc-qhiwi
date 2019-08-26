const state = () => ({
  country: 11
})

const mutations = {
  setCountry(state, val) {
    state.country = val
  }
}

const actions = {
  setCountry({
    commit
  }, val) {
    commit('setCountry', val)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
