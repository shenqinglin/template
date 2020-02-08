import { SHOW_CARD_ITEM, PATIENT_INFO } from '../mutation-types'

const state = {
  showCardItem: {},
  patientInfo: {}
}

const mutations = {
  [SHOW_CARD_ITEM]: (state, index) => {
    state.showCardItem = index
  },
  [PATIENT_INFO]: (state, index) => {
    state.patientInfo = index
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
