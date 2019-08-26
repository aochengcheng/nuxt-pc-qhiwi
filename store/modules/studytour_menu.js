const state = () => ({
  studytour_menu: []
})

const mutations = {
    setStudyTourMenu(state,val){
        state.studytour_menu=val
    }
}


export  default {
    namespaced: true,
    state,
    mutations
}
