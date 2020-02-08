import Home from '@/views/Home'
export default [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Home
  },
  {
    path: '/children/department/:hospitalId',
    component: () => import(/* webpackChunkName: "doc-department" */ '@/views/Department'),
    name: 'department',
    meta: {
      title: '预约挂号'
    }
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/AllSearch/HosSearch'),
    name: 'search',
    meta: { title: '搜索' }
  },
  {
    path: '/allDepartment',
    component: () => import(/* webpackChunkName: "all-department" */ '@/views/AllDepartment'),
    name: 'allDepart',
    meta: { title: '全部科室' }
  },
  {
    path: '/depsearch',
    component: () => import(/* webpackChunkName: "depsearch" */ '@/views/AllSearch/DepSearch'),
    name: 'depSearch',
    meta: { title: '全部科室' }
  },
  {
    path: '/user',
    component: _ => import(/* webpackChunkName: "user-center" */ '@/views/User/userCenter'),
    name: 'user',
    meta: { title: '个人中心', requireAuth: true },
    children: [
      {
        path: 'order',
        component: _ => import(/* webpackChunkName: "order" */ '@/views/User/order'),
        name: 'order',
        meta: {
          title: '挂号订单',
          requireAuth: true
        },
        children: [
          {
            path: 'orderDetail/:hosCode/:orderId/:fromPage',
            component: () => import(/* webpackChunkName: "order-detail" */ '@/views/OrderDetail'),
            name: 'OrderDetail',
            meta: {
              title: '订单详情页',
              requireAuth: true
            }
          }
        ]
      },
      {
        path: 'patient',
        component: _ => import(/* webpackChunkName: "user-patient" */ '@/views/User/patient'),
        name: 'patient',
        meta: {
          title: '就诊人',
          requireAuth: true
        },
        children: [
          {
            path: 'history',
            name: 'history',
            component: _ => import(/* webpackChunkName: "history-patient" */ '@/views/User/historyPatient'),
            meta: {
              title: '历史就诊人',
              requireAuth: true
            }
          },
          {
            path: 'patientDetail/:idType/:idNo',
            name: 'patientDetail',
            component: _ => import(/* webpackChunkName: "patient-detail" */ '@/views/User/patientDetail'),
            meta: {
              title: '就诊人详情',
              requireAuth: true
            }
          },
          {
            path: 'addPatient',
            name: 'addPatient',
            component: _ => import(/* webpackChunkName: "addPatient" */ '@/views/User/addPatient'),
            meta: {
              title: '添加就诊人',
              requireAuth: true
            }
          }
        ]
      },
      {
        path: 'collect',
        component: _ => import(/* webpackChunkName: "collect" */ '@/views/User/collect'),
        name: 'collect',
        meta: {
          title: '我的收藏',
          requireAuth: true
        }
      },
      {
        path: 'more',
        component: _ => import(/* webpackChunkName: "more" */ '@/views/User/more'),
        name: 'more',
        meta: {
          title: '更多',
          requireAuth: true
        }
      },
      {
        path: 'fixPhone',
        component: _ => import(/* webpackChunkName: "fix-phone" */ '@/views/User/fixPhone'),
        name: 'fixPhone',
        meta: {
          title: '修改登录手机号',
          requireAuth: true
        }
      },
      {
        path: 'bindWechat',
        component: _ => import(/* webpackChunkName: "bind-wechat" */ '@/views/User/bindWechat'),
        name: 'bindWechat',
        meta: {
          title: '绑定微信',
          requireAuth: true
        }
      },
      {
        path: 'paymentDetail',
        component: () => import(/* webpackChunkName: "payment-list" */ '@/views/User/order/paymentList'),
        name: 'paymentDetail',
        meta: { title: '缴费订单' }
      },
      {
        path: 'report',
        component: () => import(/* webpackChunkName: "inspection-report" */ '@/views/User/InspectionReport'),
        name: 'report',
        meta: { title: '检验报告' }
      },
      {
        path: 'auth',
        name: 'auth',
        component: _ => import(/* webpackChunkName: "auth" */ '@/views/User/auth'),
        meta: {
          title: '实名认证',
          requireAuth: true
        }
      },
      {
        path: 'otherAuth',
        name: 'otherAuth',
        component: _ => import(/* webpackChunkName: "other-auth" */ '@/views/User/otherAuth'),
        meta: {
          title: '实名认证',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: _ => import(/* webpackChunkName: "feedback" */ '@/views/User/feedback'),
    meta: {
      title: '意见反馈',
      requireAuth: true
    }
  },
  {
    path: '/department/:hospitalId',
    component: () => import(/* webpackChunkName: "department" */ '@/views/Department'),
    name: 'department',
    meta: {
      title: '科室列表页'
    }
  },
  {
    path: '/hosDetail/:hospitalId',
    component: () => import(/* webpackChunkName: "department-detail" */ '@/views/Department/detail'),
    name: 'hosDetail',
    meta: { title: '医院详情页' }
  },
  {
    path: '/calendar/:hosCode/:firstDeptCode/:secondDeptCode',
    component: () => import(/* webpackChunkName: "hos-calendar" */ '@/views/HosCalendar'),
    name: 'calendar',
    children: [
      {
        path: 'date',
        component: () => import(/* webpackChunkName: "hos-calendar-date" */ '@/views/HosCalendar/date'),
        name: 'calendarDate',
        meta: {
          title: '预约挂号',
          requireAuth: true
        }
      },
      {
        path: 'expert',
        component: () => import(/* webpackChunkName: "expert" */ '@/views/HosCalendar/expert'),
        name: 'expert',
        meta: {
          title: '预约挂号',
          requireAuth: true
        }
      },
      {
        path: 'doctorIndex/:id',
        component: () => import(/* webpackChunkName: "doctor-index" */ '@/views/HosCalendar/doctorIndex'),
        name: 'doctorIndex',
        meta: {
          title: '专家主页',
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/doctorDetail/:deptId/:id',
    component: () => import(/* webpackChunkName: "doctor-detail" */ '@/views/HosCalendar/doctorDetail'),
    name: 'doctorDetail',
    meta: { title: '专家详情' }
  },
  {
    path: '/confirm/:hosCode/:firstDeptCode/:secondDeptCode/:target/:uniqProductKey/:dutyTime',
    component: () => import(/* webpackChunkName: "hos-confirm" */ '@/views/HosConfirm'),
    name: 'confirm',
    meta: {
      title: '确认预约页',
      requireAuth: true
    }
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
    name: 'login',
    meta: { title: '登录' }
  },
  {
    path: '/Verification',
    component: () => import(/* webpackChunkName: "verification" */ '@/views/Login/Verification'),
    name: 'Verification',
    meta: { title: '登录' }
  },
  {
    path: '/wechatTel',
    component: () => import(/* webpackChunkName: "wechat-tel" */ '@/views/Login/wechatTel'),
    name: 'wechatTel',
    meta: { title: '登录' }
  },
  {
    path: '/appeal',
    component: () => import(/* webpackChunkName: "appeal" */ '@/views/Appeal'),
    name: 'appeal',
    meta: { title: '申诉须知' },
    children: [
      {
        path: 'appealInfo',
        component: () => import(/* webpackChunkName: "appeal-info" */ '@/views/Appeal/appealInfo'),
        name: 'appealInfo',
        meta: { title: '填写申诉信息' }
      },
      {
        path: 'appealSuccess',
        component: () => import(/* webpackChunkName: "success" */ '@/views/Appeal/success'),
        name: 'appealSuccess',
        meta: { title: '提交申诉成功' }
      }
    ]
  },
  {
    path: '/notice',
    component: () => import(/* webpackChunkName: "notice" */ '@/views/Notice'),
    name: 'notice',
    redirect: '/notice/platform',
    meta: { title: '公告' },
    children: [
      {
        path: '/notice/platform',
        component: () => import(/* webpackChunkName: "platform" */ '@/views/Notice/platform'),
        name: 'platform',
        meta: { title: '公告' }
      },
      {
        path: '/notice/stop',
        component: () => import(/* webpackChunkName: "notice-stop" */ '@/views/Notice/stop'),
        name: 'stop',
        meta: { title: '公告' }
      }
    ]
  },
  {
    path: '/noticeDetail/:id',
    component: () => import(/* webpackChunkName: "notice-detail" */ '@/views/Notice/detail'),
    name: 'detail',
    meta: { title: '平台公告' }
  },
  {
    path: '/stopDetail/:id',
    component: () => import(/* webpackChunkName: "stop-detail" */ '@/views/Notice/stopDetail'),
    name: 'stopDetail',
    meta: { title: '停诊公告' }
  },
  {
    path: '/help',
    component: () => import(/* webpackChunkName: "help" */ '@/views/Help'),
    name: 'help',
    meta: { title: '帮助中心' },
    children: [
      {
        path: 'helpContent/:label',
        component: () => import(/* webpackChunkName: "help-content" */ '@/views/Help/helpContent'),
        name: 'helpContent',
        meta: { title: '帮助中心' }
      }
    ]
  },
  {
    path: '/wechatIndex',
    component: () => import(/* webpackChunkName: "wechat-index" */ '@/views/OtherHome/wechatIndex'),
    name: 'wechatIndex',
    meta: { title: '' }
  },
  {
    path: '/appointNotice/:hosCode',
    component: () => import(/* webpackChunkName: "appoint-notice" */ '@/views/OtherHome/appointNotice'),
    name: 'appointNotice',
    meta: { title: '预约须知' }
  },
  {
    path: '/service',
    component: () => import(/* webpackChunkName: "service" */ '@/views/Login/service'),
    name: 'service',
    meta: { title: '预约挂号服务协议' }
  },
  {
    path: '/private',
    component: () => import(/* webpackChunkName: "private" */ '@/views/Login/private'),
    name: 'private',
    meta: { title: '隐私协议' }
  },
  {
    path: '/healthList',
    component: () => import(/* webpackChunkName: "health-list" */ '@/views/OtherHome/healthList'),
    name: 'healthList',
    meta: { title: '健康咨询' }
  },
  {
    path: '/cashier',
    component: () => import(/* webpackChunkName: "cashier" */ '@/views/Pay/Cashier'),
    name: 'cashier',
    meta: { title: '收银台' }
  },
  {
    path: '/paySuccess',
    component: () => import(/* webpackChunkName: "pay-success" */ '@/views/Pay/PaySuccess'),
    name: 'paySuccess',
    meta: { title: '支付成功' }
  },
  {
    path: '/disease/:hosCode',
    component: () => import(/* webpackChunkName: "disease" */ '@/views/Disease'),
    name: 'disease',
    meta: { title: '身体部位' }
  },
  {
    path: '/lookDisease/:hosCode/:id',
    component: () => import(/* webpackChunkName: "look-disease" */ '@/views/Disease/lookDisease'),
    name: 'disease',
    meta: { title: '查看疾病' }
  },
  {
    path: '/disResult/:id',
    component: () => import(/* webpackChunkName: "result" */ '@/views/Disease/result'),
    name: 'disResult',
    meta: { title: '查看疾病' }
  },
  {
    path: '/deptCase/:hosCode/:firstDept/:secondDept',
    component: () => import(/* webpackChunkName: "dept-case" */ '@/views/DeptCase'),
    name: 'deptCase',
    meta: { title: '科室案例' }
  },
  {
    path: '/institute',
    component: () => import(/* webpackChunkName: "institute" */ '@/views/Menu/institute'),
    name: 'institute',
    meta: { title: '合作洽谈' }
  },
  {
    path: '/contribute',
    component: () => import(/* webpackChunkName: "contribute" */ '@/views/Menu/contribute'),
    name: 'contribute',
    meta: { title: '我要投稿' }
  },
  {
    path: '/hyyz',
    component: () => import(/* webpackChunkName: "hyyz" */ '@/views/Menu/hyyz'),
    name: 'hyyz',
    meta: { title: '惠医驿站' }
  },
  {
    path: '/cooperation',
    component: () => import(/* webpackChunkName: "cooperation" */ '@/views/Menu/cooperation'),
    name: 'cooperation',
    meta: { title: '健康讲座' }
  },
  {
    path: '/download',
    component: () => import(/* webpackChunkName: "download" */ '@/views/Menu/download'),
    name: 'download',
    meta: { title: '下载APP' }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "download" */ '@/views/None/404'),
    name: '404',
    meta: { title: '404' }
  },
  {
    path: '/attention',
    component: () => import(/* webpackChunkName: "download" */ '@/views/None/attention'),
    name: 'attention',
    meta: { title: '扫码关注' }
  },
  {
    path: '**',
    redirect: {
      name: 'Home'
    }
  }
]
