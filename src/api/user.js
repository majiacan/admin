import request from '@/utils/request'
// import Axios from 'axios';
// import qs from 'qs';

let jPost = (url, params, success, error)=>{
   return request.jPost(url, params).then(res => {
     return res.data;
   }).then(res => {
     if(res.code && res.code === 200 && typeof success === 'function') success(res.data, res);
     else if(typeof error === 'function') error(res.info, res);
     return res;
   }).catch(err => {});
};
// 登录
export function login(jdata) {
  console.log(jdata)
  return request.jPost('/login', jdata).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 验证码
export function verify() {
  return request.jGet('/verify/login').then(function (response) {
    return response  //返回得到的二进制图片
  }).catch(function (error) {
    console.log(error);
}) 
}

// 获取用户信息
export function getInfo(token) {
  console.log(token)
  return request({
    url: '/user/info1',
    method: 'get',
    params: { token }
  })
}

export function simplePush(data, success, error){
  return jPost('/simple_push', data, success, error);
}

// 退出登录
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
