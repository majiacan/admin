import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

import userRouter from './modules/users'                      //用户
import videoRouter from './modules/video'                    //视频
import commentRouter from './modules/comment'               //评论

import glodRouter from './modules/glod';                    //金币
import tixianRouter from './modules/tixian';               //提现

import financeRouter from './modules/finance';            //财务

import walletRouter from './modules/wallet';        //钱包
import  bangdingRouter from './modules/bangding';        //绑定
import  bottommenuRouter from './modules/bottommenu';        //底部菜单配置
import mercenaryRouter from './modules/mercenary';        //底部菜单配置
import gameRouter from './modules/game';        //游戏配置
import feedbackRouter from './modules/feedback';  //反馈管理
import advertisementRouter from './modules/advertisement'    //广告
import chuanRouter from './modules/chuanshanjia'    //广告



/**

 * 详情请参见：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden:true   如果设置为true，项目将不会显示在边栏中（默认值为false）
 * always  show:true如果设置为true， 将始终显示根菜单
 *   如果未设置AlwaysShow，则当项有多个子路由时，

 *     它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect          如果设置为no redirect，则不会在breadcrumb中重定向
 * name:'router-name'           名称由<keep alive>使用（必须设置！！！！）
 * meta : {
    roles: ['admin','editor']    控制页面角色（可以设置多个角色）
    title: 'title'               侧边栏和面包屑中显示的名称（推荐集）
    icon: 'svg-name'              图标显示在侧边栏中
    noCache: true                如果设置为true，则不会缓存该页（默认值为false）
    affix: true                  如果设置为真，则标签将粘贴在“标签”视图中。
    breadcrumb: false            如果设置为false，该项将隐藏在breadcrumb中（默认值为true）
    activeMenu: '/example/list'  如果设置路径，侧边栏将突出显示您设置的路径。
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基页
 * 可以访问所有角色
 */
export const constantRoutes = [
   //新手导航
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  // 错误404
  {
    path: '/404',
    component: () => import('@/views/login/index'),
    hidden: true
  },
   // 错误401
   {
    path: '/401',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //首页
  {
    path: '/',
    component: Layout,
    hidden:true,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        hidden:true,
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', }
      }
    ]
  },
  userRouter,
  videoRouter,
  commentRouter,
  glodRouter,
  tixianRouter,
  financeRouter,
  walletRouter,
  bangdingRouter,
  bottommenuRouter,
  mercenaryRouter,
  gameRouter,
  feedbackRouter,
  advertisementRouter,
  chuanRouter,
  // 登录列表
  {
    path: '/login/log',
    // title:'登录记录',
    component: Layout,
    // component: () => import('@/views/loginlog/loginlog/index'),
    children: [
      {
        path: '/login/log/list',
       
        component: () => import('@/views/loginlog/loginlog/index'),
        name: 'loginlog',
        meta: { title: '登录记录'}
      }
    ]
  },
  // {
  //     path: '/icon',
  //     hidden:true,
  //      component: 'layout/Layout',
  //      children: [
  //       {
  //          path: 'index',
  //          component: 'views/icons/index',
  //          name: 'Icons',
  //           meta: { title: 'Icons', icon: 'icon', noCache: true }
  //         }
  //       ]
  //    },
  //指导页
 
    //概述
  
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  //权限
  
//icon
  

  /** when your routing map is too long, you can split it into small modules **/
  
  // /** 左边侧边路由 **/
  
 
  
  
//标签
  
//错误界面

//错误日志
 
//excel
 
  //亚索
 
  //pdf
 
//换肤
 
//clipboard路由
 
//外接连接
 

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router