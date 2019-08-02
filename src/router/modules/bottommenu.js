import Layout from '@/layout'

const bottommenuRouter = {
  path: '/bottommenu',
  component: Layout,
  // redirect: '/backstage/menu1/menu1-1',
  name: 'Bottommenu',
  meta: {
    title: '底部菜单配置',
    // icon: 'user'
  },
  children: [
    {
      path: 'bottommenu',
      name: 'bottommenu',
      component: () => import('@/views/bottommenu/bottommenu/index'),
      meta: { title: '底部菜单配置' }
    }
  ]
}

export default bottommenuRouter
