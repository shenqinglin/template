<template>
  <div
    :class="active===selectIndex?'swiper-slide active':'swiper-slide'"
  >
    <div :class="status?('li ' + status):'li'">
      <span>{{ day }}</span>
      <span>{{ date | formatDate }}</span>
      <span
        v-if="countDown"
        class="sourceNum timeout"
      >
        即将放号
      </span>
      <span
        v-if="!countDown"
        class="sourceNum"
      >
        <v-icon
          v-if="status==='CALLCENTER_AVAILABLE'"
          name="telephone"
        />
        {{ status | formatStatus }}
      </span>
    </div>
  </div>
</template>
<script>
import { SOURCE_STATUS } from '@/constants/rules'
import { getDates } from '@/utils/date'
import { mapState } from 'vuex'
export default {
  filters: {
    formatDate (val) {
      return getDates(val)
    },
    formatStatus (val) {
      return SOURCE_STATUS[val]
    }
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    // 号源状态 String
    status: {
      type: String,
      default: ''
    },
    // 周几
    day: {
      type: String,
      default: ''
    },
    // 日期
    date: {
      type: String,
      default: ''
    },
    countDown: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectIndex: 0
    }
  },
  computed: {
    ...mapState('source', ['sIndex'])
  },
  watch: {
    sIndex (val, old) {
      // TODO 每次监听执行了n次结果一样 ？？？
      this.selectIndex = val
    }
  }
}
</script>
<style lang="less" scoped>
.swiper-slide{
  .li{
    background-color: #fff;
    span{
      display: block;
      width: 100%;
      font-size: 22px;
      color: #666;
      text-align: center;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    span:nth-child(1){
      font-size: 20px;
      height: 34px;
      line-height: 36px;
    }
    span:nth-child(3){
      padding: 4px 0;
      height: 42px;
      color: #999;
      &.timeout{
        color: #5386FF;
      }
      /deep/.v-icon{
        display: inline-block;
        color: #52CC53;
        width: auto;
      }
    }
    &.AVAILABLE span:nth-child(3){
      color: #5386FF;
    }
    &.CALLCENTER_AVAILABLE span:nth-child(3){
      color: #52CC53;
    }
    &.TOMORROW_OPEN span:nth-child(3){
      color: #5386FF;
    }
  }
  &.active{
    .NO_INVENTORY{
      background: rgba(238,238,238,0.5);
      color: #666666;
      border-radius: 8px 8px 0 0;
    }
    .SOLD_OUT{
      background: rgba(238,238,238,0.5);
      color: #666666;
      border-radius: 8px 8px 0 0;
    }
    .AVAILABLE{
      background: #F1F6FF;
      border-radius: 8px 8px 0 0;
      color: #666666;
      span:nth-child(1){
        color: #5386FF;
      }
      span:nth-child(2){
        color: #5386FF;
      }
    }
    .CALLCENTER_AVAILABLE{
      border-radius: 8px 8px 0 0;
      background: #EDFCED;
      span:nth-child(1){
        color: #52CC53;
      }
      span:nth-child(2){
        color: #52CC53;
      }
    }
    .TOMORROW_OPEN{
      background: rgba(101,150,244,0.1);
      border-radius: 8px 8px 0 0;
      color: #666666;
      span:nth-child(1){
        color: #5386FF;
      }
      span:nth-child(2){
        color: #5386FF;
      }
    }
    .SOLD_OUT span:nth-child(3){
      background: #ddd;
      color: #fff;
      border-top: 0;
      border-radius: 8px;
    }
    .NO_INVENTORY span:nth-child(3){
      background: #ddd;
      color: #fff;
      border-top: 0;
      border-radius: 8px;
    }
    .AVAILABLE span:nth-child(3){
      background: #5386FF;
      color: #fff;
      border-top: 0;
      border-radius: 8px;
    }
    .CALLCENTER_AVAILABLE span:nth-child(3){
      background: #52CC53;
      color: #fff;
      border-top: 0;
      border-radius: 8px;
      /deep/.v-icon{
        display: inline-block;
        color: #fff;
      }
    }
    .TOMORROW_OPEN span:nth-child(3){
      background: #5386FF;
      color: #fff;
      border-top: 0;
      border-radius: 8px;
    }
  }
}
</style>
