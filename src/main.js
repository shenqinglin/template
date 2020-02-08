import Vue from 'vue'
// import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './store'
import 'amfe-flexible'
import './plugins/vant'
import 'swiper/dist/css/swiper.min.css'
Vue.config.productionTip = false
// FastClick.attach(document.body)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
