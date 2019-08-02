/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const chuanRouter = {
  path: '/chuan',
  component: Layout,
  // hidden:true,
//   redirect: '/advertisement/menu1/menu1-1',
  name: 'Chuan',
  meta: {
    title: '穿山甲广告',
   
  },
  children: [
    // {
    //   path: 'advertisement1',
    //   component: () => import('@/views/advertisement/advertisement/advertisementsort'), // Parent router-view
    //   name: 'advertisement1',
    //   meta: { title: '广告分类' },
    // },
    {
      path: 'chuan',
      name: 'chuan',
      component: () => import('@/views/chuan/chuan/index'),
      meta: { title: '穿山甲广告' }
    }
  ]
}

export default chuanRouter
