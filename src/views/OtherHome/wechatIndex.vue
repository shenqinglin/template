<template>
  <v-page
    class="wechatIndex"
    :show-header="false"
    :show-blue-head="true"
  >
    <ul class="wechatIndex-ul">
      <li
        v-for="(item,index) in list"
        :key="index"
      >
        <p @click="listClick(item.name)">
          <img :src="item.icon">
          <span>{{ item.text }}</span>
          <v-icon
            name="right"
            class="float-right"
          />
        </p>
      </li>
    </ul>
  </v-page>
</template>

<script>
import { STATIC_URL } from '@/config/index'
import { hosNameMap } from '@/constants/index'
export default {
  data () {
    return {
      list: [{
        icon: `${STATIC_URL}/img/yuyue.png`,
        text: '预约挂号',
        name: 'yygh'
      }, {
        icon: `${STATIC_URL}/img/user-order2.png`,
        text: '订单及个人中心',
        name: 'order'
      }, {
        icon: `${STATIC_URL}/img/xuzhi.png`,
        text: '预约须知',
        name: 'yyxz'
      }, {
        icon: `${STATIC_URL}/img/tingzhen.png`,
        text: '停诊信息',
        name: 'stopMessage'
      }],
      hosIdList: hosNameMap
    }
  },
  computed: {
    hospitalId () {
      return this.$route.query.id
    }
  },
  created () {
  },
  methods: {
    listClick (name) {
      switch (name) {
        case 'yygh':
          this.$router.push({ name: 'department', params: { hospitalId: this.hospitalId }})
          break
        case 'order':
          this.$router.push({ name: 'order' })
          break
        case 'yyxz':
          this.$router.push({ name: 'appointNotice' })
          break
        case 'stopMessage':
          this.$router.push({ name: 'notice' })
          break
        default:
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .wechatIndex-ul{
    padding-left:30px;
    li{
      padding: 60px 0;
      border-bottom:2px solid #eee;
      overflow: hidden;
      img{
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 30px;
      }
      span{
        float: left;
        margin-top: 2px;
        font-size: 32px;
      }
      .float-right{
        float: right;
        font-size: 26px;
        color: #ddd;
        margin-right: 30px;
        margin-top: 12px;
      }
    }
  }
</style>

