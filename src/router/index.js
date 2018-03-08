import Vue from 'vue'
import Router from 'vue-router'
import Recom from 'recom'
import Toplist from 'toplist'
import Search from 'search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recom',
      name: 'recom',
      component: Recom
    },
    {
      path: '/toplist',
      name: 'toplist',
      component: Toplist
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
