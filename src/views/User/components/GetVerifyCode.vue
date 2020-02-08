<template>
  <div class="btn-wrap">
    <div
      v-if="getCodeBtn"
      class="btn-get"
      @touchend="onGetBtnClick"
    >
      {{ btnText }}
    </div>
    <div
      v-if="!getCodeBtn"
      class="count-time"
    >
      {{ timeCount }}s
    </div>
  </div>
</template>

<script>
// 此组件只完成发送验证码功能，发送验证码时传递的smsKey需要传进来
import { doubleNum } from '@/utils'
import { countTimes } from '@/constants'
import { getVerifyCode } from '@/api/common'
import { CHECK } from '@/constants/rules'
export default {
  props: {
    phone: {
      type: String,
      default: ''
    },
    smsKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      timeCount: countTimes,
      btnText: '获取验证码',
      getCodeBtn: true,
      timer: -1,
      canClick: true
    }
  },
  methods: {
    onGetBtnClick () { // 获取验证码点击
      if (this.canClick === true && this.checkPhone()) {
        this.getVerifyCode()
        this.canClick = false
      }
    },
    checkPhone () { // 校验传入的手机号
      return CHECK.isPhone(this.phone, this)
    },
    getVerifyCode () { // 调接口发送验证码
      getVerifyCode(this.phone, this.smsKey).then(data => {
        this.timeCount = Math.ceil(data.endMilliseconds / 1000)
        this.getCodeBtn = false
        this.btnText = '重新获取'
        this.countDown()
      })
    },
    countDown () { // 倒计时
      this.clearTimer()
      this.timer = setInterval(_ => {
        this.timeCount = doubleNum(this.timeCount - 1)
        if (this.timeCount <= 0) {
          this.clearTimer()
          this.getCodeBtn = true
          this.canClick = true
          this.timeCount = countTimes // 清除定时器时给一个默认的倒计时秒数，在获取验证码接口里会被overWritten
        }
      }, 1000)
    },
    clearTimer () { // 清除定时器
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .btn-wrap {
    .count-time {
      color: #DDDDDD;
    }
    .btn-get {
      color: #5386FF;
    }
  }

</style>
