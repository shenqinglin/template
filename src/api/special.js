// 301接口
import Request from '@/utils/request'
// 获取身体部位
export const fetchBody = () => Request.get('/wx/v2/s/body', { data: { }})

// 按照身体部位查询
export const searchByDisease = (id) => Request.get('/wx/v2/s/disease', { data: { id }})

// 按疾病搜索提示查询
export const fetchSearchDisease = (keyword) => Request.get('/wx/v2/s/prompts', { data: { keyword }})
// 疾病下科室
export const deptDetail = (id) => Request.get('/wx/v2/s/deptDetail', { data: { id }})

// 科室下医生列表
export const doctorList = (deptCode) => Request.get('/wx/v2/s/doctorList', { data: { deptCode }})

// 医生详情
export const doctorDetail = (deptId, doctorId) => Request.get('/wx/v2/s/doctorDetail', { data: { deptId, doctorId }})

// 医生号源列表
export const doctorDutyList = (deptCode, doctorId, week) => Request.get('/wx/v2/product/s/doctorDutyList', { data: { deptCode, doctorId, week }})

// 科室号源列表
export const deptDutyList = (deptId, doctorId, week) => Request.get('/wx/v2/product/s/deptDutyList', { data: { deptId, doctorId, week }})

// 号源日历页面展示权限
export const sourceAuthority = (hosCode) => Request.get('/wx/v2/product/authority', { data: { hosCode }})

// -特色科室
export const specDeptDoctorList = (deptCode) => Request.get('/wx/v2/s/specDeptDoctorList', { data: { deptCode }})
