import { Session } from '@/utils/storage'

const state = {
  queue: Session.get('queue_model', []),
  answer: Session.get('answer_model', {})
}

const mutations = {
  SET_QUEUE_MODEL: (state, payload) => {
    state.queue = payload
    Session.set('queue_model', payload)
  },
  SET_ANSWER_MODEL: (state, payload) => {
    state.answer = payload
    Session.set('answer_model', { ...state.answer })
  },
  RESET_MODEL: () => {
    state.queue = []
    state.answer = {}
    Session.clear()
  }
}

export default {
  state,
  mutations
}
