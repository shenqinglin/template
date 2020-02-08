// 当前node环境
export const ENV = process.env.NODE_ENV
export const NOOP = () => {}
// 就诊人最大数量
export const patientNumber = 4
// 验证码长度
export const verifyCodeLen = 6
// 验证码倒计时秒数
export const countTimes = 60
// 意见反馈可输入字符总量
export const feedbackTotal = 200
// 删除就诊人时的checkOrder字段
export const checkOrder = {
  history: false,
  notHistory: true
}
// 实名认证状态
export const AUTH = {
  OK: '已认证',
  FAILED: '认证失败',
  PROCESSING: '认证中'
}
// 证件类型
export const cardOption = [
  {
    name: '港澳居民居住证',
    cardType: 'GA_RESIDENCE_PERMIT',
    value: '9'
  },
  {
    name: '台湾居民居住证',
    cardType: 'TAIWAN_RESIDENCE_PERMIT',
    value: '10'
  },
  {
    name: '港澳居民来往内地通行证',
    cardType: 'GATE_PASS',
    value: '4'
  },
  {
    name: '台湾居民来往大陆通行证',
    cardType: 'TAIBAOZHENG',
    value: '5'
  },
  {
    name: '外国人永久居留身份证',
    cardType: 'FOREIGN_IDENTITY_CARD',
    value: '7'
  },
  {
    name: '护照',
    cardType: 'PASSPORT',
    value: '3'
  }
]
export const allIdCards = addIdCard()
// 民族
const preNations = ['汉族', '壮族', '回族', '满族', '维吾尔族', '阿昌族', '白族', '保安族', '布朗族', '布依族',
  '藏族', '朝鲜族', '达斡尔族', '傣族',
  '德昂族', '东乡族', '侗族', '独龙族', '俄罗斯族', '鄂伦春族', '鄂温克族', '高山族', '哈尼族', '哈萨克族',
  '赫哲族', '基诺族', '京族', '景颇族', '柯尔克孜族',
  '拉祜族', '黎族', '傈僳族', '毛南族', '门巴族', '蒙古族', '苗族', '纳西族', '怒族', '普米族', '羌族',
  '撒拉族', '水族', '塔吉克族', '塔塔尔族', '土家族',
  '土族', '乌孜别克族', '锡伯族', '瑶族', '彝族', '裕固族', '仡佬族', '仫佬族', '佤族', '珞巴族', '畲族',
  '其他']
export const NATIONS = handleArr(preNations)
// 性别
// export const SEX = [{ name: '男', value: 'MALE' }, { name: '女', value: 'FEMALE' }]
// 婚姻状况
export const marryStatus = [{ name: '未婚', value: 'UNMARRIED' }, { name: '已婚', value: 'MARRIED' }]
// 是否专程来京就医
export const seeDoctorSpecial = [{ key: true, value: '是' }, { key: false, value: '否' }]
// 获取验证码smsKey
export const SMSKEY = {
  login: 'LOGIN', // 登录
  auth: 'REAL_NAME_CERT', // 实名认证
  password: 'MODIFY_PASSWORD', // 修改密码
  tel: 'MODIFY_MOBILE_NEW', // 修改手机号、卡相关
  order: 'ORDER_CODE', // 预约挂号
  patient: 'MODIFY_PATIENT', // 修改就诊人信息
  addPatient: 'ADDPATIENT' // 添加就诊人
}
// 国籍
export const COUNTRYTYPE = [{ name: '中国', value: 'CHINESE' }, { name: '外国', value: 'FOREIGNER' }]
// 省编码
// export const ProvinceCodeMap = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
function handleArr (arr) {
  return arr.map(item => {
    return {
      name: item,
      value: item
    }
  })
}
function addIdCard () {
  return [
    {
      name: '居民身份证（包含现役军人、人民武装警察）',
      cardType: 'IDENTITY_CARD',
      value: '1'
    },
    ...cardOption
  ]
}

export const appealOption = [
  {
    name: '更换登录手机号',
    value: 1
  },
  {
    name: '实名认证未通过',
    value: 3
  },
  {
    name: '注销注册手机号',
    value: 5
  },
  {
    name: '实名信息被绑定',
    value: 6
  },
  {
    name: '就诊人被绑定',
    value: 7
  },
  {
    name: '其他',
    value: 4
  }
]
export const hosNameMap = {
  '301HP': {
    id: 162,
    name: '中国人民解放军总医院(301医院)'
  },
  'CY': {
    id: 91,
    name: '北京朝阳医院本部'
  },
  'SJQ': {
    id: 254,
    name: '北京四季青医院'
  },
  '307HP': {
    id: 149,
    name: '解放军307医院'
  },
  'HKZ_YY': {
    id: 129,
    name: '空军总医院'
  },
  'CY_YY': {
    id: 91,
    name: '北京朝阳医院本部'
  },
  'HT_CENTER': {
    id: 132,
    name: '航天中心医院(原721医院)'
  }
}
export const orderStatus = {
  'CANCEL': '已取消',
  'SUCCESS': '预约成功'
}
// 确认挂号页面，挂号信息提示
export const SOURCE_TIP = {
  noPayTip: '具体费用以取号当天医院收取为准，对您造成的不便敬请谅解',
  payTip: '挂号费由医院全额收取，平台不收取任何费用'
}
export const DOCTOR_SOURCE_STATE = {
  ON_DUTY: { name: '挂号', state: '' },
  STOPPED: { name: '停诊', state: 'grey' },
  NO_NUMBER: { name: '约满', state: 'grey' },
  EXCHANGE_DOCTOR: { name: '替诊', state: 'grey' },
  APPOINTMENT_STOPED: { name: '已停挂', state: 'grey' },
  UNDISCHARGED: { name: '未放出', state: 'grey' },
  INVALID: { name: '无效', state: 'grey' }
}

export const DOCTOR_DUTY_CODE = {
  'MORNING': '上午',
  'AFTERNOON': '下午',
  'EVENING': '晚上',
  'ALL': '全部'
}

export const DOCTOR_WEEK_CODE = {
  'MONDAY': '周一',
  'TUESDAY': '周二',
  'WEDNESDAY': '周三',
  'THURSDAY': '周四',
  'FRIDAY': '周五',
  'SATURDAY': '周六',
  'SUNDAY': '周日',
  'UNKNOWN': '未知',
  'ALL': '全部'
}
export const NO_NEED_ACCREDIT = ['/login', '/institute', '/contribute', '/hyyz', '/cooperation', '/cooperation', '/download', '/feedback', '/appeal', '/appeal/appealInfo']
