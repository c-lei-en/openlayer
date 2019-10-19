import Vue from 'vue'
import Router from 'vue-router'
import olmap from '@/components/olmap'
import register from '../components/register.vue';

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
    }
  ]
})
