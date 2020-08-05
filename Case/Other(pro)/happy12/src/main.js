import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios'
import 'iview/dist/styles/iview.css';

Vue.use(iView)

Vue.config.productionTip = false;

Vue.prototype.EH = new Vue();
Vue.prototype.Ajax = axios;

window.hostDomain = 'http://127.0.0.1:8888/'


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
