import axios from 'axios'
import Vue from 'vue'
let mm = `http://qhiwi.com`
let host = 'http://120.78.158.34/'
let dhr = '/dhr/'
// axios.defaults.baseURL = host
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000




// request拦截器
axios.interceptors.request.use(
  config => {
    // if (getToken()) {
    //     config.headers['X-Token'] = getToken()
    // }     
    // if (config.method == 'get') {
    //   config.params['showCityNum'] = 3
    // }
    // console.log(config)
    return config
  },
  error => {
    Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {},cityNum=3) {
  // console.log(process.env.BASE_URL)
  // Object.assign(params,{showCityNum: cityNum})
  console.log('params：：：',params)
  return new Promise((resolve, reject) => {
    axios.get(process.env.BASE_URL + url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
console.log('process.env.BASE_URL:::::::::::', process.env.BASE_URL)
export function post(url, data = {}) {
  // console.log(process.env.BASE_URL)
  return new Promise((resolve, reject) => {
    axios.post(process.env.BASE_URL + url, data, {
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

Vue.prototype.$fetch = fetch


// export default function({ $axios, redirect }){
//     $axios.onRequest(config=>{
//         if(config.method="get"){

//             // config.params['showCityNum'] =  3
//         }
//     })
// }
