<template>
  <v-page
    class="home patient-detail"
    :show-header="false"
  >
    <head-tip type="large" />
    <div class="patient-info all-white">
      <v-patient
        :name="obj.patientName"
        :id-type="obj.patientIdTypeText"
        :id-no="obj.patientIdNo"
      />
      <div class="info-list-wrap inner-wrap">
        <v-left-right
          v-model="sex"
          class="no-border"
          label="性别"
          :val="patientGenderText"
        />
        <v-left-right
          class="no-border"
          label="出生日期"
          :val="patientBirthDate"
        />
        <v-left-right
          class="no-border"
          label="国籍"
          :val="cardCountryTypeView"
        />
        <v-left-right
          v-if="nationText"
          class="no-border"
          label="民族"
          :val="nationText"
        />
        <v-left-right
          v-if="marriageStatusText"
          class="no-border"
          label="婚姻状况"
          :val="marriageStatusText"
        />
        <v-left-right
          v-if="recordAddress"
          class="no-border"
          label="户口所在地"
          :val="recordAddress"
        />
        <v-left-right
          v-if="presentAddress"
          class="no-border"
          label="当前住址"
          :val="presentAddress"
        />
        <v-left-right
          v-if="specialTrip"
          class="no-border"
          label="是否专程来京就医"
          :val="specialTrip"
        />
        <v-left-right
          v-model="patientPhone"
          class="patient-phone high-default-wrap"
          :class="isFixShow?'no-border':''"
          label="手机号"
          :val="patientPhoneNo"
          :type="patientPhoneType"
          placeholder="请输入手机号"
          :maxlength="patientPhoneLength"
          :auto-focus="telAutoFocus"
        >
          <div
            v-if="bindInfo"
            class="fix-btn-wp"
          >
            <span
              v-if="isFixShow"
              v-show="!editingContact"
              @click="onFixPhone"
            >
              <v-icon
                name="edit"
                class="fix-phone-icon"
              />
              {{ fixOrFill }}
            </span>
            <span
              v-if="!isFixShow"
              @click="onFixPhoneSave"
            >保存</span>
          </div>
        </v-left-right>
      </div>
    </div>
    <head-tip
      text="联系人信息"
      type="large"
    >
      <div
        v-if="canFillPatient&&bindInfo"
        v-show="!editingPatientPhone"
        class="fill-patient-info"
        @click="onFillClick"
      >
        补全联系人信息
      </div>
      <div
        v-if="saveContact&&bindInfo"
        class="fill-patient-info"
        @click="onSaveContact"
      >
        保存
      </div>
    </head-tip>
    <div
      class="concat-info-wrap inner-wrap all-white"
      :class="saveContact?'no-padding':''"
    >
      <v-left-right
        v-if="!contactCanFix"
        class="no-border "
        :class="ifUseDefault"
        label="联系人姓名"
        :val="contactNameFirst"
        :type="contactType"
      />
      <name-input
        v-if="contactCanFix"
        v-model="contactName"
        label="联系人姓名"
        placeholder="请输入联系人姓名"
      />
      <v-left-right
        v-if="!contactCanFix"
        class="no-border "
        :class="ifUseDefault"
        label="联系人证件类型"
        :val="contactIdTypeView"
      />
      <select-picker
        v-if="contactCanFix"
        v-model="contactIdType"
        :render-arr="allIdCards"
        label="证件类型"
        placeholder="请选择证件类型"
        enum-key="ID_TYPE"
      />
      <v-left-right
        v-model="contactIdNo"
        :class="cardNoClasses"
        class="contact-card-number"
        label="联系人证件号码"
        :val="contactIdNoFirst"
        :type="contactType"
        placeholder="请输入联系人证件号码"
      />
      <v-left-right
        v-model="contactPhoneNo"
        class="no-border high-default-wrap"
        :class="ifUseDefault"
        label="联系人手机号"
        :val="contactPhoneFirst"
        :type="contactPhoneType"
        placeholder="请输入联系人手机号"
        :maxlength="patientPhoneLength"
      />
    </div>
    <VBtn
      v-if="canActivePatient"
      text="激活就诊人"
      class="active-button"
      @touchend.native="onActivePatient"
    />
    <div class="del-patient">
      <span @touchend="onDelPatient">删除就诊人</span>
    </div>
    <get-verify
      v-model="code"
      :visible.sync="fixPhoneShow"
      :phone="patientPhone"
      :sms-key="smsKey"
      @onSave="onSavePhone"
    />
  </v-page>
