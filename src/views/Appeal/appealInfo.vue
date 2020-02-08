<template>
  <v-page
    class="appealInfo"
    :show-header="false"
  >
    <div class="other-auth-wp auth-wrap">
      <div class="field-wrap">
        <div class="topPart">
          <select-picker
            v-model="appeal.appealType"
            label="申诉类型"
            placeholder="请选择申诉流程"
            enum-key="APPEAL_TYPE"
          />
          <van-field
            v-model="appeal.appealReason"
            type="textarea"
            rows="6"
            border
            placeholder="请详细说明你的问题"
          />
          <van-field
            ref="userNameRef"
            v-model.trim="appeal.userName"
            class="user-name hyde-input"
            label-class="left-label"
            label="姓名"
            maxlength="40"
            placeholder="请输入真实姓名全称"
            :error-message="userNameErr"
            clearable
            @focus="onUserNameFocus"
            @blur="onUserNameBlur"
          />
          <add-point
            v-show="ifUserNameFocus"
            @click="onAddPoint"
          />
          <select-picker
            v-model="appeal.idType"
            label="证件类型"
            placeholder="请选择证件类型"
            enum-key="ID_TYPE"
          />
          <van-field
            ref="userNameRef"
            v-model.trim="appeal.idNo"
            class="user-name hyde-input"
            label-class="left-label"
            label="证件号码"
            maxlength="20"
            placeholder="请输入正确的证件号码"
            clearable
          />
        </div>
        <div class="center">
          <div class="upload-wrap">
            <upload-img
              v-model="idImg"
              type="COMMON_TYPE"
              @onUpload="onUpload"
            />
          </div>
          <p>重要提示：请提供您人证合一照片（自然人死亡需提供死亡证明）证件放大后需清晰可见，您提交的所有信息都会自动增加水印，仅供114挂号申诉使用。</p>
        </div>
        <div class="bottomPart">
          <van-field
            ref="userNameRef"
            v-model.trim="appeal.mobileNo"
            class="user-name hyde-input"
            label-class="left-label"
            label="手机号"
            maxlength="11"
            placeholder="请输入你的手机号码"
            clearable
          />
          <van-field
            ref="userNameRef"
            v-model.trim="appeal.smsCode"
            class="user-name hyde-input"
            label-class="left-label"
            label="请输入验证码"
            maxlength="6"
            placeholder="请输入验证码"
            clearable
          >
            <countdown
              slot="button"
              size="small"
              type="primary"
              :mobile="appeal.mobileNo"
              sms-key="USER_APPEAL"
            />
          </van-field>
        </div>
      </div>
      <v-btn
        text="确认提交"
        class="submit-btn"
        @click.native="onSubmit"
      />
    </div>
  </v-page>
</template>

