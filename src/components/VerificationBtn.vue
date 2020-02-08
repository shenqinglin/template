<template>
  <div
    ref="loginButton"
    @click="getMessage"
  >
    {{ btnMessage }}
  </div>
</template>

<script>
import { Local } from '@/utils/storage'
import { getVerifyCode } from '@/api/common'
export default {
  props: {
    isBegin: {
      type: Boolean,
      default: false
    },
    sendMobile: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      btnMessage: '重新发送',
      totalTime: '',
      canClick: true, // 添加canClick
      getTime: 0
    }
  },
  created () {
    this.init()
    this.$nextTick(() => {
      this.$refs.loginButton.addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认事件(上下滑动)
      })
    })
  },
  beforeDestroy () {
    if (this.timer) {
      window.clearInterval(this.timer)
    }
  },
  methods: {
    init () {
      const smsCode = Local.get('smsCode')
      this.totalTime = Math.floor(smsCode / 1000)
      this.countDown()
    },
    countDown () {
      if (!this.canClick) return // 防止重复点击
      this.canClick = false
      this.$emit('getBtnstyle', false)// 改变样式
      this.btnMessage = this.totalTime + 's后重新发送'
      this.timer = window.setInterval(() => {
        if (this.totalTime <= 0) {
          window.clearInterval(this.timer)
          this.$emit('getBtnstyle', true)// 改变样式
          this.btnMessage = '重新发送'
          this.canClick = true // 这里重新开启
        } else {
          this.$emit('getBtnstyle', false)// 改变样式
          this.totalTime--
          this.btnMessage = this.totalTime + 's后重新发送'
          Local.set('smsCode', this.totalTime * 1000)
        }
      }, 1000)
    },
    getMessage () {
      if (this.canClick) {
        getVerifyCode(this.sendMobile, 'LOGIN').then((res) => {
          Local.set('smsCode', res.endMilliseconds)
          this.totalTime = Math.floor(res.endMilliseconds / 1000)
          this.countDown()
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
</style>
