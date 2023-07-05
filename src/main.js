import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import cors from 'cors'
import CKEditor from '@ckeditor/ckeditor5-vue2';

import './plugins/select'
import './plugins/highlight'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-jquery/dist/vueJquery'

export const jQueryMixin = {
  method: {
      init() {}
  }
} 

Vue.use( CKEditor );
Vue.use(cors)
Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
//Vue.use(VueMask)
Vue.config.productionTip = false

new Vue({

  router,
  render: h => h(App)
}).$mount('#app')



