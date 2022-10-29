import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import Index from '../components/Index.vue'
import Detail from '../components/Detail.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Form from '../components/Form.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      meta: { requiresAuth: false }
    },
    {
      path: '/:id',
      name: 'detail',
      component: Detail,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/upload',
      name: 'upload',
      component: Form,
      meta: { requiresAuth: true }
    }

  ]
});

router.beforeEach((to, from) => {
  const store = useAuthStore();
  if (to.meta.requiresAuth && !store.authVal.hasOwnProperty("token")) {
    return {
      path: '/login'
    }
  }
})

export default router
