import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'usuario',
      component: () => import('./views/Usuario.vue')
    },
    {
      path: '/movimentacao',
      name: 'movimentacao',
      component: () => import('./views/Movimentacao.vue')
    }
  ]
})
