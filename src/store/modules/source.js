import { SELECT_INDEX, SOURCE_LIST, HOS_RECOMMEND, SOURCE_DETAIL_LIST, SELECT_STATUS, TIMEOUT_INFO, CURRENT_TIMES, SELECT_WEEK, SELECT_DATE, CLEAR_SOURCE } from '../mutation-types'
const defaultState = () => {
  return {
    sIndex: 0, // 选中日历index
    sourceList: '', // 号源list
    sourceDetailList: [], // 号源详情list
    hosRecommendList: [], // 推荐医院list
    selectStatus: '', // 当前点击号源list的状态
    timeoutInfo: null, // 保存倒计时相关数据
    currentTimes: '', // 保存当前时间
    selectWeek: '', // 特殊医院按周查询，保存
    selectDate: '' // 当前选中日期
  }
}
const state = defaultState()

const mutations = {
  [SELECT_INDEX]: (state, index) => {
    state.sIndex = index
  },
  [SOURCE_LIST]: (state, index) => {
    state.sourceList = index
  },
  [HOS_RECOMMEND]: (state, index) => {
    state.hosRecommendList = index
  },
  [SOURCE_DETAIL_LIST]: (state, index) => {
    state.sourceDetailList = index
  },
  [SELECT_STATUS]: (state, index) => {
    state.selectStatus = index
  },
  [TIMEOUT_INFO]: (state, index) => {
    state.timeoutInfo = index
  },
  [CURRENT_TIMES]: (state, index) => {
    state.currentTimes = index
  },
  [SELECT_WEEK]: (state, index) => {
    state.selectWeek = index
  },
  [SELECT_DATE]: (state, index) => {
    state.selectDate = index
  },
  [CLEAR_SOURCE]: (state, index) => {
    Object.assign(state, defaultState())
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
