import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// import echarts from 'echarts'
import Clipboard from 'clipboard';  //剪切板

/**
 * 您不想使用mock-server
 * 您希望将MockJs用于模拟api
 * 您可以执行:mockXHR()
 *
 * 目前MockJs将在生产环境中使用
 * 请在上网前删除它!!'!
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' //设置元素-ui默认大小
})

// 寄存器全局实用程序过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
// Vue.prototype.$echarts = echarts 
Vue.prototype.Clipboard=Clipboard;
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
