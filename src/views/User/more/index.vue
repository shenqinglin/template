<template>
  <v-page
    class="home more"
    :show-header="false"
  >
    <div class="more-list-wp">
      <more-item
        v-for="more in mores"
        :key="more.label"
        :item="more"
      />
    </div>
    <div
      class="white-btn"
      @touchend="loginOut"
    >
      退出登录
    </div>
  </v-page>
</template>

<script>
import MoreItem from './MoreItem'
import { loginOut } from '@/api/user'
export default {
  components: {
    MoreItem
  },
  data () {
    return {
      mores: Object.freeze([
        {
          label: '意见反馈',
          path: '/feedback'
        },
        {
          label: '预约挂号服务协议',
          path: '/service'
        },
        {
          label: '隐私协议',
          path: '/private'
        }
      ])
    }
  },
  methods: {
    loginOut () {
      loginOut().then(_ => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .more {
    background-color: #f6f6f6;
  }
  .more-list-wp {
    background-color: #fff;
    padding: 0 30px;
  }
  .white-btn {
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    color: #999999;
    font-size: 28px;
    text-align: center;
    margin-top: 20px;
  }
</style>
