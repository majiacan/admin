/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const glodRouter = {
  path: '/glod',
  component: Layout,
  redirect: '/glod/menu1/menu1-1',
  name: 'Glod',
  meta: {
    title: '金币管理',
    // icon: 'nested'
  },
  children: [
    {
      path: 'glodlist',
      name: 'glodlist',
      component: () => import('@/views/glod/glod/glodlist'),
      meta: { title: '金币明细表' }
    },
    {
      path: 'glodvideo',
      hidden:true,
      name: 'glodvideo',
      component: () => import('@/views/glod/glod/glodvideo'),
      meta: { title: '视频金币规则' }
    },
    {
      path: 'glodactive',
      hidden:true,
      name: 'glodactive',
      component: () => import('@/views/glod/glod/glodactive'),
      meta: { title: '活动金币规则' }
    },
  ]
}

export default glodRouter
