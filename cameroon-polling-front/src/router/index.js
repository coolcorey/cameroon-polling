import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import editPoll from '@/pages/editPoll'
import viewPoll from '@/pages/viewPoll'

import atui from 'at-ui'
import atuistyle from 'at-ui-style'
import vueresource from 'vue-resource'

Vue.use(Router)
Vue.use(atui)
Vue.use(atuistyle)
Vue.use(vueresource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/editPoll/:pollId?',
      name: 'editPoll',
      component: editPoll
    },
    {
      path: '/viewPoll/:pollId',
      name: 'viewPoll',
      component: viewPoll
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
