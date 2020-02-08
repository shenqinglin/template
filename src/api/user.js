import Request from '@/utils/request'
//  个人中心
export const getUserInfo = _ => Request.get('/wx/v2/user/info')

//  微信绑定信息
export const wechatBindInfo = _ => Request.post('/wx/v2/user/status/bind', {
  customCatch: true
})
//  解绑微信
export const wechatUnBind = _ => Request.post('/wx/wechatUnBind')
//  绑定微信
export const wechatBind = _ => Request.post('/wx/wechatBind')
// 用户实名认证状态
export const authStatus = _ => Request.get('/wx/v2/user/status/realname')
//  实名认证，身份证认证时不传idImg，非身份证时传递idImg
export const saveAuth = ({ name, idType, idNo, idImg }) => Request.post('/wx/v2/user/realname', { data: { name, idType, idNo, idImg }})
// 查询实名结果 authStatus: OK 成功; FAILED 失败; PROCESSING 认证中
export const authResult = _ => Request.get('/wx/auth/authResult')
// 就诊人列表
export const patientList = showType => Request.get('/wx/v2/user/patient/list', { data: { showType }})
// 就诊人详情
export const patientDetail = (idType, idNo) => Request.get('/wx/v2/user/patient/detail', { data: { idType, idNo }})
// 订单页面就诊人列表
// export const orderPatientList = _ => Request.get('/wx/patient/orderPatientList')
// 历史就诊人列表
export const historyPatientList = _ => Request.get('/wx/v2/user/patient/history', { cache: true })
// 就诊人修改手机号时获取验证码接口
// export const getVerifyCode = (mobile, smsKey) => Request.get('/wx/getVerifyCode', { data: { mobile, smsKey }})
// 修改就诊人信息，主要是修改就诊人手机号、就诊人补充内容
export const updatePatientInfo = params => Request.post('/wx/patient/updatePatientInfo', { data: { ...params }})
// 删除就诊人
// export const delPatient = (cardNo, cardType, checkOrder) => Request.post('/wx/patient/delPatient', { data: { cardNo, cardType, checkOrder }})
// 删除就诊人 v2
export const delPatient = ({ idType, idNo, isHistory }) => Request.get('/wx/v2/user/patient/del', { data: { idType, idNo, isHistory }})
// 激活就诊人
// export const activePatient = (cardNo, cardType) => Request.post('/wx/patient/activePatient', { data: { cardNo, cardType }})
// 激活就诊人v2
export const activePatient = ({ idType, idNo }) => Request.get('/wx/v2/user/patient/active', { data: { idType, idNo }})
// 添加就诊人
// export const addPatient = params => Request.post('/wx/patient/addPatient', { data: { ...params }})
// 添加就诊人--新v2
export const addPatientNew = ({ patientInfo, archivalInfo, contactInfo, verificationCode }) => Request.post('/wx/v2/user/patient/new', { data: { patientInfo, archivalInfo, contactInfo, verificationCode }})
// 新增就诊人前置检查--v2
export const addPatientPreCheck = ({ patientInfo, archivalInfo, contactInfo, verificationCode }) => Request.post('/wx/v2/user/patient/new/preCheck', { data: { patientInfo, archivalInfo, contactInfo, verificationCode }})
// 获取省份地址
export const getProvinces = _ => Request.get('/wx/getProvinces', { cache: true })
// 获取市级地址
export const getCitys = provinceId => Request.get('/wx/getCitys', { data: { provinceId }, cache: true })
// 获取地级地址
export const getCountys = cityId => Request.get('/wx/getCountys', { data: { cityId }, cache: true })
// 退出登录
export const loginOut = _ => Request.get('/wx/logout')
// 意见反馈
export const feedBack = content => Request.post('/wx/user/feedBack', { data: { content }})
// 修改手机号
export const updatePhone = ({ phone, verifyCode }) => Request.get('/wx/v2/user/modify/phone', { data: { phone, verifyCode }})
