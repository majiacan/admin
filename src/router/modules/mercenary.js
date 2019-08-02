import Layout from '@/layout'

const mercenaryRouter = {
  path: '/mercenary',
  component: Layout,
  // redirect: '/backstage/menu1/menu1-1',
  name: 'Mercenary',
  meta: {
    title: '师徒',
    // icon: 'user'
  },
  children: [
    {
      path: 'mercenary',
      name: 'mercenary',
      component: () => import('@/views/mercenary/mercenary/index'),
      meta: { title: '师徒管理' }
    }
  ]
}

export default mercenaryRouter
