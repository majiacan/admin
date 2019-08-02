import Layout from '@/layout'

const gameRouter = {
  path: '/game',
  component: Layout,
  name: 'Game',
  meta: {
    title: '游戏配置',
    // icon: 'nested'
  },
  children: [
    {
      path: 'game',
      name: 'game',
      component: () => import('@/views/game/game/index'),
      meta: { title: '游戏配置' }
    },
  ]
}

export default gameRouter
