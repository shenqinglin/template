<template>
  <v-page
    class="home"
    :show-header="false"
  >
    <head-title />
    <div class="page-wrap">
      <auth-info
        :auth-state="authState"
        :phone="phone"
        :user-name="authState?userName:phone"
        @click.native="onStatusClick"
      />
      <div class="user-info">
        <up-nav
          v-for="nav in upNavs"
          :key="nav.route"
          :obj="nav"
          :auth-status="authState"
          @statusInfoShow="statusInfoShow"
        />
        <one-pixel />
      </div>
      <div class="more-list">
        <center-list
          v-for="more in moreList"
          :key="more.icon"
          :obj="more"
        >
          <slot v-if="more.slot">
            <span class="bind-word">{{ isBind }}</span>
          </slot>
        </center-list>
      </div>
      <home-index />
    </div>
    <auth-content
      :show-content="authStatusInfoShow"
      @close-content="onCloseContent"
    />
  </v-page>
</template>

<script>
import { STATIC_URL } from '@/config'
import HeadTitle from './HeadTitle'
import AuthInfo from './AuthInfo'
import AuthContent from './AuthContent'
import UpNav from './UpNav'
import CenterList from './CenterList'
import HomeIndex from './HomeIndex'
import { getUserInfo, wechatBindInfo, authStatus } from '@/api/user'
import { fetchCommonEnum } from '@/api/common'
import OnePixel from '@/components/OnePixel'
export default {
  components: {
    HeadTitle, AuthInfo, UpNav, CenterList, HomeIndex, AuthContent, OnePixel
  },
  data () {
    return {
      authStatusInfoShow: false, // 实名认证上拉菜单展示与否
      phone: '',
      authState: '', // 认证状态标识 OK,FAILED,PROCESSING
      isBind: '', // 未||已 绑定
      userName: '', // 账号姓名
      upNavs: Object.freeze([
        {
          label: '就诊人',
          icon: `${STATIC_URL}/img/user-patient.png`,
          route: '/user/patient'
        },
        {
          label: '挂号订单',
          icon: `${STATIC_URL}/img/user-order.png`,
          route: '/user/order'
        }
        // {
        //   label: '缴费订单',
        //   icon: `${STATIC_URL}/img/payPic.png`,
        //   route: '/user/paymentDetail'
        // },
        // {
        //   label: '检验报告',
        //   icon: `${STATIC_URL}/img/report.png`,
        //   route: '/user/report'
        // }
      ]),
      moreList: Object.freeze([
        {
          icon: 'collect',
          label: '我的收藏',
          route: '/user/collect'
        },
        {
          icon: 'phone',
          label: '修改登录手机号',
          route: '/user/fixPhone'
        },
        {
          icon: 'weChat',
          label: '绑定微信',
          route: '/user/bindWeChat', // 绑定微信/解绑微信在一个路由里处理
          slot: true
        },
        {
          icon: 'more',
          label: '更多',
          route: '/user/more'
        }
      ])
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.name === 'bindWechat') {
      this.wechatBindInfo()
    }
    if (from.name === 'auth' || from.name === 'otherAuth') {
      this.getUserInfo()
      this.authResultInfo()
    }
    if (from.name === 'fixPhone') {
      this.getUserInfo()
    }
    next()
  },
  mounted () {
    this.getUserInfo()
    this.wechatBindInfo()
    this.authResultInfo()
    this.fetchCommonEnum()
  },
  methods: {
    getUserInfo () { // 获取个人信息
      getUserInfo().then(data => {
        // console.log(data)
        this.phone = data.mobile
        this.userName = data.name
      })
    },
    fetchCommonEnum () {
      fetchCommonEnum('AUTH_STATUS').then(data => {
        // console.log(data)
      })
    },
    wechatBindInfo () { // 微信绑定信息
      wechatBindInfo().then(data => {
        this.isBind = data.status ? '已绑定' : '未绑定'
      })
    },
    authResultInfo () { // 获取用户认证结果
      authStatus().then(data => {
        this.authState = data.status
      })
    },
    onStatusClick () {
      if (this.authState === 'FAILED') {
        this.$router.push({
          name: 'auth'
        })
      } else {
        this.authStatusInfoShow = true
      }
    },
    onCloseContent (val) {
      this.authStatusInfoShow = false
    },
    statusInfoShow (val) {
      this.authStatusInfoShow = val
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .page-wrap {
    padding: 0 30px;
    .bind-word {
      display: inline-block;
      color: #999999;
      font-size: 28px;
      margin-right: 10px;
    }
  }
  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 110px 0px 50px;
    margin: 0;
    position: relative;
    /* border-bottom: 1px solid #EEE; */
  }
</style>
