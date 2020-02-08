import { SET_TEST_INFO } from '../mutation-types'

const state = {
  testInfo: ''
}

const mutations = {
  [SET_TEST_INFO]: (state, payload) => {
    state.testInfo = payload
  }
}

const actions = {
  setTestInfo ({ commit }, data) {
    commit(SET_TEST_INFO, data)
  },
  hideLoading () {

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
