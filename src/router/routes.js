import Home from '@/views/Home'
import Result from '@/views/Result'
import Question1 from '@/views/Question1'
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
        component: Question1
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
