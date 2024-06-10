import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Votar',
    name: 'Votar',
    component: () => import('../views/VotarView.vue')
  },
  {
    path: '/Resultados',
    name: 'Resultados',
    component: () => import('../views/ResultadosView.vue')
  },
  //solo para checar como se ve la vista del funcionario Y EL LOGIN
  {
    path: '/FuncionarioLogin',
    name: 'FuncionarioLogin',
    component: () => import('../views/FuncionarioLog.vue')
  },


  {
    path: '/FuncionarioVista',
    name: 'FuncionarioVista',
    component: () => import('../components/Funcionario.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
