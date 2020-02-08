<template>
  <span
    class="countdown"
    :class="sended === 'SENDING' ? 'grey' : 'blue' "
    @click="sended !== 'SENDING' ? getMessage() : '' "
  >
    {{ showText }}
  </span>
</template>

<script>
import { getVerifyCode } from '@/api/common'
import { CHECK } from '@/constants/rules'
import { Local } from '@/utils/storage'
const prefix = 'SMS_'
export default {
  name: 'CountDown',
  props: {
    mobile: {
      type: String,
      default: ''
    },
    smsKey: {
      type: String,
      default: ''
    },
    autoSend: {
      type: Boolean,
      default: false
    },
    dutySourceId: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      surplusTime: '',
      timer: null,
      sended: 'INIT' // INIT--默认值 SENDING---发送中 SENDED--已发送 SENDING时，需要根据状态更改颜色
    }
  },
  computed: {
    showText () {
      if (this.surplusTime > 0 || this.sended === 'SENDING') {
        return `${this.surplusTime}s`
      }
      if (this.sended === 'SENDED') {
        return '重新发送'
      }
      return '获取验证码'
    },
    tipNull () {
      return this.smsKey === 'ORDER_CODE' ? '请选择就诊人' : '请输入手机号'
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    loop () {
      this.sended = 'SENDING'
      this.timer = setInterval(this.countDown, 1000)
      this.countDown()
    },
    countDown () {
      if (this.surplusTime < 1) {
        this.sended = 'SENDED'
        clearInterval(this.timer)
      } else {
        this.surplusTime--
      }
    },
    getMessage () {
      const valid = CHECK.isPhone(this.mobile, this, { tipNull: this.tipNull })
      if (valid) {
        const cachedData = Local.get(`${prefix}${this.mobile}_${this.smsKey}`)
        if (cachedData) {
          this.sended = true
          this.surplusTime = cachedData
          this.loop()
        } else {
          getVerifyCode(this.mobile, this.smsKey, this.dutySourceId).then(res => {
            const time = parseInt(res.endMilliseconds / 1000)
            // Local.set(`${prefix}${this.mobile}_${this.smsKey}`, time)
            this.surplusTime = time
            this.loop()
          })
        }
      }
    },
    clearCountdown () {
      clearInterval(this.timer)
      this.surplusTime = ''
      this.sended = 'INIT'
    }
  }
}
</script>

<style lang="less" scoped>
.grey{
  color: #999;
}
.blue {
  color: #5386FF;
}
</style>
