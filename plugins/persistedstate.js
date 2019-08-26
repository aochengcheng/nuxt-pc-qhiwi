import persistedstate from  'vuex-persistedstate'
console.log('val:::::::',232322222222)

export default ({ store, isHMR }) => {
    if (isHMR) return
    if (process.client) {
      window.onNuxtReady(() => {
        persistedstate({
          storage: window.sessionStorage,
          
        })(store)
      })
    }
  }