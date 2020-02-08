<template>
  <v-page
    class="home"
    :show-header="false"
  >
    <div class="other-auth-wp auth-wrap">
      <div class="field-wrap">
        <name-input
          v-model="name"
          type="input"
          placeholder="请输入真实姓名全称"
          label="姓名"
          :maxlength="userNameMaxLength"
        />
        <select-picker
          v-model="idType"
          label="证件类型"
          :render-arr="cardOption"
          enum-key="ID_TYPE"
          placeholder="请选择证件类型"
          @onOptionTouch="onSel"
        />
        <v-left-right
          v-model="idNo"
          label="证件号码"
          placeholder="请输入正确的证件号码"
          type="input"
        />
      </div>
      <div class="bgColor">
        <upload-img
          v-model="idImg"
          type="CERT_TYPE"
          @onUpload="onUpload"
        />
        <p>隐私提示：您提交的所有信息都会自动增加水印，仅供114挂号实名认证使用。</p>
      </div>
      <v-btn
        text="提交"
        class="submit-btn"
        :class="isDisable?'disable':''"
        @touchend.native="onSubmit"
      />
      <div
        class="user-other"
        @touchend="userOtherCard"
      >
        使用身份证认证
      </div>
    </div>
  </v-page>
</template>

<script>
import VBtn from '@/components/VBtn'
// import { trim } from '@/utils/valid.js'
import SelectPicker from '@/components/SelectPicker'
import { cardOption } from '@/constants'
import NameInput from '@/components/NameInput'
import VLeftRight from '@/components/VLeftRight'
import UploadImg from '@/components/UploadImg'
import { validator, CHECK } from '@/constants/rules'
import { saveAuth } from '@/api/user'
export default {
  components: {
    VBtn, SelectPicker, NameInput, VLeftRight, UploadImg
  },
  data () {
    return {
      cardOption: Object.freeze(cardOption),
      userNameMaxLength: 40,
      file: '',
      // typeText: '请选择证件类型',

      showUpload: true,
      name: '', // 用户姓名
      idType: '', // 证件类型
      idNo: '', // 证件号码
      idImg: '' // 上传图片的路径

    }
  },
  computed: {
    isDisable () { // 提交按钮在符合条件时高亮
      const { name, idType, idNo, idImg } = this
      const tips = {
        show: false
      }
      const rules = [
        {
          name: 'userName',
          val: name,
          tips
        },
        {
          name: 'cardType',
          val: idType,
          tips
        }
      ]
      const result = validator(rules, this)
      if (idType) {
        const idTypeResult = CHECK[idType](idNo, this, tips)
        if (idImg && idTypeResult && result) {
          return false
        } else {
          return true
        }
      } else {
        return true
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
    onSubmit () { // 提交点击
      const { name, idType, idNo, idImg, isDisable } = this
      if (!isDisable) {
        saveAuth({ name, idType, idNo, idImg }).then(data => {
          // console.log(data)
          const { redirect } = this
          this.$toast('实名认证成功')
          setTimeout(_ => {
            if (redirect) {
              this.$router.replace(decodeURIComponent(redirect))
            } else {
              this.$router.replace('/user')
            }
          }, 1200)
        })
      }
    },
    userOtherCard () { // 使用身份证
      const { redirect } = this
      if (redirect) {
        this.$router.replace({
          name: 'auth',
          query: {
            redirect
          }
        })
      } else {
        this.$router.replace({
          name: 'auth'
        })
      }
    },
    onUpload (url) { // 上传完毕后的回调，接收图片的url
      // console.log(this.idImg, url)
    }
  }
}

</script>

<style lang='less' scoped type='text/less'>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/auth.less';
.bgColor{
  padding: 30px 0 20px 40px;
  background: #F6F6F6;
  p{
    width: 670px;
    margin-top: 20px;
    line-height:30px;
    color: #999999;
    font-size: 22px;
  }
}
</style>
