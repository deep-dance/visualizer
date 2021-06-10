import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import VueRouter from 'vue-router'


// import DMX from 'dmx'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({ 
  routes: [
    {
      path: "/", 
      component: App 
    },
    {
      path: "/:figureIdx", 
      component: App 
    }
  ]
 
},
)

new Vue({
  store,
  router,
  render: h => h(App)
  // render(h) {
  //   if (window.location.pathname == '/dmx')
  //     return h(DMX)
  //   else
  //     return h(App)
  // }
}).$mount('#app')



