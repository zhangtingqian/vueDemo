import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'

import './utils/viewPort.js'

Vue.config.productionTip = false

new Vue({
  el: '#root',
  store,
  render: h => h(App)
})
