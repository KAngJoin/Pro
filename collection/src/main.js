import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
  routes: routes
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')