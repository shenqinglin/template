<template>
  <div class="order-detail">
    <div class="orderDetail_title">
      <div class="title_left">
        <m-icon
          :class="orderState | showClass"
          :name="orderState | iconShow"
          :desc="orderState | filterStatus"
        />
      </div>
      <div
        v-if="!isPaySource && identifyingCode"
        class="title_right"
      >
        <span>识别码</span>
        <p :class="orderState==='SUCCESS'?'success':''">
          {{ identifyingCode }}
        </p>
      </div>
      <div
        v-if="isPaySource"
        class="title_right"
      >
        <span>支付剩余时间：04:50</span>
      </div>
    </div>
    <div class="orderDetail_user">
      <b>{{ patientName }}</b>
      <span>{{ cardTypeView }}</span>
      <span>{{ cardNo }}</span>
    </div>
    <head-tip text="挂号信息" />
    <source-info
      :soure-list="soureList"
      :is-border="true"
      class="border"
    />
    <source-info
      v-if="!isPaySource && identifyingCode"
      :soure-list="soureTime"
      :is-border="true"
      class="border"
    />
    <source-info
      :soure-list="soureMoney"
    />
    <hospital-rule
      v-if="loaded"
      :is-pay-source="isPaySource"
      :attention="attention"
      :second-dept="secondDept"
    />
    <source-info
      v-if="!identifyingCode"
      :soure-list="sourceOdd"
    />
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
import SourceInfo from '@/components/SourceInfo'
import HeadTip from '@/components/HeadTip'
import HospitalRule from '@/components/HospitalRule'
import { getOrderDetail } from '@/api/common'
import { orderStatus } from '@/constants/rules'
export default {
  components: {
    MIcon,
    SourceInfo,
    HeadTip,
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
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    canDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      orderDetail: null,
      soureList: [],
      soureTime: [],
      soureMoney: [],
      identifyingCode: '', // 识别码
      orderState: '', // 订单状态
      patientName: '', // 就诊人姓名
      cardTypeView: '', // 证件类型
      cardNo: '', // 证件号
      isPaySource: false,
      sourceOdd: [],
      attention: '',
      secondDept: '',
      loaded: ''
    }
  },
  destroyed () {
    this.$popup.close()
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      const { fromPage, orderId, hosCode } = this.$route.params
      console.log(fromPage, this.$route)
      getOrderDetail({ orderNo: orderId, hosCode }).then(res => {
        this.orderDetail = res
        this.soureList = [
          { name: '就诊日期', value: res.visitTime },
          { name: '就诊医院', value: res.hosName },
          { name: '就诊科室', value: res.deptName },
          { name: '医生名称', value: res.doctorName },
          { name: '医生职称', value: res.doctorTitle },
          { name: '医生专长', value: res.skill }
        ]
        this.soureTime = [
          { name: '取号时间', value: res.recommendTime },
          { name: '取号地点', value: res.orderTakeNotice },
          { name: '退号时间', value: res.retreatTime }
        ]
        this.soureMoney = [
          { name: '医事服务费', value: res.serviceFee + '元', blod: true }
        ]
        this.sourceOdd = [
          { name: '挂号单号', value: res.orderNo },
          { name: '挂号时间', value: res.createTime },
          { name: '退号时间', value: res.refundTime }
        ]
        // 识别码
        this.identifyingCode = res.identifyingCode
        // 订单状态
        this.orderState = res.orderStatus
        // 就诊人姓名
        this.patientName = res.patientName
        // 证件类型
        this.cardTypeView = res.cardTypeView.indexOf('居民身份证') > -1 ? '居民身份证' : res.cardTypeView
        // 证件号
        this.cardNo = res.cardNo
        // 是否显示取消按钮
        this.$emit('input', res.canCancel)
        // 新医院注意事项
        this.attention = res.attention
        if (this.canDialog && res.attention) {
          this.showOverlay(res.attention)
        }
        this.secondDept = res.deptCode
        this.loaded = true
      })
    },
    showOverlay (content) {
      this.$popup.open({
        title: '请确认挂号须知',
        content: content,
        btnText: '确定'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.orderDetail_title{
  height: 106px;
  width: 690px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
  -webkit-box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.06);
  div{
    .m-icon{
      font-size: 30px;
      color: #999999;
      display: flex;
      align-items: center;
      /deep/.iconfont{
        font-size: 40px;
        font-weight: bold;
      }
      /deep/.desc{
        font-weight: bold;
      }
      &.success{
        color: #5386FF;
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
</style>
