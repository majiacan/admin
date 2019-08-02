// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    hidden: true,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        hidden: true,
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'Dashboard' }
      }
    ]
  }
]

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]
