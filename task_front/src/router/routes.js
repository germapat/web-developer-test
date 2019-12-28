import paths from './paths'

export default [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/Main.vue'),
    meta: {
      requiresAuth: true
    },
    children: paths.map(path => route(path.path, path.view, path.name))
    // children: paths.map(path => route(path.path, path.component, path.name))
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/Register.vue')
  },
  {
    // Always leave this as last one
    path: '*',
    component: () => import('@/views/404.vue')
  }
]

function route (path, component, name) {
  return {
    name: component || name,
    path,
    component: resovle => import(`@/views/${component}.vue`).then(resovle),
    props: true,
    beforeEnter: (to, from, next) => {
      next()
    },
    beforeRouteUpdate (to, from, next) {
      next()
    }
  }
}
