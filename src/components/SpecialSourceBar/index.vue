<template>
  <div
    class="special-source-bar"
    :class="classObj"
  >
    <div class="detail">
      <span>{{ dutyDate | formatDateCn }}</span>
      <span>{{ weekCode | formatWeek }}</span>
      <span>{{ dutyCode | formatCode }}</span>
    </div>
    <div class="btn">
      {{ btnText }}
    </div>
  </div>
</template>
<script>
import { dateToCN } from '@/utils/date'
import { DOCTOR_SOURCE_STATE, DOCTOR_DUTY_CODE, DOCTOR_WEEK_CODE } from '@/constants/index'
export default {
  filters: {
    formatDateCn (val) {
      return dateToCN(val)
    },
    formatWeek (val) {
      return DOCTOR_WEEK_CODE[val]
    },
    formatCode (val) {
      return DOCTOR_DUTY_CODE[val]
    }
  },
  props: {
    dutyDate: {
      type: String,
      default: ''
    },
    dutyCode: {
      type: String,
      default: ''
    },
    dutyState: {
      type: String,
      default: ''
    },
    weekCode: {
      type: String,
      default: ''
    }
  },
  computed: {
    classObj () {
      return {
        'grey': DOCTOR_SOURCE_STATE[this.dutyState].state
      }
    },
    btnText () {
      return DOCTOR_SOURCE_STATE[this.dutyState].name
    }
  }
}
</script>
<style lang="less" scoped>
.special-source-bar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 104px;
  padding: 0 30px;
  .detail{
    width: 390px;
    span{
      display: inline-block;
      color: #333;
      font-size: 28px;
    }
    span:nth-child(1){
      width: 220px;
    }
    span:nth-child(2){
      width: 60px;
      margin: 0 30px 0 20px;
    }
    span:nth-child(3){
      width: 60px;
    }
  }
  .btn{
    width:100px;
    height:64px;
    line-height: 64px;
    font-size: 28px;
    text-align: center;
    background:#5386FF;
    border-radius:8px;
    color: #fff;
  }
  &.grey{
    span{
      color: #ddd;
    }
    .btn{
      background: #ddd;
    }
  }
}
</style>
