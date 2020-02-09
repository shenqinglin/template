import Home from '@/views/Home'
import Result from '@/views/Result'
import Question1 from '@/views/Question1'
import Question2 from '@/views/Question2'
import Question3 from '@/views/Question3'
import Question4 from '@/views/Question4'
import Question5 from '@/views/Question5'
import Question6 from '@/views/Question6'
import Question7 from '@/views/Question7'
import Question8 from '@/views/Question8'
import Question9 from '@/views/Question9'
import Question10 from '@/views/Question10'
import Question11 from '@/views/Question11'
import Question12 from '@/views/Question12'
import Question13 from '@/views/Question13'
import Question14 from '@/views/Question14'
import Question15 from '@/views/Question15'
import Hot from '@/views/Hot'

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/q1',
    children: [
      {
        path: 'q1',
        name: 'q1',
        component: Question1
      },
      {
        path: 'q2',
        name: 'q2',
        component: Question2
      },
      {
        path: 'q3',
        name: 'q3',
        component: Question3
      },
      {
        path: 'q4',
        name: 'q4',
        component: Question4
      },
      {
        path: 'q5',
        name: 'q5',
        component: Question5
      },
      {
        path: 'q6',
        name: 'q6',
        component: Question6
      },
      {
        path: 'q7',
        name: 'q7',
        component: Question7
      },
      {
        path: 'q8',
        name: 'q8',
        component: Question8
      },
      {
        path: 'q9',
        name: 'q9',
        component: Question9
      },
      {
        path: 'q10',
        name: 'q10',
        component: Question10
      },
      {
        path: 'q11',
        name: 'q11',
        component: Question11
      },
      {
        path: 'q12',
        name: 'q12',
        component: Question12
      },
      {
        path: 'q13',
        name: 'q13',
        component: Question13
      },
      {
        path: 'q14',
        name: 'q14',
        component: Question14
      },
      {
        path: 'q15',
        name: 'q15',
        component: Question15
      }
    ]
  },
  {
    path: '/result',
    name: 'result',
    component: Result
  },
  {
    path: '/hot',
    name: 'hot',
    component: Hot
  }
]
