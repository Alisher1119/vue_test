import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'

import { BootstrapVue } from 'bootstrap-vue'
import Autocomplete from '@trevoreyre/autocomplete-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(Vuex)
Vue.use(Autocomplete)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
