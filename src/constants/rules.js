// import { ProvinceCodeMap } from './index'
export const required = (args) => {
  if (typeof args === 'string') {
    args = { message: args }
  }
  const { message, trigger = 'change' } = args
  return { required: true, message, trigger }
}

export const length = ({ max, min, message, trigger = 'change' }) => (
  { min, max, message, trigger }
)

export const phoneNum = [
  required({
    message: '手机号不能为空',
    trigger: 'change'
  }),
  length({
    max: 11,
    min: 11,
    message: '请输入11位有效手机号',
    trigger: 'blur'
  })
]
// 手机号验证
export const isPhone = tel => {
  const re = /(^(13|14|15|16|17|18|19)\d{9}$)|(^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$)/
  return re.test(tel)
}
// 用户名验证
export const userNameCheck = (name, vue) => {
  const re = /(^[a-zA-Z]{2,50}(\·[a-zA-Z]{1,})*$)|(^[\u4E00-\u9FFF]{1,}(\·[\u4E00-\u9FFF]{1,})*$)/
  const r = re.test(name)
  if (r === false) {
    vue.$toast('请输入4-30位开头的字母或2-10个汉字')
    return false
  } else {
    return true
  }
}
// 身份证验证
export const identityCheck = (id, vue) => {
  id = id.toLowerCase()
  if (!/^\d{17}(\d|x)$/i.test(id)) {
    vue.$toast('证件号无效')
    return false
  } else {
    return true
  }
}

// 输入校验规则的方法名&值;tips里可以写空值和非空未通过的错误提示，
// 也可以通过配置tips.show=false控制不弹toast而只返回校验结果
export const CHECK = {
  isPhone (tel, vue, tips) { // 手机号校验
    const re = /(^(13|14|15|16|17|18|19)\d{9}$)|(^0(([1,2]\d)|([3-9]\d{2}))\d{7,8}$)/
    tips = Object.assign({
      tipNull: '请输入手机号',
      tipErr: '您输入的手机号码格式有误'
    }, tips)
    if (!tel) {
      vue.$toast(tips.tipNull)
      return false
    }
    const result = re.test(tel)
    if (result === false) {
      vue.$toast(tips.tipErr)
    }
    return result
  },
  cardType (type, vue, tips) { // 证件类型非空校验
    tips = tips || {
      tipNull: '请选择证件类型'
    }
    if (!type) {
      if (tips.show !== false) {
        vue.$toast(tips.tipNull)
      }

      return false
    }
    return true
  },
  userName (name, vue, tips) { // 校验姓名
    const re = /(^[a-zA-Z]{2,50}(\·[a-zA-Z]{1,})*$)|(^[\u4E00-\u9FFF]{1,}(\·[\u4E00-\u9FFF]{1,})*$)/
    const result = re.test(name)
    tips = tips || {
      tipNull: '请输入姓名',
      tipErr: '请输入正确的姓名'
    }
    if (!name) {
      if (tips.show !== false) {
        vue.$toast(tips.tipNull)
      }
      return false
    }
    if (result === false) {
      if (tips.show !== false) {
        vue.$toast(tips.tipErr)
      }
    }
    return result
  },
  validateCode (code, vue) { // 校验验证码
    if (!code) {
      vue.$toast('请输入验证码')
      return false
    } else if (!/^\d{6}$/.test(code)) {
      vue.$toast('请输入正确的验证码')
      return false
    } else {
      return true
    }
  },
  cardNumberValidate (opts) {
    const { num, tips, re, vue } = opts
    const result = re.test(num)
    if (!num) {
      if (tips.show !== false) {
        vue.$toast(tips.tipNull)
      }
      return false
    }
    if (result === false) {
      if (tips.show !== false) {
        vue.$toast(tips.tipErr)
      }
    }
    return result
  },
  IDENTITY_CARD (num, vue, tips) { // 身份证18位校验
    const re = /^(\d{15}|\d{18}|\d{17}[a-zA-Z]{1})$/
    tips = tips || {
      tipNull: '请输入身份证号',
      tipErr: '请输入有效身份证号码'
    }
    return this.cardNumberValidate({
      num, re, vue, tips
    })
  },
  PASSPORT (num, vue, tips) { // 护照的校验
    const re = /\S{8,14}/
    tips = tips || {
      tipNull: '请输入护照号',
      tipErr: '请输入正确的护照号'
    }
    return this.cardNumberValidate({
      num, re, vue, tips
    })
  },
  GATE_PASS (num, vue, tips) { // 港澳居民来往内地通行证
    const re = /\S{9,12}/
    tips = tips || {
      tipNull: '请输入证件号码',
      tipErr: '请输入正确的证件号码'
    }
    return this.cardNumberValidate({
      num, re, vue, tips
    })
  },
  TAIBAOZHENG (num, vue, tips) { // 台湾居民来往大陆通行证
    const re = /\S{8,11}/
    tips = tips || {
      tipNull: '请输入证件号码',
      tipErr: '请输入正确的证件号码'
    }
    return this.cardNumberValidate({
      num, re, vue, tips
    })
  },
  FOREIGN_IDENTITY_CARD (num, vue, tips) { // 外国人永久居留身份证
    const re = /\S{6,25}/
    tips = tips || {
      tipNull: '请输入证件号码',
      tipErr: '请输入正确的证件号码'
    }
    return this.cardNumberValidate({
      num, re, vue, tips
    })
  },
  GA_RESIDENCE_PERMIT (num, vue, tips) { // 港澳居民居住证
    return this.FOREIGN_IDENTITY_CARD(num, vue, tips)
  },
  TAIWAN_RESIDENCE_PERMIT (num, vue, tips) { // 台湾居民居住证
    return this.FOREIGN_IDENTITY_CARD(num, vue, tips)
  },
  checkMedicareCardId (num, vue, tips) {
    if (!num) {
      vue.$toast('北京社保卡不能为空')
      return false
    } else if (/^\d{12}$/.test(num)) {
      vue.$toast('请填写12位北京社保卡条码号')
      return false
    } else {
      return true
    }
  },
  checkJytCardId (num, vue, tips) {
    if (!num) {
      vue.$toast('院内就诊卡不能为空')
      return false
    } else if (/^(98)\d{12}$/.test(num)) {
      vue.$toast('请填写98开头的14位京医通卡号')
      return false
    } else {
      return true
    }
  },
  checkHospitalCardId (num, vue, tips) {
    if (!num) {
      vue.$toast('院内就诊卡不能为空')
      return false
    } else {
      return true
    }
  }
}

