<template>
  <v-page
    class="home"
    :show-header="false"
  >
    <div class="auth-wrap">
      <div class="field-wrap">
        <name-input
          v-model="userName"
          label="姓名"
          placeholder="请输入真实姓名全称"
        />
        <v-left-right
          v-model="idNumber"
          label="身份证号码"
          placeholder="包含现役军人、人民武装警察"
          type="input"
          :maxlength="maxlength"
        />
      </div>
      <v-btn
        text="提交"
        class="submit-btn"
        :class="ifDisable"
        @touchend.native="onSubmit"
      />
      <div
        class="user-other"
        @touchend="userOtherCard"
      >
        使用其他有效证件
      </div>
    </div>
  </v-page>
</template>

<script>
import VBtn from '@/components/VBtn'
import { trim } from '@/utils/valid.js'
import { saveAuth } from '@/api/user'
import NameInput from '@/components/NameInput'
import VLeftRight from '@/components/VLeftRight'
import { CHECK } from '@/constants/rules'
export default {
  components: {
    VBtn, NameInput, VLeftRight
  },
  data () {
    return {
      userName: '12', // 用户名
      maxlength: 18,
      idNumber: '' //  身份证号码
      // ifDisable: 'disable' //  按钮是否置灰
    }
  },
  computed: {
    ifDisable () {
      const tips = {
        show: false
      }
      const isName = CHECK.userName(this.userName, this, tips)
      const isIdentity = CHECK.IDENTITY_CARD(this.idNumber, this, tips)
      if (isName === true && isIdentity === true) {
        return ''
      } else {
        return 'disable'
      }
    }
  },
  created () {
    this.initRedirect()
  },
  methods: {
    initRedirect () { // 初始化一个回调url
      const { redirect } = this.$route.query
      this.redirect = redirect || ''
    },
    validUserId () {
      const { userName, idNumber } = this
      this.userName = trim(userName)
      this.idNumber = trim(idNumber)
      if (this.userName && idNumber.length === 18) {
        this.ifDisable = ''
      } else {
        this.ifDisable = 'disable'
      }
    },
    userOtherCard () { // 使用其它card
      const { redirect } = this
      if (!redirect) {
        this.$router.replace({
          name: 'otherAuth'
        })
        return
      }
      this.$router.replace({
        name: 'otherAuth',
        query: {
          redirect: this.redirect
        }
      })
    },
    onSubmit () { // 提交按钮点击
      if (this.ifDisable === 'disable') {
        return
      }
      this.saveAuth({
        idType: 'IDENTITY_CARD',
        idNo: this.idNumber,
        name: this.userName
      })
    },
    saveAuth (data) { // 调实名认证接口
      saveAuth(data).then(res => {
        // console.log(res)
        if (res.status === 'OK') { // 认证成功
          this.$toast('认证成功')
          this.jump()
        } else {
          this.$toast(res.msg || '认证失败')
        }
      })
    },
    jump () {
      const timer = setTimeout(_ => {
        const { redirect } = this
        if (redirect) {
          this.$router.replace(decodeURIComponent(redirect))
        } else {
          this.$router.replace('/user')
        }
        clearTimeout(timer)
      }, 1220)
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  @import '~@/assests/styles/common.less';
  @import '~@/assests/styles/auth.less';
  /deep/.left-right-wrap .right {
    flex:1;
  }
</style>
