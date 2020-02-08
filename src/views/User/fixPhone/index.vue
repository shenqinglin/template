<template>
  <v-page
    class="home"
    :show-header="false"
  >
    <div class="fix-phone-wrap">
      <div class="current-phone">
        <div class="current-tip">
          当前登录手机号
        </div>
        <phone-separate :tel="phone" />
      </div>
      <div class="new-phone-wrap">
        <v-left-right
          v-model="newTel"
          type="phoneInput"
          label="新手机号"
          placeholder="请输入你的手机号码"
        />
        <v-left-right
          v-model="verifyCode"
          class="short-message"
          type="input"
          placeholder="请输入验证码"
          label="短信验证码"
          :maxlength="codeLength"
        >
          <!-- <get-verify-code
            class="get-code-wrap"
            :phone="newTel"
            :sms-key="smsKey"
          /> -->
          <countdown
            :mobile="newTel"
            :sms-key="smsKey"
          />
        </v-left-right>
      </div>
      <v-btn
        class="fix-btn"
        text="确认修改"
        @touchend.native="onFixBtnClick"
      />
    </div>
  </v-page>
</template>

<script>
import PhoneSeparate from '@/components/PhoneSeparate'
import VLeftRight from '@/components/VLeftRight'
import VBtn from '@/components/VBtn'
// import GetVerifyCode from '../components/GetVerifyCode'
import Countdown from '@/components/Countdown'
import { CHECK } from '@/constants/rules'
import { SMSKEY } from '@/constants'
import { updatePhone, getUserInfo } from '@/api/user'
export default {
  components: {
    PhoneSeparate, VLeftRight, VBtn, Countdown
  },
  data () {
    return {
      phone: '', // 当前登录手机号
      newTel: '', // 填写的新手机号
      verifyCode: '',
      codeLength: 6,
      smsKey: SMSKEY.tel
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () { // 获取个人信息
      getUserInfo().then(data => {
        // console.log(data)
        this.phone = data.mobile
      })
    },
    onFixBtnClick () { // 确认修改点击
      const { newTel, verifyCode } = this
      const result = CHECK.isPhone(newTel, this)
      if (result && !verifyCode) {
        this.$toast('请输入验证码')
      }
      if (result === true && verifyCode) {
        updatePhone({ phone: newTel, verifyCode }).then(data => {
          this.$toast('修改成功')
          setTimeout(_ => {
            this.$router.replace('/user')
          }, 2600)
        })
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .fix-phone-wrap {
    .current-phone {
      display: flex;
      align-items:center;
      padding: 30px 0 0 30px;
      .current-tip {
        font-size: 26px;
        color: #333333;
        margin-right: 10px;
      }
    }
  }
  .new-phone-wrap {
    padding-left: 30px;
    margin-top: 90px;
    margin-bottom: 60px;
    /* 部分ios手机偶现marginTop无效 */
  }
  .fix-btn {
    margin-top: 60px;
  }
  /deep/.left-right-wrap.short-message .right .input-val {
    width: 180px;
  }
  .get-code-wrap {
    flex: 1;
    text-align: right;
    padding-right: 30px;
  }
  .short-message /deep/.clear-icon {
    right: 200px;
  }
  .countdown {
    padding-right: 30px;
  }
</style>
