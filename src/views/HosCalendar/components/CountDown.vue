<template>
  <div class="count-down">
    <p>
      <i class="isToday">{{ currentDay }}</i>
      <a class="fhTime">{{ timeoutInfo.fhTime | timeFormat }}</a>放号
    </p>
    <span class="residueTime"><i>倒计时</i>
      <span class="showBg">
        <b>{{ formatData.hours }}</b>时
        <b>{{ formatData.minutes }}</b>分
        <b>{{ formatData.seconds }}</b>秒
      </span>
    </span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { formatSeconds } from '@/constants/rules'
import { formatDate } from '@/utils/date'
export default {
  filters: {
    timeFormat (val) {
      if (!val) {
        return false
      }
      return formatDate(val).slice(11, 16)
    }
  },
  data () {
    return {
      timer: null,
      formatData: {},
      currentDay: ''
    }
  },
  computed: {
    ...mapState('source', ['timeoutInfo', 'currentTimes']),
    fhTime () {
      return new Date(this.timeoutInfo)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  mounted () {
    this.loop()
    this.countdown()
    this.calculate()
  },
  methods: {
    loop () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(this.countdown, 1000)
    },
    countdown () {
      const now = Date.now()
      const fhTime = this.timeoutInfo.fhTimeBetween - (now - this.currentTimes)
      this.formatData = formatSeconds(Math.floor(fhTime / 1000))
    },
    calculate () {
      const now = new Date().toISOString().slice(0, 10)
      const fhTime = formatDate(this.timeoutInfo.fhTime).slice(0, 10)
      this.currentDay = now < fhTime ? '明天' : '今天'
    }
  }
}
</script>
<style lang="less">
.count-down{
  p{
    color: #999;
    font-size: 24px;
    text-align: center;
    padding-top: 40px;
    margin-bottom: 20px;
    text-indent: 0;
    a{
      color: #6596F4;
    }
    i{
      font-style: normal;
    }
  }
  .residueTime{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #999;
    font-size: 24px;
    text-align: center;
    i{
      margin-right: 10px;
      font-style: normal;
    }
    .showBg{
      background:rgba(101,150,244,0.1);
      padding: 8px 26px;
      display: inline-block;
      border-radius: 20px;
      b{
        font-size: 40px;
        color: #6596F4;
      }
      b:nth-child(1){
        margin-right: 4px;
      }
      b:nth-child(2){
        margin-left: 30px;
        margin-right:4px;
      }
      b:nth-child(3){
        margin-left: 30px;
        margin-right: 4px;
      }
    }
  }
}
</style>
