<template>
  <div class="login-container" style='cursor:pointer '>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">联卓后台管理系统</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <!-- <svg-icon icon-class="user" /> -->
          <i class='el-icon-user-solid'></i>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1" 
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写已打开" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <!-- <svg-icon icon-class="password" /> -->
            <i class='el-icon-key'></i>
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.native="checkCapslock"  
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password' ? 'el-icon-help' : 'el-icon-s-help'" />
            <!-- <i class='el-icon-help'></i> -->
          </span>
        </el-form-item>
      </el-tooltip>
      <div class='box'>
         <div class='yanzhengma'>
              <el-form-item prop="yanzhengma" class='input'>
              <!-- <span class="svg-container">
                <i class="el-icon-phone" />
              </span> -->
              <el-input
                ref="verify"
                v-model="loginForm.verify"
                placeholder="验证码"
                name="verify"
                type="text"
                tabindex="3"
                auto-complete="on"
                class='input-button'
              />
            </el-form-item>
        </div>
        <div class='new'>
             <img  class="image" v-bind:src="image1+image" />
             <div class='new-button' @click='newimg'><el-button type="primary" class='button-button'>刷新</el-button></div>
        </div>

      </div>
      
       
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div style="position:relative">
        <div class="tips">
          <span>请严格遵守公司安全规定</span>
          
        </div>
        <div class="tips">
          <span>按照相关流程操作后台管理系统</span>
          
        </div>

        <!-- <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          其他登录方式
        </el-button> -->
      </div>
    </el-form>

    <!-- <el-dialog title="Or connect with" :visible.sync="showDialog">
     不能在本地模拟，请结合您自己的业务模拟！！！！
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog> -->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'  //验证
import SocialSign from './components/SocialSignin'
import { constants } from 'crypto';


export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    return {
      //每次登陆时显示的文字
      loginForm: {
        username: '',
        password: '',
        verify:'',
       
      },
      // 登陆规则
      loginRules: {
        username: [
          // { required: true, trigger: 'blur', validator: validateUsername }
          ],
        password: [
          // { required: true, trigger: 'blur', validator: validatePassword }
          ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      image1:'data:image/png;base64,',
      image:''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
   this.getyanzhengma()

  },
  // 如何设置登陆
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    newimg(){
     this.getyanzhengma()
    },
    checkCapslock({ shiftKey, key } = {}) {
      // if (key && key.length === 1) {
      //   if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
      //     this.capsTooltip = true
      //   } else {
      //     this.capsTooltip = false
      //   }
      // }
      // if (key === 'CapsLock' && this.capsTooltip === true) {
      //   this.capsTooltip = false
      // }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登陆提交
    handleLogin() {
      localStorage.setItem('username',this.loginForm.username)
      console.log(this.loginForm)
      this.$refs.loginForm.validate(valid => {
    
    
          this.$store.dispatch('user/login', this.loginForm)
            .then((res) => {
        
              this.$router.push({ path: '/users/users'})
           
              this.loading = false
              console.log('页面接收到成功回调',res)
            }).catch(() => {
              console.log('9999 ')
              this.$router.push({ path:'/login/index'})
              this.loading = false
            })
      
      })
    },
    getyanzhengma(){
          this.$store.dispatch('user/verify')
            .then((response) => {
             console.log(response)
             var image=response.data.data.code
             var token=response.data.data.token
             localStorage.setItem('token',token)
            
             
             this.image=image
            })
            .catch((err) => {
              console.log('9999');
              this.loading = false
            })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.image{
  display: inline-block;
  width: 120px;
  height: 50px;
  border-radius: 7px;
  // margin-left: 235px;
}
.new-button{
  margin-left: 5px;
  width: 100px;
  height: 49px;
 
}
.button-button{
  width: 100%;
  height: 100%;
}
.new{
  display: flex;
}
.box{
  display: flex
}
.yanzhengma{
  display: flex;
  width: 240px;
  padding-right: 10px
 
}
.input-button{
  width: 212px;
}
.input{
  display: flex
}
</style>