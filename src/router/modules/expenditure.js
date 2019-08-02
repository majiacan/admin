/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const expenditureRouter = {
  path: '/expenditure',
  component: Layout,
  redirect: '/expenditure/menu1/menu1-1',
  name: 'Expenditure',
  meta: {
    title: '支出管理',
    // icon: 'nested'
  },
  children: [
    // {
    //   path: 'menu1',
    //   hidden:true,
    //   component: () => import('@/views/nested/menu1/index'), // Parent router-view
    //   name: 'Menu1',
    //   meta: { title: 'menu1' },
    //   redirect: '/video/menu1/menu1-1',
    //   children: [
    //     {
    //       path: 'menu1-1',
    //       component: () => import('@/views/nested/menu1/menu1-1'),
    //       name: 'Menu1-1',
    //       meta: { title: 'menu1-1' }
    //     },
    //     {
    //       path: 'menu1-2',
    //       component: () => import('@/views/nested/menu1/menu1-2'),
    //       name: 'Menu1-2',
    //       redirect: '/nested/menu1/menu1-2/menu1-2-1',
    //       meta: { title: '用户管理' },
    //       children: [
    //         {
    //           path: 'menu1-2-1',
    //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //           name: 'Menu1-2-1',
    //           meta: { title: 'menu1-2-1' }
    //         },
    //         {
    //           path: 'menu1-2-2',
    //           component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //           name: 'Menu1-2-2',
    //           meta: { title: 'menu1-2-2' }
    //         }
    //       ]
    //     },
    //     {
    //       path: 'menu1-3',
    //       component: () => import('@/views/nested/menu1/menu1-3'),
    //       name: 'Menu1-3',
    //       meta: { title: 'menu1-3' }
    //     }
    //   ]
    // },
    {
      path: 'expenditure',
      name: 'expenditure',
      component: () => import('@/views/expenditure/expenditure/expenditure'),
      meta: { title: '支出管理' }
    }
  ]
}

export default expenditureRouter
