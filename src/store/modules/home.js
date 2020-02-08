import { SET_HOME_MIN_HEIGHT } from '../mutation-types'

const state = {
  homeMinHeight: 0
}

const mutations = {
  [SET_HOME_MIN_HEIGHT]: (state, payload) => {
    state.homeMinHeight = payload
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