</template>

<script>
import HeadTip from '@/components/HeadTip'
import VPatient from '@/components/VPatient'
import VLeftRight from '@/components/VLeftRight'
import SelectPicker from '@/components/SelectPicker'
import NameInput from '@/components/NameInput'
import VBtn from '@/components/VBtn'
import GetVerify from '@/components/GetVerify'
import { patientDetail } from '@/api/user'
import { allIdCards } from '@/constants'
import { CHECK, validator } from '@/constants/rules'
import { updatePatientInfo, delPatient, activePatient } from '@/api/user'
// import { getVerifyCode } from '@/api/common'

export default {
  components: {
    HeadTip, VPatient, VLeftRight, VBtn, NameInput, GetVerify, SelectPicker
  },
  data () {
    return {
      smsKey: 'MODIFY_PATIENT',
      allIdCards: Object.freeze(allIdCards), // 全部证件类型
      patientPhoneLength: 11, // 用户手机号最大长度
      fixOrFill: '修改', // 就诊人手机号为空时，可进行补充手机号，此时文案显示为补充
      code: '', // 修改手机号验证码
      idCardType: '', // 证件类型
      obj: {}, // 就诊人卡片渲染对象
      sex: '',
      patientPhoneType: 'phoneSeparate', // 手机号是可修改状态还是只读，为kong时只读，为input时可填写
      patientPhone: '', // 用户修改的手机号
      patientGenderText: '', // 性别
      patientBirthDate: '', // 出生日期
      patientPhoneNo: '', // 就诊人手机号（只用作渲染，可作为比对标准）
      cardCountryTypeView: '', // 国籍
      // ______________________________________以下建档信息
      nationText: '', // 民族
      marriageStatusText: '', // 婚否
      presentAddress: '', // 当前住址
      recordAddress: '', // 出生地
      specialTrip: '', // 是否专程来京就医
      // ——————————————————————————————————————以下联系人信息
      contactName: '', // 联系人姓名
      contactIdType: null, // 联系人证件类型
      contactIdTypeView: '', // 联系人证件类型（中文展示）
      contactIdNo: '', // 联系人证件号码
      contactPhoneNo: '', // 联系人手机号
      contactNameFirst: '', // 进入页面时的name状态
      contactIdTypeFirst: '',
      contactIdNoFirst: '',
      contactPhoneFirst: '',
      // ————————————————————————————————以下状态显示标识
      bindInfo: false, // 对于待激活就诊人不能修改手机号或者补全联系人信息，只有patientStatus==='bind'用户此值为true
      contactCanFix: false, // 是否可补全联系人
      isFixShow: true, // 用户手机号行 展示修改还是保存
      contactFilled: false, // 联系人信息是否全部为空
      fixPhoneShow: false, // 修改手机号填写验证码弹窗，默认false
      canActivePatient: false, // 是否展示激活按钮
      canFillPatient: false, // 是否显示'补全联系人信息'
      saveContact: false, // 保存联系人信息
      editingPatientPhone: false, // 点击了修改就诊人的修改按钮后，如果展示着修改联系人信息，则隐藏
      editingContact: false, // 点击了补充联系人信息后修改手机号按钮隐藏
      telAutoFocus: false // 点击修改（手机号）时，input自动获得焦点
    }
  },
  computed: {
    ifUseDefault () {
      return this.contactPhoneFirst === '未填写' ? 'null-val' : ''
    },
    contactType () {
      return this.contactCanFix ? 'input' : ''
    },
    contactPhoneType () {
      // return this.contactCanFix ? 'phoneInput' : ''
      if (this.contactCanFix) {
        return 'phoneInput'
      } else {
        if (this.contactPhoneFirst !== '未填写') {
          return 'phoneSeparate'
        } else {
          return ''
        }
      }
    },
    cardNoClasses () {
      // 证件号class，默认会有null-val，no-border样式，如果点击了补全联系人，则去掉null-val,no-border
      return {
        'null-val': this.contactPhoneFirst === '未填写',
        'no-border': !this.saveContact
      }
    }
  },
  created () {
    this.getPatientDetail()
  },
  methods: {
    renderPatientCard (obj) { // 就诊人卡片渲染
      this.obj = obj.patientInfo
      this.cardCountryTypeView = obj.archivalInfo.countryText
    },
    getPatientDetail () { // 获取就诊人详情
      const { idNo, idType } = this.$route.params
      patientDetail(idType, idNo).then(data => {
        // console.log(data)
        this.renderPatientCard(data) // 卡片渲染
        this.renderPatient(data.patientInfo) // 就诊人信息（无国籍）
        this.renderContact(data.contactInfo) // 联系人渲染
        this.renderArchivalInfo(data.archivalInfo)
        this.renderBtn(data.patientStatus) // 按钮显隐（状态）
        const { contactName, contactPhoneNo, contactIdNo, contactIdType } = data.contactInfo
        const allInfo = contactName + contactPhoneNo + contactIdNo + contactIdType
        if (!allInfo || allInfo === 'null') {
          this.canFillPatient = true // 展示补全联系人信息
          this.saveContact = false // 将补全联系人信息保存按钮关闭（重新调取时触发）
        }
      })
    },
    renderBtn (status) { // 依据绑定状态处理各按钮的显隐
      if (status === 'wait_bind') { // 激活按钮处理
        this.canActivePatient = true
      }
      if (status === 'bind') { // 只有状态时bind的就诊人才可以修改详情（手机号|联系人）
        this.bindInfo = true
      } else {
        this.bindInfo = false
      }
    },
    renderArchivalInfo (obj) { // 渲染建档信息
      this.marriageStatusText = obj.marriageStatusText
      this.nationText = obj.nationText
      this.presentAddress = obj.presentAddress
      this.recordAddress = obj.recordAddress
      this.specialTrip = obj.specialTrip
    },
    renderPatient (obj) { // 就诊人信息
      this.patientGenderText = obj.patientGenderText
      this.patientBirthDate = obj.patientBirthDate
      this.patientPhoneNo = obj.patientPhoneNo
      if (!obj.patientPhoneNo) {
        this.fixOrFill = '补充'
      }
    },
    renderContact (obj) { // 联系人信息fix-phone-show
      const defaultVal = '未填写'
      if (this.contactPhoneNo) { // 只要就诊人信息中有一项为空其它项必为空
        this.contactFilled = true
      }

      this.contactPhoneFirst = obj.contactPhoneNo || defaultVal
      this.contactIdNoFirst = obj.contactIdNo || defaultVal
      this.contactIdTypeView = obj.contactIdType || defaultVal
      this.contactNameFirst = obj.contactName || defaultVal
      this.contactIdTypeFirst = obj.contactIdType
    },
    onActivePatient () { // 激活就诊人
      const { idNo, idType } = this.$route.params
      activePatient({ idNo, idType }).then(data => {
        const vm = this
        vm.$toast({
          message: '激活成功',
          onClose () {
            vm.$router.replace({
              name: 'patient'
            }) // from 燕秋 20200113
          }
        })
      })
    },
    onDelPatient () { // 删除就诊人点击，弹窗确认
      this.$dialog.confirm({
        title: '',
        message: '确定删除此就诊人',
        closeOnPopstate: true // 按返回按钮时弹出关闭
      }).then(_ => {
        this.delPatient()
      }).catch(_ => {
        // this.$toast("已取消删除操作")
      })
    },
    delPatient () { // 调接口删除就诊人
      const { idNo, idType } = this.$route.params
      delPatient({ idNo, idType, isHistory: false }).then(res => {
        this.$router.replace({
          name: 'patient'
        })
      })
    },
    onFillClick () { // 补充就诊人信息点击
      this.contactCanFix = true
      this.canFillPatient = false
      this.saveContact = true
      this.editingContact = true
      this.patientPhone = this.patientPhoneNo // 补充修改时传递的phone参数为原手机号phone
    },
    onFixPhone () { // 点击修改（手机号）
      this.isFixShow = false
      this.patientPhoneType = 'phoneInput'
      this.editingPatientPhone = true
      this.patientPhone = '' // 与点击补充联系人相对应，点击时要置空，否则会将当前手机号填入
      this.telAutoFocus = true
    },
    onFixPhoneSave () { // 点击保存（手机号）
      const { patientPhoneNo, patientPhone } = this
      if (patientPhoneNo === patientPhone) { // 如果用户未修改直接回退至初始状态
        this.isFixShow = true
      } else { // 如果不是手机号弹窗提示，否则打开验证码弹窗调接口发送验证码
        const isTel = CHECK.isPhone(patientPhone, this)
        if (isTel) {
          this.fixPhoneShow = true
        }
      }
    },
    onSaveContact () { // 补全联系人信息保存
      let { contactName, contactIdType, contactPhoneNo, contactIdNo } = this
      contactName = contactName === '未填写' ? '' : contactName
      contactIdType = contactIdType === '未填写' ? '' : contactIdType
      contactPhoneNo = contactPhoneNo === '未填写' ? '' : contactPhoneNo
      contactIdNo = contactIdNo === '未填写' ? '' : contactIdNo
      const rules = [
        {
          name: 'userName',
          val: contactName,
          tips: {
            tipNull: '请填写联系人姓名',
            tipErr: '请填写正确的联系人姓名'
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
            tipNull: '请输入联系人证件号码',
            tipErr: '请输入正确联系人证件号码'
          }
        },
        {
          name: 'isPhone',
          val: contactPhoneNo,
          tips: {
            tipNull: '请填写联系人手机号',
            tipErr: '请输入正确联系人手机号码'
          }
        }

      ]
      // console.log(rules)
      const result = validator(rules, this)
      if (result === true) {
        this.fixPhoneShow = true
      }
      // this.onSavePhone('') // TODO后端接口需要支持验证码传空
    },
    onSavePhone (code) { // 修改就诊人手机号保存
      // console.log(code)
      const params = this.getParams(code)
      updatePatientInfo(params).then(res => { // 成功后将1就诊人手机号状态2按钮状态3验证码弹窗res => { // 成功后将1就诊人手机号状态2按钮状态3验证码弹窗
        // console.log(res)
        this.patientPhoneType = 'phoneSeparate'
        this.isFixShow = true
        this.fixPhoneShow = false
        this.contactCanFix = false
        this.editingContact = false
        this.editingPatientPhone = false
        this.saveContact = false
        this.goBack()
        this.getPatientDetail()
      })
    },
    goBack () { // 有可能从其它页面进补充手机号，操作完毕后跳转回去
      const { redirect } = this.$route.query
      if (redirect) {
        this.$router.replace(decodeURIComponent(redirect))
      }
    },
    getParams (smsCode) { // 修改就诊人信息时传递参数整理
      const { idNo, idType } = this.$route.params
      // console.log(idNo, idType)
      const { contactIdNo, phone, contactPhone, contactUserName, contactIdType } = this.paramReset()
      const obj = {
        cardNo: idNo, cardType: idType, phone, smsCode, contactUserName, contactIdNo, contactIdType, contactPhone
      }
      return obj
    },
    paramReset () { // 整理字段
      const { contactIdNo, contactPhoneNo, contactName, contactIdType, patientPhone } = this
      const obj = {
        contactUserName: reset(contactName),
        contactIdNo: reset(contactIdNo),
        contactPhone: reset(contactPhoneNo),
        contactIdType: reset(contactIdType),
        phone: patientPhone // 此时如果是点击的补充联系人，则该值已被赋值成this.phone
      }
      return obj
      function reset (val) {
        return val === '未填写' ? '' : val
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .patient-detail {
    background-color: #F6F6F6;
  }
  .all-white {
    width: 100%;
    background-color: #fff;
    padding: 30px 0;
    box-sizing: border-box;
  }
  .patient-info {
    padding-bottom: 20px;
  }
  .no-padding {
    padding-top: 0;
    padding-bottom: 0;
  }
  .inner-wrap {
    padding-left: 30px;
    margin-top: 20px;
    &.concat-info-wrap {
      margin-top: 0;
    }
  }
  .active-button {
    margin-top: 60px;
  }
  .del-patient {
    font-size: 26px;
    color:#999;
    margin: 60px auto 122px;
    text-align: center;
  }
  .fill-patient-info {
    color:#5386FF;
    font-size: 24px;
  }
  .fix-btn-wp {
    color: #5386FF;
    font-size: 24px;
    .fix-phone-icon {
      font-size: 22px;
      margin-right: 4px;
    }
  }
  /deep/.left-right-wrap {
    &.patient-phone .right {
      flex: none;
      .clear-icon {
        right: 200px;
      }
    }
    &.high-default-wrap {
      height: 57px;
      line-height: 57px;
      &.input-wrap {
        height: 98px;
        line-height: 98px;
      }
    }
  }
</style>
