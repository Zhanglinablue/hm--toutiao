<template>
  <div class='container'>
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
 <van-cell-group>
   <van-field
   :error-message="errMsg.mobile"
   @blur="checkMobile"
   v-model="loginForm.mobile"
   label="手机号"
   placeholder="请输入手机号"></van-field>
   <van-field
   @blur="checkCode"
   :error-message="errMsg.code"
   v-model="loginForm.code"
   label="验证码"
   placeholder="请输入验证码">
     <van-button slot="button" size="small" type="primary">发送验证码</van-button>
   </van-field>
 </van-cell-group>
 <div class="btn-box">
   <van-button @click="login" type="info" size="small" round block>登录</van-button>
 </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      errMsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkMobile () {
      // 判断不能为空
      if (!this.loginForm.mobile) {
        this.errMsg.mobile = '手机号不能为空'
        return false
      }
      // 判断格式是否正确
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        this.errMsg.mobile = '手机格式不正确'
        return false
      }
      this.errMsg.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMsg.code = '验证码必须为6位数字'
        return false
      }
      this.errMsg.code = ''
      return true
    },
    async login () {
      if (this.checkMobile() && this.checkCode()) {
        const data = await login(this.loginForm)
        this.updateUser({ user: data })// 更新用户信息
        // 登陆成功
        this.$gnotify({ type: 'success', message: '登陆成功' })
        let { redirectUrl } = this.$route.query
        this.$router.push(redirectUrl || '/')
      }
    },
    ...mapMutations(['updateUser'])
  }

}
</script>

<style lang="less" scoped>
  .btn-box {
     padding: 20px;
   }
</style>
