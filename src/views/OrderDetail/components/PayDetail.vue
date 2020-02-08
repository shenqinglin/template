<template>
  <div class="order-detail">
    <div class="orderDetail_title">
      <div class="title_left">
        <m-icon
          :class="orderState | showClass"
          :name="orderState | iconShow"
          :desc="orderState | filterStatus"
        />
        <p>{{ orderState | tipShow }}</p>
      </div>
      <div
        v-if="!isPaySource"
        class="title_right"
      >
        <span>识别码</span>
        <p :class="orderState | showClass">
          {{ uniquenessCode }}
        </p>
      </div>
    </div>
    <div class="orderDetail_user">
      <b>{{ patientName }}</b>
      <span>{{ idTypeName }}</span>
      <span>{{ idNo }}</span>
    </div>
    <div class="imgShow">
      1
    </div>
    <head-tip text="缴费信息" />
    <source-info
      :soure-list="soureList"
      :is-border="true"
    />
    <head-tip text="缴费明细" />
    <info-detail />
    <head-tip text="就医指引" />
    <source-info
      :soure-list="guidanceList"
      :is-border="true"
    >
      <b>中医药</b>
    </source-info>
    <hospital-rule :is-pay-source="isPaySource" />
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
import SourceInfo from '@/components/SourceInfo'
import HeadTip from '@/components/HeadTip'
import InfoDetail from './InfoDetail'
import HospitalRule from '@/components/HospitalRule'
import { getOrderDetail } from '@/api/common'
import { orderStatus } from '@/constants/rules'
export default {
  components: {
    MIcon,
    SourceInfo,
    HeadTip,
    InfoDetail,
    HospitalRule
  },
  filters: {
    filterStatus (val) {
      if (!val) {
        return ''
      }
      return orderStatus[val].name
    },
    iconShow (val) {
      if (!val) {
        return ''
      }
      return orderStatus[val].icon
    },
    showClass (val) {
      if (!val) {
        return ''
      }
      return orderStatus[val].class
    },
    tipShow (val) {
      if (!val) {
        return ''
      }
      return orderStatus[val].tips
    }
  },
  data () {
    return {
      orderDetail: null,
      soureList: [],
      uniquenessCode: '', // 识别码
      orderState: '', // 订单状态
      patientName: '', // 就诊人姓名
      idTypeName: '', // 证件类型
      idNo: '', // 证件号
      isPaySource: true,
      guidanceList: []
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      const { fromPage, orderId } = this.$route.params
      console.log(fromPage)
      getOrderDetail(orderId).then(res => {
        this.orderDetail = res
        this.soureList = [
          { name: '开方时间', value: '2019-11-06 17:45:23' },
          { name: '就诊医院', value: res.hospitalName },
          { name: '就诊科室', value: res.departmentName },
          { name: '缴费金额', value: res.totalFee / 100 + '元', blod: true }
        ]
        this.guidanceList = [
          { name: '地点', value: '请到门诊一层8窗口取药' },
          { name: '注意事项', value: '请遵医嘱用药' },
          { name: '说明', value: '说明说明说明说明说明说明说明说明说明说明说明说明说明' }
        ]
        this.uniquenessCode = res.uniquenessCode
        this.orderState = res.orderStatus
        this.patientName = res.patientName
        this.idTypeName = res.idTypeName
        this.idNo = res.idNo
      })
    }
  }
}
</script>
<style lang="less" scoped>
.orderDetail_title{
  width: 690px;
  padding: 23px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
  div{
    .m-icon{
      font-size: 30px;
      color: #999999;
      /deep/.iconfont{
        font-size: 30px;
        font-weight: bold;
      }
      /deep/.desc{
        font-weight: bold;
      }
      &.success{
        color: #5386FF;
      }
    }
    &.title_left{
      p{
        margin-top: 20px;
        color: #999;
        font-size: 24px;
      }
    }
    &.title_right{
      text-align: right;
      p{
        color: #999999;
        font-size: 40px;
        font-weight: bold;
        &.success{
        color: #5386FF;
      }
      }
      span{
        font-size: 22px;
        color: #999999;
      }
    }
  }
}
.orderDetail_user{
  background: #fff;
  padding: 10px 30px 30px;
  margin-top: 20px;
  overflow: hidden;
  font-size: 28px;
  b{
    color: #333;
    font-weight: bold;
    font-size: 28px;
    margin-right: 20px;
  }
  span{
    color: #999999;
    font-size: 24px;
    margin-right: 10px;
  }
}
.imgShow{
  height: 240px;
  margin: 0 30px 30px;
  background: #F6F9FF;
}
</style>
