import { Session } from '@/utils/storage'

const state = {
  currentIndex: Session.get('__currentIndex', -1),
  queue: Session.get('__queue', []),
  answer: Session.get('__answer', {})
}

const mutations = {
  SET_QUEUE: (state, payload) => {
    state.queue = payload
    Session.set('__queue', payload)
  },
  SET_INDEX: (state, payload) => {
    state.currentIndex = payload
    Session.set('__currentIndex', payload)
  },
  SET_ANSWER: (state, payload) => {
    state.answer[payload.qNo] = payload.answer
    Session.set('__answer', { ...state.answer })
  },
  RESET: () => {
    state.queue = []
    state.currentIndex = -1
    state.answer = {}
    Session.clear()
  }
}

export default {
  state,
  mutations
}
