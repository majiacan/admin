/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const videoRouter = {
  path: '/video',
  component: Layout,
  // redirect: '/video/menu1/menu1-1',
  name: 'Video',
  meta: {
    title: '视频管理',
    icon: ""
  },
  children: [
    {
      path: 'video1',
      hidden:true,
      component: () => import('@/views/video/video/sort'), // Parent router-view
      name: 'video1',
      meta: { title: '视频分类' },
    },
    {
      path: 'video',
      name: 'video',
      component: () => import('@/views/video/video/index'),
      meta: { title: '视频列表' }
    }
  ]
}

export default videoRouter
