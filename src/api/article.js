import request from '@/utils/request'
// 获取列表
export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
// hover展示
export function hovershow(uid) {
 
  return request.jGet('/user/info', {'uid':uid,}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 获取用户列表
export function userList(query) {
  return request({
    url: '/user/list',
    method: 'get',
    params: query
  })
}
// 更改用户状态
   export function changeStatus(id,status) {
    return request.jPost('user/change/status', {'id':id,'status':status}).then( function(response){
      return response
  
    }).catch(function(err){
      console.log(err)
    })
  }
// 获取提现列表
export function getcashlist(query) {
  return request({
    url: 'cashlog/list',
    method: 'get',
    params: query
  })
}
// 是否允许提现 
export function cashapply(id) {
  console.log(id)
  return request.jPost('cashlog/apply', {'id':id}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 是否j拒绝提现 
export function cashrefuse(id,reason) {
  console.log(id)
  return request.jPost('cashlog/refuse', {'id':id,'reason':reason}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}


// 获取钱包列表
export function walletlist(query) {
  return request({
    url: 'wallet/list',
    method: 'get',
    params: query
  })
}

// 更改评论状态
export function changeCommentStatus(id) {
  return request.jPost('comment/delete', {'id':id}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}

// 是否允许评论通过 
export function commentagree(id) {
  console.log(id)
  return request.jPost('comment/agree', {'id':id}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}

// 是否j拒绝评论通过 
export function commentrefuse(id,reason) {
  console.log(id)
  return request.jPost('comment/refuse', {'id':id,'reason':reason}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 获取金币列表
export function coinloglist(query) {
  return request({
    url: 'coinlog/list',
    method: 'get',
    params: query
  })
}
// 同意解绑
export function agree(id,status) {
  return request.jPost('request/agree', {'id':id,'status':status}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 拒绝解绑
export function refuse(id,status) {
  return request.jPost('request/refuse', {'id':id,'status':status}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 获取底部菜单的配置
export function uploaderlist(query) {
  return request({
    url: 'menu/bottom/list',
    method: 'get',
    params: query
  })
}
// 提交底部菜单
export function uploaderadd(icon,name,icon_selected,name_selected,pos,type,version) {
  return request.jPost('menu/bottom/add', {'icon':icon,'name':name,'name_selected':name_selected,'icon_selected':icon_selected,'pos':pos,'type':type,'version':version,}).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 删除底部菜单
export function uploaderdelete(id) {
  return request.jPost('menu/bottom/delete', {'id':id}).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 底部菜单细节
export function uploaderdetail(version) {
  return request.jGet('menu/bottom/detail', {'version':version}).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 获取详情列表  mercenarytlist
export function mercenarylist(query) {
  return request({
    url: 'mercenary/list',
    method: 'get',
    params: query
  })
}
// 游戏列表获取
export function gamelist(query) {
  return request({
    url: 'active/egg/list',
    method: 'get',
    params: query
  })
}
// 游戏编辑
export function gameedit(row ) {
  console.log(row)
  return request.jPost('active/egg/edit', {"id":row.id,"coin":row.coin,"guess":row.guess,"answers": row.answers, "ticket": row.ticket,"icon": row.icon, }).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 游戏添加
export function gameadd(row ) {
  console.log(row)
  return request.jPost('active/egg/add', {"id":row.id,"coin":row.coin,"guess":row.guess,"answers": row.answers, "ticket": row.ticket,"icon": row.icon, }).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 游戏更改状态
export function gamechange(id ,status ) {
  
  return request.jPost('active/egg/status/change', {'id':id,'status':status}).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 反馈列表
export function feedbacklist(query) {
  return request({
    url: 'feedback/list',
    method: 'get',
    params: query
  })
}
// 反馈回复
export function feedreply(id ,content ) {
  return request.jPost('feedback/reply', {'id':id,'content':content}).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
//广告列表
export function adlist(query) {
  return request({
    url: 'menu/ad/list',
    method: 'get',
    params: query
  })
}
// 获取穿山甲列表
export function chuanadlist(query) {
  return request({
    url: 'oceanengine/ad/list',
    method: 'get',
    params: query
  })
}
// 广告添加
export function adadd(row ) {
  console.log(row)
  return request.jPost('menu/ad/add', {"coin":row.coin,"icon":row.icon,"index":row.index,"type": row.type, "data": row.data,"start_time": row.start_date,"end_time": row.end_date, }).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 广告更改状态
export function menuchange(id ,status ) {
  
  return request.jPost('menu/ad/status/change', {'id':id,'status':status}).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 广告编辑
export function adedit(row ) {
  console.log(row)
  return request.jPost('menu/ad/modify', {"id":row.id,"coin":row.coin,"hot":row.hot,"icon":row.icon,"type": row.type, "data": row.data,"start_time": row.start_date,"end_time": row.end_date,  }).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 穿山甲广告列表
export function chuanlist(query) {
  return request({
    url: 'oceanengine/list',
    method: 'get',
    params: query
  })
}
// 穿山甲添加
export function chuanadd(row ) {
  console.log(row)
  return request.jPost('oceanengine/add', {"id":row.id,"coin":row.coin,"name":row.name,"type": row.type, "secret": row.secret,"ad_id": row.ad_id, }).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 游戏编辑
export function chuanedit(row ) {
  console.log(row)
  return request.jPost('oceanengine/modify', {"id":row.id,"coin":row.coin,"name":row.name,"type": row.type, "secret": row.secret,"ad_id": row.ad_id, }).then( function(response){
    return response
  }).catch(function(err){
    console.log(err)
  })
}
// 登录列表
export function loginlist(query) {
  return request({
    url: 'login/log',
    method: 'get',
    params: query
  })
}














// 获取文章信息
export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}
// 创作文章
export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}
// 更新文章
export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

// 获取广告类型
export function fetchAdvertisement(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
// 获取视频列表
export function videolist(query) {
  return request({
    url: 'video/list',
    method: 'get',
    params: query
  })
}
// 删除视频
export function videodelete(id) {
  console.log(id)
  return request.jPost('video/delete', {'id':id}).then( function(response){
    return response

  }).catch(function(err){
    console.log(err)
  })
}
// 绑定请求
export function bangding(query) {
  return request({
    url: 'request/list',
    method: 'get',
    params: query
  })
}
// 获取评论
export function commentlist(query) {
  return request({
    url: 'comment/list',
    method: 'get',
    params: query
  })
}


// 获取用户类型
export function fetchUser(query) {

  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}