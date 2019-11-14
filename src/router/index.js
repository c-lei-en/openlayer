import Vue from 'vue'
import Router from 'vue-router'
import olmap from '@/components/olmap'
import cesium from '@/components/cesium';
import register from '../components/register.vue';
const routerPush = Router.prototype.push;
Router.prototype.push = function push(location){
  return routerPush.call(this,location).catch(error=>error)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/map',
      name: '',
      component: olmap
    },
    {
      path: '/login',
      component: register,
      name: '',
      hidden: true
    },
    {
      path:'/',
      component: register,
      name: '',
      hidden: true
    },
    {
      path:'/cesium',
      component: cesium,
      name: 'cesium'
    }
  ]
})
