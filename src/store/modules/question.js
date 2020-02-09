import { Session } from '@/utils/storage'
import router from '@/router'

// 问题3选择后的Map
const moreQuestionMap = {
  A: [4, 5, 6, 7, 8, 13, 14, 15],
  B: [13, 14, 15],
  C: [9, 13, 14, 15],
  D: [13, 14, 15],
  E: [13, 14, 15],
  F: [11, 13, 14, 15],
  G: [12, 13, 14, 15],
  H: [13, 14, 15],
  I: [13, 14, 15],
  J: [13, 14, 15],
  K: [10, 13, 14, 15],
  L: [11, 12]
}

// 默认队列 1， 2， 3 题
const defaultQueue = [1, 2, 3]

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
    state.answer[state.currentIndex + 1] = payload
    Session.set('__answer', { ...state.answer })
  },
  RESET: () => {
    state.queue = []
    state.currentIndex = -1
    state.answer = {}
    Session.clear()
  }
}

const actions = {
  async generateDefaultQuestionQueue ({ commit, state }) {
    if (state.queue.length === 0) {
      await commit('SET_QUEUE', defaultQueue)
      return commit('SET_INDEX', 0)
    }
  },
  generateQuestionQueue ({ commit, state }, selectedAnswer) {
    let allQuestion = [...defaultQueue]
    Object.keys(selectedAnswer).forEach((q) => {
      allQuestion = allQuestion.concat(moreQuestionMap[q])
    })
    const queue = Array.from(new Set([...allQuestion])).sort((a, b) => a - b)
    const nextIndex = state.currentIndex + 1
    commit('SET_QUEUE', queue)
    commit('SET_INDEX', nextIndex)
    router.replace({ name: `q${queue[nextIndex]}` })
  }
}

export default {
  state,
  mutations,
  actions
}
