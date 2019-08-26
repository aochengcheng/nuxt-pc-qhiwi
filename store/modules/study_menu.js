const state = () => ({
  study_menu: {},
  //   留学供应商
  merchant_menu: [],

  //   留学供应商咨询 参数
  m_query: {}
})

const mutations = {
  setStudyMenu(state, val) {
    state.study_menu = val
  },
  setMerchantMenu(state, val) {
    state.merchant_menu = val
  },

  setQuery(state, val) {
    const {

      sourceTitle,
      sourceDescription,
      showCity
    } = val
    state.m_query.sourceTitle = sourceTitle
    state.m_query.sourceDescription = sourceDescription
    state.m_query.showCity = showCity
  }
}

const actions = {
  setStudyMenu({
    commit
  }, val) {
    commit(setStudyMenu, val)
  },

  setMerchantMenu({
    commit
  }, val) {
    commit(setMerchantMenu, val)
  },

//   setQuery({
//     commit
//   }, val) {
//     commit(setQuery, val)
//   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
