/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const feedbackRouter = {
  path: '/feedback',
  component: Layout,
  name: 'Feedback',
  meta: {
    title: '反馈管理',
    // icon: 'nested'
  },
  children: [
    {
      path: 'feedback',
      name: 'feedback',
      component: () => import('@/views/feedback/feedback/feedback'),
      meta: { title: '反馈管理' }
    },
  ]
}

export default feedbackRouter