<script>
import VBtn from '@/components/VBtn'
// import { trim } from '@/utils/valid.js'
import AddPoint from '@/components/AddPoint'
import { encrypt } from '@/utils'
import SelectPicker from '@/components/SelectPicker'
import Countdown from '@/components/Countdown'
import { STATIC_URL } from '@/config'
import { userNameCheck, isPhone, validator } from '@/constants/rules'
import { submitAppeal, fetchCommonEnum } from '@/api/common'
import UploadImg from '@/components/UploadImg'
export default {
  components: {
    VBtn, SelectPicker, AddPoint, Countdown, UploadImg
  },
  data () {
    return {
      cardOption: [],
      appealOption: [],
      idImg: '', // 上传图片的路径
      showUpload: true,
      userName: '', // 用户姓名
      userNameErr: '', // 姓名错误提示
      ifUserNameFocus: false, // 显示添加.控制
      appeal: {
        userName: '', // 用户名
        appealType: '', // 申诉类型
        appealReason: '', // 申诉理由
        idType: '-1', // 证件号类型
        idNo: '', // 证件号码
        mobileNo: '', // 手机号码
        pictureUrl: '', // 图片地址
        smsCode: '' // 验证码
      }
    }
  },
  computed: {
    exampleSrc () {
      return `${STATIC_URL}/img/card-example.png`
    }
  },
  created () {
    this.initEnums()
  },
  methods: {
    onUpload (file) { // 获取上传图片路径
      this.appeal.pictureUrl = encrypt(file)
    },
    onUserNameFocus () { // 用户名输入框获取焦点
      this.ifUserNameFocus = true
    },
    onUserNameBlur () {
      this.ifUserNameFocus = false
    },
    onAddPoint () {
      this.appeal.userName = this.appeal.userName + '·'
    },
    // onNameChange () { // 用户名监听
    //   this.validUserId()
    // },
    // onIdChange () { // 身份证号监听
    //   this.validUserId()
    // },
    onSubmit () { // 提交点击
      if (this.appeal.appealType === '') {
        this.$toast('请选择申诉类型')
        return false
      }
      if (this.appeal.appealType === 'RESTS' && this.appeal.appealReason === '') { // 其他
        this.$toast('请填写申诉理由')
        return false
      }
      if (!userNameCheck(this.appeal.userName, this)) { // 请您输入真实姓名
        return false
      }

      if (this.appeal.idType === '-1') {
        this.$toast('请选择证件类型')
        return false
      }
      if (this.appeal.appealType === 'AUTHENTICATION_NOT_PASS' && this.appeal.idType !== 'IDENTITY_CARD') { // 实名认证未通过
        this.$toast('请选择身份证类型')
        return false
      }
      if (this.appeal.idNo === '') {
        this.$toast('请输入证件号码')
        return false
      }
      if (!this.validate()) { // 验证证件号码
        return false
      }
      if (this.appeal.pictureUrl === '') { // 其他
        this.$toast('请上传证件照片')
        return false
      }
      if (this.appeal.mobileNo === '') {
        this.$toast('请输入手机号')
        return false
      }
      if (!isPhone(this.appeal.mobileNo, this)) { // 请输入手机号
        this.$toast('您输入的手机号码格式有误')
        return false
      }
      if (this.appeal.smsCode === '') { // 其他
        this.$toast('请输入手机验证码')
        return false
      }
      submitAppeal(this.appeal).then(res => {
        this.$router.push({
          name: 'appealSuccess'
        })
      })
    },
    validate () { // 证件号的校验
      const rules = [
        {
          name: this.appeal.idType,
          val: this.appeal.idNo
        }
      ]
      const result = validator(rules, this)
      return result
    },
    initEnums () { // 获取下拉框数据
      fetchCommonEnum(['ID_TYPE', 'APPEAL_TYPE']).then((res) => {
        this.cardOption = res.enums.ID_TYPE.map(o => { return { name: o.value, value: o.key } })// 获取身份类型
        this.appealOption = res.enums.APPEAL_TYPE.map(o => { return { name: o.value, value: o.key } })// 获取申诉类型
      })
    }
  }
}

</script>

<style lang='less' scoped type='text/less'>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/auth.less';
.auth-wrap .field-wrap {
  margin-left: 0;
}
.submit-btn{
  margin-bottom: 50px;
}
.topPart, .bottomPart{
  margin-left: 30px;
  .insert-point{
    margin: 0;
  }
  /deep/.van-field__body{
    .van-field__control{
      width: 400px;
    }
  }
  /deep/.van-cell{
    padding: 0;
  }
  /deep/ .van-field__button span{
    display: inline-block;
    width: 180px;
    text-align: left;
    color: #5386FF;
  }
  /deep/ .van-field__button .grey{
    color: #999;
    text-align: center;
  }
  /deep/ .van-field__body textarea{
    width: 100%!important;
    padding: 30px 0;
    font-size: 26px;
    .border-bottom;

  }
}
/deep/ .user-name {
  .van-field__body{
    height: 98px;
    .van-field__control {
      height:50px;
      line-height:50px;
    }
  }
}
/deep/ textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ddd;
}
/deep/ textarea::-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ddd;
}
/deep/ textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}
/deep/ textarea::-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ddd;
}
.center{
  background: #F6F6F6;
  padding: 40px;
  /deep/.van-icon{
    font-size: 60px;
    color: #5386FF;
  }
  p{
    font-size: 22px;
    color: #999;
    margin-top: 20px;
  }
}
/deep/ .van-field__clear {
  font-size: 30px;
  margin-right: 30px;
  color: #eee;
}
</style>
