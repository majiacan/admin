/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const advertisementRouter = {
  path: '/advertisement',
  component: Layout,
  // hidden:true,
//   redirect: '/advertisement/menu1/menu1-1',
  name: 'Advertisement',
  meta: {
    title: '广告菜单配置',
   
  },
  children: [
    // {
    //   path: 'advertisement1',
    //   component: () => import('@/views/advertisement/advertisement/advertisementsort'), // Parent router-view
    //   name: 'advertisement1',
    //   meta: { title: '广告分类' },
    // },
    {
      path: 'advertisement',
      name: 'advertisement',
      component: () => import('@/views/advertisement/advertisement/advertisement'),
      meta: { title: '广告菜单配置' }
    }
  ]
}

export default advertisementRouter
