// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
// import echarts from 'echarts'
import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css';


var Cesium = require('../node_modules/cesium/Source/Cesium.js')

Vue.prototype.Cesium = Cesium;


// Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
});


router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
