// import config from '@/config'
import Request from '@/utils/request'
import { md2html } from '@/utils'
// const mdBasePath = `${config.STATIC_URL}/md`

// 通用枚举结构
export const fetchCommonEnum = (keys) => Request.post('/wx/v2/common/enum', { data: { keys }, cache: true })
// 获取markdown内容
// hosCode	否	医院编码
// label	是	标签
// bizType	是	HOSPITAL PLATFORM("平台"),HOSPITAL("医院"),DEPARTMENT("科室");
// deptCode 否 二级科室编码
export const getMarkdown = ({ label, bizType, hosCode, secondDept }) =>
  Request.get('/wx/v2/common/content', { data: { label, bizType, hosCode, secondDept }})
    .then((data) => {
      if (data && data.content) {
        return md2html(data.content)
      }
    })

// 查询全部科室列表
export const getAllDeptList = (success) => Request.get('/wx/v2/department/list/all', { success, cache: true })

// 根据医院id获取科室列表
export const getDeptList = (hosCode) => Request.get('/wx/v2/department/list/hos', { data: { hosCode }, cache: true })

// 获取医院基本信息
export const getHosDetail = (hosCode) => Request.get('/wx/v2/hospital/baseinfo', { data: { hosCode }, cache: true })

// 获取医院详情
export const getHospitalDetail = (hosCode) => Request.get('/wx/v2/hospital/detail', { data: { hosCode }, cache: true })

// 获取订单列表
export const orderList = (params) => Request.get('/wx/v2/order/list', { data: { ...params }})

// 获取订单详情
export const getOrderDetail = ({ orderNo, hosCode }) => Request.get('/wx/v2/order/detail', { data: { orderNo, hosCode }})

// 取消订单
export const cancelOrder = ({ hosCode, orderNo }) => Request.get('/wx/v2/order/cancel', { data: { hosCode, orderNo }, loading: true })

// 获取号源list
export const getSourceList = (params) => Request.post('/wx/v2/product/list', { data: { ...params }})

// 获取号源detail
export const getSourceDetail = (params) => Request.post('/wx/v2/product/detail', { data: { ...params }, cache: true })

// 获取号源页面推荐
export const getRecommend = (params) => Request.get('/wx/v2/product/recommend', { data: { ...params }, cache: true })

// 根据医院id、科室id，查询挂号前确认信息
/**
 * @param {hosCode} 医院id
 * @param {firstDeptCode} 一级科室id
 * @param {secondDeptCode} 二级科室id
 * @param {target} 日期 yyyy-mm-dd
 * @param {uniqProductKey} 唯一key
 */
export const getHosConfirm = ({ hosCode, firstDeptCode, secondDeptCode, target, uniqProductKey, dutyTime }) => Request.post('/wx/v2/product/confirm', { data: { hosCode, firstDeptCode, secondDeptCode, target, uniqProductKey, dutyTime }})

// 查询医院列表拼音信息
export const fetchSearchHospital = (keywords) => Request.get('/wx/v2/hospital/prompts', { data: { keywords }})

// 根据医院id查询是否收藏该医院
export const checkHosIsFavorite = (hosCode) => Request.get('/wx/v2/user/status/follow', { data: { hosCode }})

// 新增收藏医院
export const addHosIsFavorite = (hosCode) => Request.get('/wx/v2/user/follow/hospital', { data: { hosCode }})

// 查询确认挂号预约界面信息
export const getAppointInfo = (params) => Request.post('/wx/order/getAppointInfo', { data: { ...params }, cache: true })

// 订单页-就诊人列表
export const orderPatientList = (showType) => Request.get('/wx/v2/user/patient/list', { data: { showType }})

// 医院收藏列表
export const collectList = (params) => Request.get('/wx/user/favoriteList', { data: { ...params }})
// 取消收藏
export const cancelHosCollect = (hosCode) => Request.get('/wx/v2/user/follow/cancel', { data: { hosCode }})

// 根据科室查询医院列表
// code 标准科室编码
// sortType 排序类型，LEVEL("按等级"),POSITION("按距离");
// areaId 区域编码;
// longitude 经度
// latitude 纬度
// pageNo 页码
// pageSize 页大小
export const departmentReHospitals = ({ code, sortType, LEVEL, areaId, longitude, latitude, pageNo, pageSize }) => Request.get('/wx/v2/department/search', { data: { code, sortType, LEVEL, areaId, longitude, latitude, pageNo, pageSize }})
export const departmentName = (deptCode) => Request.get('/wx/v2/department/standard/detail', { data: { deptCode }})
// 上传图片接口
/*
params: file.file
*/
export const uploadFile = (file, type) => Request.upload('/wx/v2/user/upload', { data: { file, type }, loading: true })

