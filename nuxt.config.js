export default {
  mode: 'universal',
  env: {
    BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '去海外网',
    meta: [{
        charset: 'utf-8'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    
  },

  router: {
    middleware: 'screen'
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'pink',
    height: '4px'
  },
  vender: [
    'element-ui'
  ],
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'swiper/dist/css/swiper.css',
    '@assets/css/reset.scss',
    'vue-photo-preview/dist/skin.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '@/plugins/element-ui',
      ssr: true
    },
    // {
    //   src: '@/plugins/axios/http',
    //   ssr: false
    // },
    {
      src: '@/plugins/vue-swiper',
      ssr: false
    },
    {
      src: '@/plugins/vue-lazyload',
      ssr: false
    },
    // vue过滤器
    {
      src: '@/plugins/filter',
      ssr: false
    },
    // vue-video-player
    {
      src: '@/plugins/vue-video-player',
      ssr: false
    },
    {
      src: '@/plugins/preview',
      ssr: false
    },
    {
      src: '@/plugins/persistedstate',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    proxy: true, // 表示开启代理
    //  prefix: '/dhr', // 表示给请求url加个前缀 /dhr
    credentials: true // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/dhr': {
      target: 'http://qhiwi.com',
      changeOrigin: true,
      // ws: true,
      // pathRewrite: {
      //   '^/dhr': ''
      // }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: {
      allChunks: true
    }, // 将头部css打包
    vendor: ['axios', 'element-ui'], //为防止重复打包
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  }
}
