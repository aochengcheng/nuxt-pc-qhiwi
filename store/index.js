import Vue from 'vue'
import Vuex from 'vuex'
import hot from './modules/hot'
import house_menu from './modules/house_menu'
import immig_menu from './modules/immig_menu'
import study_menu from './modules/study_menu'
import studytour_menu from './modules/studytour_menu'
import cityNum from './modules/cityNum'

import {
  fetch
} from "~/plugins/axios/http.js";

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    yiminMenu: [],
    // 导航栏样式 index
    index: 0
  },
  mutations: {
    yiminSet(state, val) {
      state.yiminMenu = val
    },

    navBar(state,val) {
      state.index = val
    }
  },

  modules: {
    hot,
    house_menu,
    immig_menu,
    study_menu,
    studytour_menu,
    cityNum
  },
  actions: {
    async nuxtServerInit({
      commit,
      state
    }, {
      req,
      app,
      params
    }) {
      const {
        ErrCode,
        Result
      } = await fetch('/dhr/client/house/menu')

      if (ErrCode === '0000') {
        commit('house_menu/setCountry', Result)
      }

      //移民筛选
      const {
        ErrCode: err1,
        Result: res
      } = await fetch('/dhr/client/migrate/menu')
      // console.log('immig_menu======',res)
      if (err1 === '0000') {
        commit('immig_menu/getCountry', res)
      }

      // 移民供应商城市站 
      const {
        data: {
          all
        }
      } = await fetch('/dhr/showCity')
      // console.log('all::::::::::', all)
      commit('immig_menu/cityState', all)

      // 留学筛选
      const {
        ErrCode: err2,
        Result: {
          country,
          schoolType,
          rank,
          cost,
          TOEFL,
          IELTS
        }
      } = await fetch('/dhr/client/study_abroad/menu')

      if (err2 == '0000') {
        commit('study_menu/setStudyMenu', {
          country,
          schoolType,
          rank,
          cost,
          TOEFL,
          IELTS
        })
      }

      // 留学供应商
      const {
        ErrCode: err3,
        Result: lxcountry
      } = await fetch('/dhr/client/study_abroad/menu')

      // console.log('country=========', lxcountry.country)
      if (err3 == '0000') {
        commit('study_menu/setMerchantMenu', lxcountry.country)
      }

      // // 游学筛选menu
      const {
        ErrCode: err4,
        Result: yxmenu

      } = await fetch('/dhr/client/study_tour/menu')

      if (err4 == '0000') {
        commit('studytour_menu/setStudyTourMenu', yxmenu)
      }
      // console.log('tudytour_menu/setStudyTourMenu=========', yxmenu)
    }
  }
})

export default store
