import { login, logout, getInfo,  verify,uploader} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { Message } from 'element-ui';
import { promises } from 'fs';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {


  // 上传图片
  verify() {
    return new Promise((resolve, reject) => {
      verify().then(response => {
    
        resolve(response)
       
      }).catch(error => {
      
        reject(error)
      })
    })
  },
  // 用户登录  
  login({ commit }, userInfo) {
    const { username, password,verify } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, verify:verify }).then(response => {
        console.log(response)
        var level=response.data.data.level
        localStorage.setItem('level',level)
        var code=response.data.code
        var info=response.data.info
         // 登录成功后直接设置为管理员
        if(code==200){
         const data={token:'admin-token'}
         // const { data } = response
         commit('SET_TOKEN', data.token)
         console.log(data.token)
         setToken(data.token)
         console.log('登录成功的返回值',response)
         resolve(response)
        }
        else{
        Message({
         message: info,
         type: 'warning'
        })
        }

        // if(code==0){
        //   Message({
        //     message: '账户或密码错误',
        //     type: 'warning'
        //    })
        // }
      
      })
      .catch(error => {
        alert('验证码错误')
         reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    console.log('执行了')
    return new Promise((resolve, reject) => {
      let data = {
        avatar:'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: "I am a super administrator",
        name: "Super Admin",
        roles:["admin"]
      };
      commit('SET_ROLES', data['roles']);
      commit('SET_NAME', data['name']);
      commit('SET_AVATAR', data['avatar']);
      commit('SET_INTRODUCTION', data['introduction']);
      return resolve(data);
    })
  },

  // 用户退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        localStorage.setItem('level','')
        localStorage.setItem('username','')
        localStorage.setItem('userid','')
        localStorage.setItem('videoid','')
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // 基于角色生成可访问的动态路由
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // 动态添加可访问的路由
      router.addRoutes(accessRoutes)

      // 重置已访问视图和缓存视图
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}