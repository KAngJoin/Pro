import Vue from 'vue'
import Router from 'vue-router'
import Util from '../libs/util'
import iView from 'iview';
import { routers } from './router';

Vue.use(Router)

const RouterConfig = {
  routes: routers
}
const router = new Router(RouterConfig)
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  next()
  // if (!Cookies.get('_admin') && to.name !== 'login' && to.name === 'echart') {
  //   //未登录且前往的不是登陆页面
  //   next({
  //     name: 'login'
  //   });
  // } else if (Cookies.get('_admin') && to.name === 'login') {
  //   //已登录且前往登录页面
  //   next({
  //     path: '/echart'
  //   });
  // } else {
  //   next()
  // }
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;

