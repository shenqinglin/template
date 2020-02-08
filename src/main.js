import Vue from 'vue'
import App from './App'
import store from './store'
import 'amfe-flexible'
import './components/index'
import './plugins/vant'
import 'swiper/dist/css/swiper.min.css'
import Popup from '@/components/popup.js'

Vue.prototype.$popup = Popup.install
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
