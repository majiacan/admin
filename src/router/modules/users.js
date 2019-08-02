import Layout from '@/layout'

const userRouter = {
  path: '/users',
  component: Layout,
  // redirect: '/backstage/menu1/menu1-1',
  name: 'Users',
  meta: {
    title: '用户管理',
    // icon: 'user'
  },
  children: [
    {
      path: 'users',
      name: 'users',
      component: () => import('@/views/users/users/users'),
      meta: { title: '用户管理' }
    }
  ]
}

export default userRouter
