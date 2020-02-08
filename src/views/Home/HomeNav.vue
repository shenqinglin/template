<template>
  <div class="homeNav">
    <ul class="col-center-middle">
      <li
        v-for="(item,index) in iconList"
        :key="index"
        @click="aLink(item.link)"
      >
        <img :src="item.icon">
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config/index'
export default {
  name: 'HomeNav',
  data () {
    return {
      iconList: [{
        icon: `${STATIC_URL}/img/index-department.png`,
        text: '全部科室',
        link: '/allDepartment'
      }, {
        icon: `${STATIC_URL}/img/index-notice.png`,
        text: '公告',
        link: '/notice'
      }, {
        icon: `${STATIC_URL}/img/index-help.png`,
        text: '帮助中心',
        link: 'help'
      }, {
        icon: `${STATIC_URL}/img/index-user.png`,
        text: '个人中心',
        link: '/user'
      }]
    }
  },
  created () {
  },
  methods: {
    aLink (val) {
      this.$router.push(val)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.homeNav {
  padding-bottom: 20px;
  li {
    text-align: center;
    margin-right: 103px;
    margin-top: 30px;
    img {
      width: 72px;
      height: 72px;
      display: inline-block;
    }
    span {
      display: block;
      text-align: center;
      font-size: 22px;
    }
  }
  li:last-child {
    margin-right: 0;
  }
}
</style>
