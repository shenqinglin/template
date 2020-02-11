const getters = {
  currentIndex: state => state.question.currentIndex,
  queue: state => state.question.queue,
  answer: state => state.question.answer,
  modelQueue: state => state.qs.queue,
  modelAnswer: state => state.qs.answer
}
export default getters
