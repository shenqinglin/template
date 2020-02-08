import { INCLUDE_PAGE } from '../mutation-types'
const state = {
  includePage: ['Home', 'Notice', 'Department']
}
const actions = {
}
const getters = {
  includePage: state => state.includePage
}
const mutations = {
  [INCLUDE_PAGE] (state, obj) {
    if (obj.flag) {
      state.includePage.push(obj.pageName)
    } else {
      state.includePage.splice(state.includePage.indexOf(obj.pageName), 1)
    }
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
