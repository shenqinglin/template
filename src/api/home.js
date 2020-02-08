import Request from '@/utils/request'

// 首页轮播图
export const fetchIndexData = (success) => Request.get('/wx/v2/index/slideshow', { success })
// 首页医院列表
export const fetchHospitalList = (params) => Request.get('/wx/v2/hospital/list', { data: { ...params }})

