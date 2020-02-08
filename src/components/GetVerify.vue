<template>
  <van-popup
    v-show="visible"
    v-model="isShow"
    :close-on-click-overlay="closeOnClickOverlay"
  >
    <div class="wrap-inner">
      <div class="close">
        <div
          class="icon-wp"
          @click="onClose"
        >
          <v-icon
            name="close"
            class="close-icon"
          />
        </div>
      </div>
      <div class="tip">
        <div class="tip-text">
          验证短信已发送至
        </div>
        <phone-separate :tel="phone" />
      </div>
      <div class="input-wrap">
        <input
          v-model="code"
          type="text"
          class="input"
          placeholder="请输入验证码"
          :maxlength="verifyCodeLen"
          @focus="onInputFocus"
          @blur="onInputBlur"
        >
        <v-icon
          v-if="showClearIcon"
          name="clear"
          class="clear-icon"
          @touchend.native="onIconClear"
        />
        <span
          v-if="showTimeCount"
          class="count-down"
        >
          {{ timeCount }}s
        </span>
        <span
          v-if="!showTimeCount"
          class="get-again"
          @click="onGetAgain"
        >
          重新获取
        </span>
      </div>
      <div class="btn-wp">
        <span
          class="save-btn"
          @touchend="onSave"
        >保存</span>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getVerifyCode } from '@/api/common'
import PhoneSeparate from '@/components/PhoneSeparate'
import { verifyCodeLen, countTimes } from '@/constants'
import { doubleNum } from '@/utils'
export default {
  components: {
    PhoneSeparate
  },
  props: {
    visible: { // 控制当前组件显隐
      type: Boolean,
      default: false
    },
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
      isFirst: true,
      closeOnClickOverlay: false,
      verifyCodeLen: Object.freeze(verifyCodeLen), // 限制验证码的最大长度
      isShow: false,
      code: '',
      timeCount: countTimes,
      showTimeCount: true, // 展示倒计时秒数/重新获取按钮
      timer: 0, // 定时器
      onFocus: false // 验证码输入聚焦状态，用于展示删除icon
    }
  },
  computed: {
    showClearIcon () {
      return this.onFocus && !!this.code
    }
  },
  watch: {
    visible (val) { // 弹窗在父级组件打开时重置所有数据打开倒计时
      if (val === true) {
        // this.countDown()
        this.isShow = true
        this.showTimeCount = true
        if (this.timeCount <= 0 || this.isFirst === true) {
          this.onGetAgain()
          this.isFirst = false
        }
      } else {
        this.onClose()
      }
    }
  },
  created () {
    // this.countDown()
  },
  methods: {
    onGetAgain () { // 重新获取点击
      const { phone, smsKey } = this
      getVerifyCode(phone, smsKey).then(data => {
        // this.timeCount = '60'
        this.timeCount = parseInt(data.endMilliseconds / 1000)
        this.showTimeCount = true
        this.countDown()
      })
    },
    onClose () { // 组件关闭时
      this.isShow = false
      this.$emit('update:visible', false)
      // this.clearTimer()
      // this.timeCount = countTimes
      this.code = '' // 已作为bug提出！
    },
    clearTimer () { // 弹窗关闭时清除定时器
      clearInterval(this.timer)
    },
    countDown () { // 倒计时
      this.clearTimer()
      this.timer = setInterval(_ => {
        if (this.timeCount > 0) {
          this.timeCount = doubleNum(this.timeCount - 1)
        } else {
          this.clearTimer()
          this.showTimeCount = false
        }
      }, 1000)
    },
    onClickOverlay () { // 遮罩层点击时的处理
      this.onClose()
    },
    onSave () { // 点击保存时
      const { code } = this
      if (code) {
        this.$emit('onSave', code)
      } else {
        this.$toast('请输入验证码')
      }
    },
    onInputFocus () {
      this.onFocus = true
    },
    onInputBlur () {
      setTimeout(_ => {
        this.onFocus = false
      }, 30)
    },
    onIconClear (ev) {
      this.code = ''
      ev.preventDefault()
      ev.stopPropagation()
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
@import '~@/assests/styles/common.less';
  .van-popup--center {
    border-radius: 20px;

    .wrap-inner {
      width: 590px;

      background-color: #fff;
      .close {
        .icon-wp {
          display: inline-block;
        }
        padding: 20px 20px 0 0 ;
        text-align: right;
        .close-icon {
          display: inline-block;
          font-size: 26px;
          color:#999;
        }
      }
      .tip {
        text-align: left;
        font-size: 28px;
        color: #333;
        margin-left: 50px;
        display: flex;
        .tip-text {
          margin-right: 5px;
        }
      }
      .input-wrap {
        height: 96px;
        margin-top: 20px;
        margin: 20px auto 0;
        width: 490px;
        display: flex;
        align-items: center;
        .border-bottom;
        .input {
          font-size: 40px;
          height: 56px;
          color:#5386FF;
          border:none;
          width: 300px;
        }
        .count-down {
          color: #ccc;
          font-size: 24px;
          flex: 1;
          text-align: right;
        }
        .get-again {
          color: #5386FF;
          font-size: 24px;
          flex: 1;
          text-align: right;
        }
        input::-webkit-input-placeholder {
          color: #dddddd;
        }
      }
      .btn-wp {
        margin-top: 43px;
        .border-top(#eee);
        height: 90px;
        line-height: 90px;
        color:#5386FF;
        font-size: 30px;
        text-align: center;
        .save-btn {
          display: inline-block;
          width: 100%;
          /* padding: 0 30px; */
        }
      }
      .clear-icon {
        font-size: 30px;
        color: #EEEEEE;
        padding: 5px 20px;
        /* position: absolute; */
        /* top: 50%; */
        /* transform: translateY(-50%); */
        /* right: 20px; */
      }
    }
  }
  .van-popup {
    min-height: auto;
  }
</style>
