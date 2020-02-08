<template>
  <v-page
    :show-header="false"
  >
    <div
      ref="loginBox"
      class="login"
    >
      <h2 class="login-title">
        首次登录需绑定手机号
      </h2>
      <input-keyboard
        @btnStyleVisible="btnStyleVisible"
        @phoneValue="phoneValue"
      />
    </div>
    <div
      ref="loginButton"
      :class="btnstyle ? 'bottom-btn blue':'bottom-btn'"
      @click="loginBtn"
    >
      {{ btnMessage }}
    </div>
  </v-page>
</template>

<script>
import { encrypt } from '@/utils/index'
import { isPhone } from '@/constants/rules'
import { getVerifyCode } from '@/api/common' /* 测试完要放开 */
import { Local } from '@/utils/storage'
import inputKeyboard from '@/components/LoginInput'

export default {
  components: {
    inputKeyboard
  },
  data () {
    return {
      btnMessage: '获取验证码',
      btnstyle: false,
      redirect: '',
      phone: ''
    }
  },
  mounted () {
    this.redirect = this.$route.query.redirect
    this.touchMove()// 禁止页面滚动
  },
  methods: {
    loginBtn () {
      if (this.btnstyle) {
        const phone = this.phone.replace(/\ +/g, '')
        if (!isPhone(phone, this)) { // 请输入手机号
          this.$toast('您输入的手机号码格式有误')
          return false
        }
        let urlName = ''
        if (this.redirect === '' || this.redirect === undefined) {
          urlName = '/' // 去首页
        } else {
          urlName = this.redirect
        }
        /* 测试完要放开 */
        getVerifyCode(phone, 'LOGIN').then((res) => {
          Local.set('smsCode', res.endMilliseconds)
          this.$router.replace({ name: 'Verification', query: {
            phone: encrypt(phone),
            fromPage: 2, // 代表从微信绑定手机号页去获取验证码页
            redirect: urlName
          }})
        })
        /* 测试完要放开 */
      }
    },
    ifshow () {
      this.show = false
    },
    btnStyleVisible (val) {
      this.btnstyle = val
    },
    phoneValue (val) {
      this.phone = val
    },
    touchMove () {
      this.$nextTick(() => {
        // 通过refs拿到dom元素, 给dom元素绑定touchmove事件, 其内容做操作
        this.$refs.loginBox.addEventListener('touchmove', function (e) {
          e.preventDefault() // 阻止默认事件(上下滑动)
        })
        this.$refs.loginButton.addEventListener('touchmove', function (e) {
          e.preventDefault() // 阻止默认事件(上下滑动)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.login {
  overflow: hidden;
  min-height: 1000px;
  .login-title {
    font-size: 46px;
    margin: 60px 0 90px 60px;
    color: #333;
    font-weight: bold;
  }
  .login-input {
    margin:0 60px 40px;
    overflow: hidden;
    position: relative;
    .border-bottom;
    .login-p{
      font-size: 40px;
      height: 50px;
      float: left;
      padding-bottom: 24px;
      color: #333;
    }
    .login-placeholder{
      position: absolute;
      left: 0;
      top: 0;
      font-size: 40px;
      color: #ddd;
    }
    .login-search {
      border-bottom: 2px solid #eee;
    }
    .login-animation {
      float: left;
      width: 1PX;
      height: 40px;
      margin-top: 8px;
      margin-left: 4px;
      background-color: #5386FF;
      -webkit-animation: 1s van-cursor-flicker infinite;
      animation: 1s van-cursor-flicker infinite;
    }
    .login-clear {
      font-size: 30px;
      position: absolute;
      right: 10px;
      top: 15px;
      color: #ddd;
    }
  }
}
.bottom-btn {
  position: absolute;
  bottom: 355px;
  left: 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  overflow: hidden;
  background: @backgroundColorGray;
  color: #999;
  font-size: 32px;
}
.blue {
  background: @backgroundColorBlue;
  color: #fff;
}
</style>
