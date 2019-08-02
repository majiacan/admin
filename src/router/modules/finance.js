/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const financeRouter = {
  path: '/finance',
  hidden:true,
  component: Layout,
  // redirect: '/finance/menu1/menu1-1',
  name: 'Finance',
  meta: {
    title: '财务管理',
    // icon: 'nested'
  },
  children: [
    {
      path: 'finance',
      name: 'finance',
      component: () => import('@/views/finance/finance/finance'),
      meta: { title: '财务支出' }
    },
    {
      path: 'financeProfit',
      name: 'financeProfit',
      component: () => import('@/views/finance/finance/financeProfit'),
      meta: { title: '财务收益' }
    }
  ]
}

export default financeRouter