// 申诉提交
// appealType	申诉类型
// appealReason	申诉原因
// userName	姓名
// idType	证件类型
// idNo	证件号码
// pictureUrl	图片地址
// mobileNo	手机号
// smsCode	短信验证码
export const submitAppeal = ({ appealType, appealReason, userName, idType, idNo, pictureUrl, mobileNo, smsCode }) => Request.post('/wx/v2/user/submitAppeal', { data: { appealType, appealReason, userName, idType, idNo, pictureUrl, mobileNo, smsCode }})

// 检查当前登录状态
export const checkLogin = (toPath) => Request.get('/wx/loginStatus', { data: { }, customCatch: true, hasToPath: toPath })
// 检查当前实名状态
export const checkAuthStatus = () => Request.get('/wx/auth/authResult', { data: { }})

// DUTYOFF：停诊公告
export const getNotices = (params) => Request.get('/wx/getNotices', { data: { ...params }, cache: true })
// 公告 SYSTEM：系统公告
export const getSystemNotices = ({ pageNo, pageSize }) => Request.get('/wx/v2/notice/list/platform', { data: { pageNo, pageSize }, cache: true })

// 公告--系统公告详情
export const getNextSystemNotice = (id) => Request.get('/wx/v2/notice/detail/platform', { data: { id }, cache: true })

// 公告--停诊公告详情
export const getDutyOffNotice = (params) => Request.get('/wx/getDutyOffNotice', { data: { ...params }, cache: true })

// 提交订单
/**
* @param {hosCode} 医院id
* @param {firstDeptCode} 一级科室id
* @param {secondDeptCode} 二级科室id
* @param {treatmentDay} 就诊日期
* @param {uniqProductKey} 号源唯一key
* @param {cardType} 卡类型
* @param {cardNo} 卡号码
* @param {smsCode} 短信验证码
* @param {medicareCardId} 医保卡
* @param {jytCardId} 京医通卡
* @param {hospitalCardId} 就诊卡
* @param {mobileNo} 就诊人手机号码
* @param {dutyTime} 分时就诊唯一序号
*/
export const preSaveCheck = ({ hosCode, firstDeptCode, secondDeptCode, treatmentDay, uniqProductKey, cardType, cardNo, smsCode, medicareCardId, jytCardId, hospitalCardId, mobileNo, dutyTime }) => Request.post('/wx/v2/order/preSaveCheck', { data: { hosCode, firstDeptCode, secondDeptCode, treatmentDay, uniqProductKey, cardType, cardNo, smsCode, medicareCardId, jytCardId, hospitalCardId, mobileNo, dutyTime }, loading: true })

export const saveOrder = ({ hosCode, firstDeptCode, secondDeptCode, treatmentDay, uniqProductKey, cardType, cardNo, smsCode, medicareCardId, jytCardId, hospitalCardId, mobileNo, dutyTime }) => Request.post('/wx/v2/order/save', { data: { hosCode, firstDeptCode, secondDeptCode, treatmentDay, uniqProductKey, cardType, cardNo, smsCode, medicareCardId, jytCardId, hospitalCardId, mobileNo, dutyTime }, loading: true })

// 查询科室列表拼音信息
export const fetchSearchDepartment = (keywords) => Request.get('/wx/v2/department/prompts', { data: { keywords }})

// 根据id查询科室名称
export const fetchDeptName = ({ hosCode, firstDeptCode, secondDeptCode }) => Request.get('/wx/v2/department/detail', { data: { hosCode, firstDeptCode, secondDeptCode }})

// 根据就诊人id查询朝阳医院就诊卡
/**
* @param {patientId} 就诊人id
*/
export const getHospitalCard = (patientId) => Request.get('/wx/patient/getCyPatientCard', { data: { patientId }})

// 就诊人修改手机号时获取验证码接口
export const getVerifyCode = (mobile, smsKey, dutySourceId) => Request.get('/wx/v2/getVerifyCode', { data: { mobile, smsKey, dutySourceId }})

// 医院主页权限展示
export const getHosAuthority = (hosCode) => Request.get('/wx/v2/hospital/authority', { data: { hosCode }})

// 查询排队状态
export const fetchOrderStatus = (orderId) => Request.get('/wx/order/lp/status', { data: { orderId }, errorTips: false })
