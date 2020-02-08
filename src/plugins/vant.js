import Vue from 'vue'
import { STATIC_URL } from '@/config'
import {
  Toast,
  NavBar,
  Swipe,
  SwipeItem,
  Dialog,
  Cell,
  DropdownMenu,
  DropdownItem,
  DatetimePicker,
  Picker,
  Collapse,
  CollapseItem,
  ActionSheet,
  Area,
  CellGroup,
  Uploader,
  Field,
  Lazyload,
  Search,
  List,
  Sticky,
  Popup,
  PasswordInput,
  NumberKeyboard,
  Tab,
  Tabs,
  IndexBar,
  IndexAnchor
} from 'vant'

Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Dialog)
Vue.use(Cell)
Vue.use(Area)
Vue.use(CellGroup)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Collapse).use(CollapseItem)
Vue.use(Uploader)
Vue.use(DatetimePicker)
Vue.use(Picker)
Vue.use(ActionSheet)
Vue.use(Field)
Vue.use(Swipe).use(SwipeItem)// 轮播图
Vue.use(Lazyload, {
  error: STATIC_URL + '/img/default.png'
})// 图片懒加载
Vue.use(Search)// 搜索框
Vue.use(List)// 上拉加载
Vue.use(Sticky)// 吸顶
Vue.use(Popup)// 弹窗层
Vue.use(PasswordInput)// 密码输入框
Vue.use(NumberKeyboard)// 数字键盘
Vue.use(Tab)// 标签
Vue.use(Tabs)// 标签
Vue.use(IndexBar) // 索引栏
Vue.use(IndexAnchor)
