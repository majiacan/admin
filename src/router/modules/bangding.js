/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const bangdingRouter = {
  path: '/bangding',
  component: Layout,
  // redirect: '/tixian/menu1/menu1-1',
  name: 'Bangding',
   //component: () => import('@/views/tixian/tixian/tixian'),
  meta: {
    title: '解绑申请',
    // icon: 'money'
  },
  children: [
    {
      path: 'bangding',
      name: 'bangding',
      component: () => import('@/views/bangding/bangding/index'),
      meta: { title: '解绑申请' }
    }
  ]
}

export default bangdingRouter
