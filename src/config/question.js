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