// 校验方法，对传入的rules每一项进行校验，只有全部通过才返回true
export const validator = (rules, vue) => {
  const result = rules.every(rule => {
    return CHECK[rule.name](rule.val, vue, rule.tips)
  })
  return result
}
//
// 订单状态映射
export const orderStatus = {
  'CANCEL': {
    name: '已取消',
    class: '',
    icon: 'ghSuccess'
  },
  'SUCCESS': {
    name: '预约成功',
    class: 'success',
    icon: 'ghSuccess'
  },
  'NO_SHOW': {
    name: '未就诊',
    class: 'success',
    icon: 'ghSuccess'
  },
  'STOP': {
    name: '停诊',
    class: 'success',
    icon: 'ghSuccess'
  },
  'TAKE': {
    name: '已取号',
    class: 'success',
    icon: 'ghSuccess'
  },
  'PAYING': {
    name: '待缴费',
    class: 'success',
    icon: 'ghPay',
    tips: '不支持工伤、特病患者微信缴费，请到医院窗口缴费'
  },
  'CONFIRMING': {
    name: '确认中',
    class: 'success',
    icon: 'ghPay',
    tips: '缴费成功，医院信息异常，请到医院窗口处理'
  },
  'PAY_SUCCESS': {
    name: '已缴费',
    class: 'success',
    icon: 'ghPay',
    tips: '缴费成功，请到医院自助机打印缴费清单'
  },
  'REFUNDING': {
    name: '退款中',
    class: 'success',
    icon: 'ghPay',
    tips: '退款将于10个工作日内退回至原支付方式'
  },
  'REFUNDED': {
    name: '已退款',
    class: '',
    icon: 'ghPay',
    tips: '退款已于2019-03-12 18:00:00退回至原支付方式'
  }
}
export const toDay = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
}
export const toStatus = {
  1: {
    name: '有号',
    value: 'AVAILABLE'
  },
  2: {
    name: '电话',
    value: 'CALLCENTER_AVAILABLE'
  },
  4: {
    name: '约满',
    value: 'SOLD_OUT'
  },
  32: {
    name: '无号',
    value: 'NO_INVENTORY'
  },
  100: {
    name: '即将放号',
    value: 'WAIT_OPEN'
  }
}
export const SOURCE_STATUS = {
  'NO_INVENTORY': '无号',
  'AVAILABLE': '有号',
  'SOLD_OUT': '约满',
  'CALLCENTER_AVAILABLE': '有号',
  'TOMORROW_OPEN': '即将放号'
}
export const dutyStatus = {
  'MORNING': '上午',
  'AFTERNOON': '下午',
  'EVENING': '夜晚'
}
export const patientNumber = 4
export const dutyWeek = ['一', '二', '三', '四', '五', '六', '日']
export const formatSeconds = (value) => {
  let seconds = parseInt(value)// 需要转换的时间秒
  let minutes = 0 // 分
  let hours = 0 // 小时
  let days = 0 // 天
  if (seconds >= 60) {
    minutes = parseInt(seconds / 60)
    seconds = parseInt(seconds % 60)
    if (minutes > 60) {
      hours = parseInt(minutes / 60)
      minutes = parseInt(minutes % 60)
      if (hours > 24) {
        // 大于24小时
        days = parseInt(hours / 24)
        hours = parseInt(hours % 24)
      }
    }
  }
  return {
    days: days > 0 ? days >= 10 ? parseInt(days) : '0' + parseInt(days) : '00',
    hours: hours > 0 ? hours >= 10 ? parseInt(hours) : '0' + parseInt(hours) : '00',
    minutes: minutes > 0 ? minutes >= 10 ? parseInt(minutes) : '0' + parseInt(minutes) : '00',
    seconds: seconds > 0 ? seconds >= 10 ? parseInt(seconds) : '0' + parseInt(seconds) : '00'
  }
}
