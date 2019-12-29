// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import App from './App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import VueLodash from 'vue-lodash'
import VueFilterDateFormat from 'vue-filter-date-format';
import ApiService from './services/ApiService'
import { TokenService } from './services/StorageService'

// Notifications component
import Notifications from "vue-notification";

// Sync store with router
sync(store, router)
Vue.use(VueFilterDateFormat);
Vue.use(VueLodash, { name: 'lodash' })

ApiService.init(process.env.VUE_APP_ROOT_API)

Vue.config.productionTip = false

Vue.use(Notifications, { max: 1 })

const accessToken = TokenService.getToken()

if (accessToken) {
  ApiService.setHeader()
}

Vue.mixin({
  data: function () {
    return {
      get globalrowsPerPageItems () {
        return [5, 10, 15, 20]
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
