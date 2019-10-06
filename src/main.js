// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import AlertMsg from './components/shared/AlertMsg.vue'

Vue.use(Vuetify, { theme: {
  primary: '#00B1A8',
  secondary: '#00C853',
  accent: '#00C853',
  error: '#FF1744',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FF5722'
}})
Vue.component('app-alert', AlertMsg)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
