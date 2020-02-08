<template>
  <v-page
    class="home grey-color"
    :show-header="false"
  >
    <div class="add-patient-wrap">
      <head-tip
        text="就诊人信息"
        more-tip="必填"
        :more-style="{color:'#FF5F5F'}"
        type="large"
      />
      <div class="patient-info-wrap white-all">
        <name-input
          v-model="patientInfo.patientName"
          label="就诊人姓名"
        />
        <select-picker
          v-model="patientInfo.patientIdType"
          :render-arr="allIdCards"
          label="证件类型"
          placeholder="请选择证件类型"
          enum-key="ID_TYPE"
          @onOptionTouch="onCardSelect"
        />
        <v-left-right
          v-model="patientInfo.patientIdNo"
          type="input"
          label="证件号码"
          placeholder="请输入证件号码"
        />
        <v-left-right
          v-if="!isIdCard"
          v-model="patientInfo.patientGender"
          type="radio"
          label="性别"
          :radios="SEX"
          @touchend="onSexClick"
        />
        <v-date-picker
          v-if="!isIdCard"
          v-model="patientInfo.patientBirthDate"
          @picker="onBirthdayPicker"
        />
        <v-left-right
          v-model="patientInfo.patientPhoneNo"
          type="phoneInput"
          label="手机号"
          placeholder="请输入您的手机号码"
          class="no-border"
        />
      </div>
      <head-tip
        text="建档信息"
        more-tip="选填,完善后部分医院首次就诊不排队建档"
        type="large"
      />
      <div class="white-all build-info-wrap">
        <select-picker
          v-if="showNation"
          v-model="archivalInfo.countryType"
          label="国籍"
          placeholder="请选择国籍"
          enum-key="NATIONALITY"
        />
        <select-picker
          v-if="showNationality"
          v-model="archivalInfo.nation"
          label="民族"
          placeholder="请选择民族"
          enum-key="NATION"
          @onOptionTouch="onOptionTouch"
        />
        <v-left-right
          v-model="archivalInfo.marriageStatus"
          type="radio"
          label="婚姻状况"
          :radios="marryStatus"
          @touchend="onMarryClick"
        />
        <v-city
          v-if="showRecord"
          label="户口所在地"
          placeholder="请选择户口所在地"
          @onAddress="onAddress"
        />
        <v-city
          label="当前住址"
          placeholder="请选择常驻区域"
          @onAddress="onAlwaysArea"
        />
        <v-left-right
          v-model="archivalInfo.specialTrip"
          class="no-border"
          type="radio"
          label="是否专程来京就医"
          :radios="seeDoctorSpecial"
          @touchend="onSexSpecialClick"
        />
      </div>
      <head-tip
        text="联系人信息"
        more-tip="选填"
        type="large"
      />
      <div class="white-all contact-info-wrap">
        <name-input
          v-model="contactInfo.contactName"
          label="联系人姓名"
        />
        <select-picker
          v-model="contactInfo.contactIdType"
          :render-arr="allIdCards"
          :out-render="true"
          label="证件类型"
          placeholder="请选择证件类型"
          enum-key="ID_TYPE"
          @onOptionTouch="onContactCardSelect"
        />
        <v-left-right
          v-model="contactInfo.contactIdNo"
          type="input"
          label="联系人证件号码"
          placeholder="请输入联系人证件号码"
        />
        <v-left-right
          v-model="contactInfo.contactPhoneNo"
          class="no-border"
          type="phoneInput"
          label="联系人手机号"
          placeholder="请输入联系人手机号码"
        />
      </div>
      <v-btn
        class="add-btn"
        text="添加就诊人"
        @touchend.native="onAddPatient"
      />
    </div>
    <get-verify
      v-model="verifyCode"
      :visible.sync="visible"
      :phone="patientInfo.patientPhoneNo"
      :sms-key="smsKey"
      @onSave="onSaveAddPatient"
    />
  </v-page>
</template>

