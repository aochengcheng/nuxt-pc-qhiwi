import {
  fetch
} from "~/plugins/axios/http.js";
import axios from 'axios'
export default function (ctx) {
  // console.log('我是中间件', ctx.route)
  // console.log('我是路由', ctx.route.path.match(/^\/\w+/))
  const path =  ctx.route.path.match(/^\/\w+/)
  const pathModel = [
    '',
    '/house',
    '/immig',
    '/study',
    '/studytour',
    '/news',
    '/about'
  ]

  const  index = pathModel.findIndex(item => {
    // console.log(item)
    return item == path
  })

  ctx.store.commit('navBar',index)

  console.log('index:::',ctx.store.state.index)
  


  // request拦截器
  axios.interceptors.request.use(
    config => {
      // if (getToken()) {
      //     config.headers['X-Token'] = getToken()
      // }     
      if (config.method == 'get') {
        config.params['showCityNum'] = ctx.store.state.cityNum.showCityNum
      }
      // console.log(config)
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

}
