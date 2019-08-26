import {
  fetch
} from "~/plugins/axios/http.js";
const state = () => ({
  immig_country: [],
  // 供应商city站
  city: [],

  test: {}
})

const mutations = {
  getCountry(state, val) {
    state.immig_country = val
  },
  cityState(state, val) {
    state.city = val
  },
  test(state, val) {
    const {

      sourceTitle,
      sourceDescription,
      showCity
    } = val
    state.test.sourceTitle = sourceTitle
    state.test.sourceDescription = sourceDescription
    state.test.showCity = showCity
  }
}

const actions = {
  getCountry({
    commit
  }, val) {
    commit(getCountry, val)
  },

  cityState({
    commit
  }, val) {
    commit(cityState, val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
