<template>
  <v-page
    :show-header="false"
  >
    <div
      ref="loginBox"
      class="login"
    >
      <h2 class="login-title">
        登录
      </h2>
      <input-keyboard
        @btnStyleVisible="btnStyleVisible"
        @phoneValue="phoneValue"
      />
      <div class="login-other">
        <dl class="login-other-dl">
          <dt>其他登录</dt>
          <dd @click="wechatLogin">
            <v-icon
              class="wechat-icon"
              name="weChat"
            />
            <p class="wechat-icon-text">
              微信登录
            </p>
          </dd>
        </dl>
      </div>
      <dl class="agree-rule">
        <dt @click="agree">
          <v-icon
            v-if="!isAgree"
            class="aree-icon"
            name="select"
          />
          <v-icon
            v-if="isAgree"
            class="aree-icon"
            name="selected"
          />
        </dt>
        <dd>
          我同意
          <router-link :to="{path:'/service'}">
            <span>《预约挂号服务协议》</span>
          </router-link>
          和
          <router-link :to="{path:'/private'}">
            <span>《隐私协议》</span>
          </router-link>
        </dd>
      </dl>
    </div>
    <div
      ref="loginButton"
      :class="btnstyle&&isAgree ? 'bottom-btn blue':'bottom-btn'"
      @click="loginBtn"
    >
      {{ btnMessage }}
    </div>
  </v-page>
</template>

<script>
import { encrypt } from '@/utils/index'
import { fetchWechatLogin } from '@/api/login'
import { getVerifyCode } from '@/api/common' /* 测试完要放开 */
import { isPhone } from '@/constants/rules'
import { Local } from '@/utils/storage'
import inputKeyboard from '@/components/LoginInput'
export default {
  components: {
    inputKeyboard
  },
  data () {
    return {
      phone: '',
      isAgree: true,
      btnMessage: '获取验证码',
      btnstyle: false,
      redirect: ''
    }
  },
  mounted () {
    this.redirect = this.$route.query.redirect
    this.touchMove()// 禁止页面滚动
  },
  methods: {
    agree () {
      this.isAgree = !this.isAgree
    },
    loginBtn () {
      if (this.btnstyle && this.isAgree) {
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
            fromPage: 1, // 代表从登陆页去获取验证码页
            redirect: urlName
          }})
        })
        /* 测试完要放开 */
      }
    },
    wechatLogin () {
      // this.$router.push({
      //   path: '/wechatTel'
      // })
      fetchWechatLogin().then((res) => {
        let urlName = ''
        if (this.redirect === '' || this.redirect === undefined) {
          urlName = '/' // 跳转到首页
        } else {
          urlName = this.redirect
        }
        if (!res.bind) {
          this.$router.replace({
            name: 'wechatTel',
            query: {
              redirect: urlName
            }
          })
        } else {
          this.$router.replace({ path: urlName })
        }
      })
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
  .login-other {
    padding-left: 60px;
    .login-other-dl {
      overflow: hidden;
      dt {
        float: left;
        margin-top: 10px;
        margin-right: 20px;
        font-size: 24px;
        color: #999;
      }
      dd {
        float: left;
        color: #00C25F;
        border: 2px solid #00C25F;
        border-radius:30px;
        .wechat-icon {
          float: left;
          margin-left: 40px;
          font-size: 40px;
          padding-top: 5px;
          padding-bottom: 5px;
        }
        .wechat-icon-text {
          float: left;
          margin-left: 27px;
          font-weight: bold;
          font-size: 24px;
          padding-top: 10px;
          padding-right: 57px;
        }
      }
    }
  }
  .agree-rule {
    margin-top: 156px;
    padding-left: 114px;
    dt {
      float: left;
      margin-right: 10px;
      .aree-icon {
        color: @fontColorBlue;
        font-size: 30px;
      }
    }
    dd {
      float: left;
      font-size: 24px;
      span{
        color: @fontColorBlue;
      }
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

/*数字键盘样式重写*/
// /deep/ .van-number-keyboard__title {
//   height: 60px;
//   line-height: 60px;
// }
// /deep/ .van-number-keyboard__close {
//   font-size: 28px;
//   width: 100%;
//   padding-right: 0;
// }
// /deep/ .van-key {
//   height:90px;
//   line-height:90px;
//   font-size: 40px;

// }
</style>
