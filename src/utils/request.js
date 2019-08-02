import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

let basePath='/api' 
// 创建AXIOS实例
const service = axios.create({
  // baseURL: 'https://api.qkb-test.admin.lianzhuoxinxi.com', 
  // baseURL: basePath, 
  baseURL: process.env.VUE_APP_BASE_API,
  headers:{'X-TOKEN':localStorage.getItem('token')},
  withCredentials: true, // 跨域请求时发送cookie
  timeout: 30000, // request timeout
})

// //请求拦截器
service.interceptors.request.use(
  config => {
    // debugger;
    // 在发送请求之前做点什么
   
    if (store.getters.token) {
      //让每个请求携带token
      // ['X-TOKEN']是自定义头密钥
      // 请根据实际情况修改
      // config.headers['X-Token'] = getToken()
      // config.headers['X-Token'] = localStorage.getItem('token')
      // console.log(localStorage.getItem('token'))
    }
    return config
  },
  error => {  
     // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
// service.interceptors.response.use(
 /**
   * 如果要获取HTTP信息，如头或状态
   * 请返回响应=>响应
  */
  /**
   * 通过自定义代码确定请求状态
   * 这只是一个例子
   * 您还可以通过HTTP状态代码判断状态
   */
  // 把报错过滤掉？？？？？？？？？
  // response => {
  //      const res = response.data
     
    // const res={ 
    //   // code:20000,
    //       data:{token:"admin-token"}
    // }
    // res.data.token='admin-token';
    // console.log(res)
    // // 如果自定义代码不是200，则判断为错误。
    // if (res.code !== 200) {
    //   Message({
    //     message: res.message || 'error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
      // 50008:非法令牌；50012:其他登录客户端；50014:令牌过期；
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //      // 重新登录
    //     MessageBox.confirm('您已注销，可以取消以留在此页，或重新登录。', '确认注销', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(res.message || 'error')
    // } else {
    //   return res
    // }
  //   }else{
  //      return res   
  //   }
  // },
  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
// )

service.jGet = function(url, params){
  return service({
    url: url,
    method: 'get',
    params: params
  })
}

service.jPost = function(url, params){
  params = qs.stringify(params);
  return service({
    url: url,
    method: 'post',
    data: params
  })
}

export default service
