<template>
  <v-page
    :show-header="false"
  >
    <div
      ref="loginBox"
      class="login"
    >
      <div class="login-title">
        <h2>输入验证码</h2>
        <div class="login-title-ts">
          <p>验证短信已发送至</p>
          <span class="phone">{{ getPhone }}</span>
          <m-icon
            :icon-liftshow="true"
            class="bj-phone"
            name="edit"
            desc="修改"
            @click.native="modification"
          />
        </div>
      </div>
      <div class="bj-input">
        <van-password-input
          :mask="false"
          :value="value"
          :gutter="20"
          :focused="show"
          @focus="show = true"
          @click="inputClick"
        />
      </div>
    </div>
    <ver-btn
      :class="btnstyle ? 'bottom-btn blue':'bottom-btn'"
      :is-begin="true"
      :btnstyle="btnstyle"
      :send-mobile="getPhone"
      @getBtnstyle="fetchStyle"
    />
    <van-number-keyboard
      v-model="value"
      :show="show"
      :maxlength="13"
      :transition="false"
    />
    <no-auth-dialog
      :visible.sync="noAuthVisible"
      :redirect="urlName"
      cancel-path="/"
      message="本平台所有挂号相关服务均需要实名认证，现在去实名认证"
    />
  </v-page>
</template>

<script>
import mIcon from '@/components/MIcon'
import verBtn from '@/components/VerificationBtn'
// import { decrypt, encrypt } from '@/utils/index'
import { decrypt, encrypt } from '@/utils/index'
import { fetchLogin, fetchWechatPhoneLogin } from '@/api/login'
import NoAuthDialog from '@/components/NoAuthDialog'
export default {
  components: {
    mIcon,
    verBtn,
    NoAuthDialog
  },
  data () {
    return {
      getPhone: '',
      value: '',
      btnstyle: false,
      loginMes: '',
      redirect: '',
      show: true,
      showBtn: false,
      fromPage: '',
      noAuthVisible: false, // 去实名认证弹窗
      urlName: '', // 去实名认证，完成后的路由定向地址
      wechatData: {
        mobile: '',
        code: '',
        ignore: false
      }
    }
  },
  watch: {
    value (val) {
      this.value = val.replace(/\D/g, '')
      if (val.length >= 6) {
        this.value = val.slice(0, 6)
        this.login()
      }
    }
  },
  created () {
    this.$nextTick(() => {
      document.querySelector('.van-number-keyboard').addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认事件(上下滑动)
      })
    })
    this.getPhone = decrypt(this.$route.query.phone)
    this.redirect = this.$route.query.redirect
    // this.phone = decPhone.replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3')
    this.fromPage = this.$route.query.fromPage
    this.touchMove()// 禁止页面滚动
  },
  methods: {
    modification () {
      if (this.fromPage === '2' || this.fromPage === 2) { // 返回微信登录绑定手机号页面
        this.$router.replace({ name: 'wechatTel', query: {
          redirect: this.redirect
        }})
      } else { // 返回普通登录输入手机号页面
        this.$router.replace({ path: '/login', query: {
          redirect: this.redirect
        }})
      }
    },
    fetchStyle (val) {
      this.btnstyle = val
    },
    login () {
      if (this.fromPage === '2' || this.fromPage === 2) { // 微信登录
        this.wechatLogin()
      } else { // 普通登录
        this.phoneLogin()
      }
    },
    phoneLogin () {
      fetchLogin(encrypt(this.getPhone), encrypt(this.value)).then((res) => {
        this.jumpPage(res.result)
      })
    },
    wechatLogin () {
      this.wechatData = {
        mobile: encrypt(this.getPhone),
        code: encrypt(this.value),
        ignore: false // 重新绑定为true
      }
      fetchWechatPhoneLogin({ ...this.wechatData }).then((res) => {
        if (res.bind) {
          this.$dialog.confirm({
            title: '',
            message: '该手机号已存在绑定微信，确定重新绑定？',
            confirmButtonText: '确定',
            confirmButtonColor: '#5386FF',
            cancelButtonText: '再想想',
            cancelButtonColor: '#999999',
            closeOnPopstate: true // 按返回按钮时弹出关闭
          }).then(_ => {
            this.wechatData.ignore = true // 重新绑定微信
            this.againBindWechat() // 重新绑定微信
          }).catch(_ => {
          })
        } else {
          this.jumpPage(res.auth)
        }
      })
    },
    againBindWechat () { // 重新绑定微信
      fetchWechatPhoneLogin(this.wechatData).then((res) => {
        this.jumpPage(res.auth)
      })
    },
    jumpPage (val) { // 跳转到首页或者实名，TO_AUTH("去实名"), TO_INDEX("去首页");
      if (val === 'TO_AUTH') { // 未实名
        let urlName = ''
        if (this.redirect === '' || this.redirect === undefined) {
          urlName = '/' // 去首页
        } else {
          urlName = this.redirect
        }
        // this.$dialog.confirm({
        //   title: '',
        //   message: '本平台所有挂号相关服务均需要实名认证，现在去实名认证',
        //   confirmButtonText: '去实名',
        //   confirmButtonColor: '#5386FF',
        //   cancelButtonText: '跳过',
        //   cancelButtonColor: '#999999'
        // }).then(_ => {
        //   this.$router.push({
        //     path: '/auth',
        //     query: {
        //       redirect: urlName
        //     }
        //   })
        // }).catch(_ => {
        //   this.$router.push({
        //     path: '/'
        //   })
        // })
        this.urlName = urlName
        this.noAuthVisible = true
      } else { // 登录
        if (this.redirect === '' || this.redirect === undefined) {
          this.$router.replace({
            path: '/'
          })
        } else {
          this.$router.replace({
            path: this.redirect
          })
        }
      }
    },
    inputClick () {
      // document.activeElement.blur()// 禁止拉起系统键盘
      this.show = true
    },
    touchMove () {
      this.$nextTick(() => {
        // 通过refs拿到dom元素, 给dom元素绑定touchmove事件, 其内容做操作
        this.$refs.loginBox.addEventListener('touchmove', function (e) {
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
    margin: 60px 0 90px 60px;
    h2{
      font-size: 46px;
      color: #333;
      font-weight: bold;
    }
    .login-title-ts{
      padding-top: 15px;
      font-size: 24px;
      overflow: hidden;
      p{
        float: left;
        margin-right: 10px;
      }
      .phone{
        float: left;
        margin-right: 10px;
        padding-top: 2px;
      }
      .bj-phone{
        float: left;
        color: @fontColorBlue;
      }

    }
  }
  .login-input {
    margin:0 60px 40px;
    .login-search {
      border-bottom: 2px solid #eee;
    }
  }
  .bj-input {
    padding: 0 53px;
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
/deep/ .van-number-keyboard__title {
  height: 60px;
  line-height: 60px;
}
/deep/ .van-number-keyboard__close {
  font-size: 28px;
  width: 100%;
  padding-right: 0;
}
/deep/ .van-key {
  height:90px;
  line-height:90px;
  font-size: 40px;
}
/deep/ .van-key--gray{
  font-size: 30px;
  background-color:transparent
}
/deep/ .van-password-input {
    margin: 42px 0 0;
    .van-password-input__security {
      height: 104px;
      li{
        line-height: 104px;
        border-bottom: 1PX solid #DDDDDD;
        font-size: 40px;
        color: #5386FF;
      }
    }
  }
/deep/ .van-password-input__cursor {
  width: 1PX;
  background-color: #5386FF;
}
</style>
