import Request from '@/utils/request'

// 验证手机号判断是注册还是登录
// export const fetchmobile = (mobile) => Request.get('/wx/verify', { data: { mobile }})
// 发送短信验证码
// export const fetchMessage = (params) => Request.get('/wx/getVerifyCode', { data: { ...params }})

// 登录或者注册
export const fetchLogin = (mobile, code) => Request.post('/wx/v2/login', { data: { mobile, code }})
// 微信登录
export const fetchWechatLogin = (success) => Request.post('/wx/v2/wxLogin', { success })

// 微信绑定手机号后登录
export const fetchWechatPhoneLogin = ({ mobile, code, ignore }) => Request.post('/wx/v2/wxLoginBind', { data: { mobile, code, ignore }})
// 微信授权
export const getAccreditStatus = () => Request.get('/wx/accreditStatus', {})
