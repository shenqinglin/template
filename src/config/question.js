/*
* title 问卷大标题
* backgroundImg 通用背景图
* method （Single：单选 Multiple：多选）
* type （select：选择题 slider：滑动赋值题）
* question 题目
* orderBy 序号
* answer 答案列表
* height （small：小 600px normal：普通 800px）
*/
export const qsJson = {
  title: '新冠肺炎居家自测',
  backgroundImg: '~@/assests/img/bg.png',
  questions: [
    {
      orderBy: 3,
      type: 'select',
      method: 'Multiple',
      question: '请选择您的年龄?',
      height: '',
      answer: [
        {
          value: 'A',
          text: '发热'
        },
        {
          value: 'B',
          text: '咽喉痛'
        },
        {
          value: 'C',
          text: '咳嗽'
        },
        {
          value: 'D',
          text: '鼻塞'
        },
        {
          value: 'E',
          text: '流鼻涕'
        },
        {
          value: 'F',
          text: '胸闷'
        },
        {
          value: 'G',
          text: '气急'
        },
        {
          value: 'H',
          text: '呼吸困难'
        },
        {
          value: 'I',
          text: '全身酸痛'
        },
        {
          value: 'J',
          text: '乏力'
        },
        {
          value: 'K',
          text: '腹泻'
        }
      ]
    },
    {
      orderBy: 1,
      type: 'select',
      method: 'Single',
      height: 'small',
      question: '请选择您的性别?',
      answer: [
        {
          value: 'A',
          text: '男'
        },
        {
          value: 'B',
          text: '女'
        }
      ]
    },
    {
      orderBy: 2,
      type: 'select',
      method: 'Multiple',
      question: '请选择您的年龄?',
      height: 'small',
      answer: [
        {
          value: 'A',
          text: '12岁及以下'
        },
        {
          value: 'B',
          text: '13岁-59岁'
        },
        {
          value: 'C',
          text: '60岁及以上'
        }
      ]
    },
    {
      orderBy: 3,
      type: 'slider',
      question: '目前的体温是多少？',
      height: 'small',
      max: 10,
      min: 0,
      step: 1
    }
  ]
}
// [1,3]
export const sliceQsJson = (arr) => {
  const result = {}
  const question = []
  arr.forEach((ele) => {
    question.push(qsJson.questions[ele - 1])
  })
  result.title = qsJson.title
  result.backgroundImg = qsJson.backgroundImg
  result.questions = question
  return result
}