<script>
import { seeDoctorSpecial, COUNTRYTYPE, NATIONS, SMSKEY } from '@/constants'
import { addPatientNew, addPatientPreCheck } from '@/api/user'
// import { getVerifyCode } from '@/api/common'
import { fetchCommonEnum } from '@/api/common'
import { validator } from '@/constants/rules'
import HeadTip from '@/components/HeadTip'
import SelectPicker from '@/components/SelectPicker'
import VBtn from '@/components/VBtn'
import NameInput from '@/components/NameInput'
import VLeftRight from '@/components/VLeftRight'
import VCity from '@/components/VCity'
import VDatePicker from '@/components/VDatePicker'
import GetVerify from '@/components/GetVerify'
export default {
  components: {
    HeadTip, SelectPicker, NameInput, VLeftRight, VCity, VDatePicker, VBtn, GetVerify
  },
  data () {
    return {
      // ——————————————————————————以下初始化变量
      allIdCards: [], // 证件类型枚举
      SEX: [],
      marryStatus: [],
      seeDoctorSpecial: seeDoctorSpecial,
      COUNTRYTYPE: Object.freeze(COUNTRYTYPE),
      NATIONS: Object.freeze(NATIONS),
      smsKey: SMSKEY.addPatient, // 修改就诊人获取验证码
      verifyCode: '', // 提交前的短信验证码
      // —————————————————————————————以下显隐控制标识
      visible: false, // 是否展示验证码弹窗
      isIdCard: true, // 是否选择了身份证（控制出生日期和性别选择）
      showNation: false, // 是否展示国际下拉框，护照时展示
      showNationality: false, // 显示民族
      showRecord: false, // 户口所在地显示隐藏
      // ————————————————————————————以下就诊人个人信息
      patientInfo: {
        patientName: '', // 就诊人姓名
        patientIdType: null, // 就诊人证件类型
        patientIdNo: '', // 就诊人证件号码
        patientGender: null, // 就诊人性别,
        patientBirthDate: '', // 出生日期
        patientPhoneNo: '' // 就诊人手机号
      },
      verificationCode: '', // 手机验证码
      // ——————————————————————以下建档信息
      archivalInfo: {
        countryType: null, // 国籍
        nation: null, // 民族
        marriageStatus: null, // 婚姻状况
        residentProvinceCode: '', // 户口所在地省份
        residentCityCode: '',
        residentAreaCode: '',
        currentProvinceCode: '', // 当前住址省份
        currentCityCode: '',
        currentAreaCode: '',
        specialTrip: null// 专程来京就医
      },
      // ________________________以下联系人信息
      contactInfo: {
        contactName: '', // 联系人姓名
        contactIdType: null, // 联系人证件类型
        contactIdNo: '', // 联系人证件号码
        contactPhoneNo: '' // 联系人手机号
      }
    }
  },
  created () {
    this.initEnums()
  },
  methods: {
    initEnums () {
      fetchCommonEnum(['MARITAL_STATUS', 'NATION', 'SEX_TYPE', 'ID_TYPE', 'NATIONALITY']).then(data => {
        // console.log(data)
        this.SEX = data.enums.SEX_TYPE
        this.marryStatus = data.enums.MARITAL_STATUS
        this.allIdCards = data.enums.ID_TYPE
      })
    },
    onSexClick (item) { // 性别点击
      console.log(item, this.sex)
    },
    onCardSelect (card) { // 选择的卡类型
      console.log(card)
      const { key } = card
      if (key === 'IDENTITY_CARD') { // 是身份证
        this.isIdCard = true
        this.identityHandle() // 与身份证相关的处理
      } else {
        this.isIdCard = false
        if (key === 'PASSPORT') {
          this.passportHandle() // 与护照相关的处理
        } else {
          this.otherHandle(key) // 除身份证与护照之外的处理
        }
      }
    },
    identityHandle () { // 选身份证的处理，隐藏：国籍、性别、出生日期
      this.showNation = false
      this.showRecord = true
      this.showNationality = true
    },
    passportHandle () { // 护照的处理，隐藏：民族户口所在地，展示国籍下拉
      this.showNation = true
      this.showRecord = false
      this.showNationality = false
    },
    otherHandle (cardType) { // 身份证护照之外隐藏：国籍、民族、户口所在地
      this.showNation = false
      this.showRecord = false
      this.showNationality = false
    },
    onAddress (obj) { // 户口所在地
      // console.log(obj)
      // this.recordProvinceCode = obj.provinceCode
      // this.recordCityCode = obj.cityCode
      // this.recordAreaCode = obj.areaCode
      this.archivalInfo.residentProvinceCode = obj.provinceCode
      this.archivalInfo.residentCityCode = obj.cityCode
      this.archivalInfo.residentAreaCode = obj.areaCode
    },
    onAlwaysArea (obj) { // 常驻地址选择
      // Object.assign(this, obj)
      this.archivalInfo.currentProvinceCode = obj.provinceCode
      this.archivalInfo.currentCityCode = obj.cityCode
      this.archivalInfo.currentAreaCode = obj.areaCode
    },
    onBirthdayPicker (date) { // 出生日期点击确定
      console.log(date, this.birthday)
    },
    onOptionTouch (item) { // 民族选项点击
      console.log(this.countryType, this.nationality)
    },
    onSexSpecialClick (val) { // 是否专程来京就医
      // console.log(this.specialTripSeeDoctor)
    },
    onMarryClick (val) { // 婚姻状况点击
      // console.log(val)
    },
    onContactCardSelect (val) { // 联系人证件类型选择
      // console.log(val, this.contactIdType)
    },
    validate () { // 弹出验证码弹窗前的校验 new done
      const { patientIdType, patientIdNo, patientPhoneNo, patientName } = this.patientInfo
      const rules = [
        {
          name: 'userName',
          val: patientName
        },
        {
          name: 'cardType',
          val: patientIdType
        },
        {
          name: 'isPhone', // 校验方法
          val: patientPhoneNo,
          tips: {
            tipNull: '请输入就诊人手机号',
            tipErr: '请输入正确的就诊人手机号码'
          }
        }
      ]
      if (patientIdType) {
        rules.push({
          name: patientIdType,
          val: patientIdNo
        })
        const result = validator(rules, this)
        return result
      } else {
        this.$toast('请选择就诊人证件类型')
        return false
      }
    },
    onAddPatient () { // 点击添加就诊人
      const result = this.validate()

      if (result === true) { // 前端校验通过进入后端校验，通过后打开验证码弹窗，发送验证码
        // getVerifyCode(this.phone, this.smsKey).then(data => {
        //   this.visible = true
        // })
        const checkContact = this.checkContact()
        if (checkContact) {
          const { patientInfo, archivalInfo, contactInfo } = this
          addPatientPreCheck({ patientInfo, archivalInfo, contactInfo }).then(data => { // 后端校验通过，打开验证码弹窗
            this.visible = true
            // getVerifyCode(this.patientInfo.patientPhoneNo, 'ADDPATIENT').then(data => {

            // })
          })
        } else {
          console.log('checkContact', checkContact)
        }
      } else {
        // console.log(result)
      }
    },
    getParams () { // 发请求前整理传递参数
      const { patientInfo, archivalInfo, contactInfo, verificationCode } = this
      return { patientInfo, archivalInfo, contactInfo, verificationCode }
    },
    checkContact () { // 查看联系人信息是否有填写，如果填写了，就必须填写完整；全空可以通过验证
      const {
        contactName, contactIdNo, contactIdType, contactPhoneNo
      } = this.contactInfo
      const contactStr = contactName + contactIdNo + contactIdType + contactPhoneNo
      if (contactStr !== 'null' && contactStr) {
        // console.log('contactStr', typeof contactStr)
        const rules = [
          {
            name: 'userName',
            val: contactName,
            tips: {
              tipNull: '请输入联系人姓名',
              tipErr: '请输入正确的联系人姓名qwe'
            }
          },
          {
            name: 'cardType',
            val: contactIdType,
            tips: {
              tipNull: '请选择联系人证件类型'
            }
          },
          {
            name: contactIdType,
            val: contactIdNo,
            tips: {
              tipNull: '请输入联系人证件号',
              tipErr: '请输入正确的联系人证件号'
            }
          },
          {
            name: 'isPhone', // 校验方法
            val: contactPhoneNo,
            tips: {
              tipNull: '请输入联系人手机号',
              tipErr: '请输入正确的联系人手机号'
            }
          }
        ]
        return validator(rules, this)
      } else {
        console.log(contactStr)
        return true
      }
    },
    onSaveAddPatient (val) { // 手机验证码弹窗保存监听
      this.verificationCode = val
      const rules = [{
        name: 'validateCode',
        val
      }]
      const result = validator(rules, this)
      if (result === true) {
        const params = this.getParams()
        let { redirect } = this.$route.query
        redirect = redirect ? decodeURIComponent(redirect) : '/user/patient'
        addPatientNew(params).then(data => {
          // console.log(data)
          this.visible = false
          this.$router.replace(redirect)
        })
      } else {
        console.log(result, 'addPatient check error')
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .grey-color {
    background-color: #F6F6F6;
  }
  .add-patient-wrap {
    .white-all {
      background-color: #fff;
      padding-left: 30px;
    }
  }
  .add-btn {
    margin: 60px auto;
  }
</style>
