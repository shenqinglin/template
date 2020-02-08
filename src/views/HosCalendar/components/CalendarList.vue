<template>
  <div class="calendarList">
    <div class="year">
      <v-icon
        name="left"
        :class="currentIndex===0?'noclick':''"
        @click.native="currentIndex===0 ? '' : nextMonth('prev')"
      />
      <span>{{ yearMouth }}</span>
      <v-icon
        name="right"
        :class="currentIndex===totalMonth-1?'noclick':''"
        @click.native="currentIndex===totalMonth-1 ? '' : nextMonth('next')"
      />
    </div>
    <div class="duty border-bottom">
      <ul>
        <li
          v-for="(item,index) in dutyWeeks"
          :key="index"
          class="empty"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="dateList">
      <ul>
        <li
          v-for="(item, index) in emptyLi"
          :key="'index'+index"
        />
        <!-- 无号么有点击事件 -->
        <li
          v-for="(item,index) in currentSource"
          :key="index"
          :class="item.status"
          @click="selectDay(item)"
        >
          <p v-if="!item.status && !item.countdown">
            {{ item.dutyDate | getDays }}
          </p>
          <span v-if="item.status === 'TOMORROW_OPEN'">
            {{ item.status | getStatusText }}
          </span>
          <span v-if="item.status && item.status !== 'TOMORROW_OPEN'">{{ item.dutyDate | getDays }}</span>
          <span v-if="item.status && item.status !== 'TOMORROW_OPEN'">
            <v-icon
              v-if="item.status==='CALLCENTER_AVAILABLE'"
              name="telephone"
            />{{ item.status | getStatusText }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { createMonthList, computeFirstDay } from '@/utils/date'
import { dutyWeek, SOURCE_STATUS } from '@/constants/rules'
export default {
  filters: {
    getDays (val) {
      return val.slice(8, 10)
    },
    getStatusText (val) {
      if (!val) {
        return ''
      }
      return SOURCE_STATUS[val]
    }
  },
  props: {
    close: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      source: [], // 所有月份日历数据
      currentSource: [], // 选中月份日历数据
      emptyLi: [],
      dutyWeeks: Object.freeze(dutyWeek),
      currentMonth: '', // 当前日历第一天日期，用来获取年月的
      currentIndex: 0, // 当前显示日历的index
      totalMonth: 1 // 日历月份总数
    }
  },
  computed: {
    ...mapState('source', ['sourceList']),
    yearMouth () {
      return this.currentMonth.slice(0, 4) + '年' + parseInt(this.currentMonth.slice(5, 7)) + '月'
    }
  },
  watch: {
    sourceList: {
      handler (val) {
        this.source = createMonthList(val)
        this.totalMonth = this.source.length
        this.currentIndex = 0
        this.getMonthData()
      },
      deep: true
    }
  },
  mounted () {
    // createMonthList 根据号源list，转换成日历需要的数据结构 此时的数据结构是数组，每个item里的dayViews是完整的一个月多少天
    this.source = createMonthList(this.sourceList)
    this.totalMonth = this.source.length
    this.getMonthData()
  },
  methods: {
    ...mapMutations('source', ['SELECT_INDEX', 'TIMEOUT_INFO', 'SELECT_STATUS', 'SELECT_DATE']),
    nextMonth (direction) {
      this.currentIndex = direction === 'prev' ? --this.currentIndex : ++this.currentIndex
      // 当前月份index小于0，重置为0，大于月份长度-1，重置成月份长度-1
      this.currentIndex = this.currentIndex < 0 ? 0 : this.currentIndex >= this.totalMonth ? this.totalMonth - 1 : this.currentIndex
      this.getMonthData()
    },
    getMonthData () {
      this.emptyLi = []
      const source = this.source[this.currentIndex].dayViews
      this.currentSource = source
      // 拿到数组第一个的数据结构，渲染日历第一个月
      const currentMonthFirstDay = source[0].dutyDate
      this.currentMonth = currentMonthFirstDay
      // 计算日历第一天是周几
      const dutyWeek = computeFirstDay(currentMonthFirstDay)
      for (let i = 0; i < dutyWeek - 1; i++) {
        this.emptyLi.push(i)
      }
    },
    selectDay (item) {
      // 不在号源范围内或者无号的日期，点击没有反应
      if (!item.status) {
        return false
      }
      // 关闭日历弹窗
      this.$emit('close', false)
      this.SELECT_INDEX(item.index)
      this.SELECT_DATE(item.dutyDate)
      // 更改详情展示状态
      this.SELECT_STATUS(item.status)
    }
  }
}
</script>
<style lang="less" scoped>
.calendarList{
  padding: 0 30px;
  .year{
    width: 350px;
    margin: 22px auto 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .noclick{
      color: #eee;
    }
    span:nth-child(2){
      width: 298px;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
      color: #333;
    }
    .v-icon{
      font-size: 26px;
      padding: 10px;
    }
  }
  .duty {
    padding: 50px 0 16px;
    overflow: hidden;
    li{
      float: left;
      width: 14.28%;
      font-size: 24px;
      color: #999;
      text-align: center;
      list-style: none;
    }
  }
  .dateList{
    overflow: hidden;
    clear: both;
    padding-bottom: 60px;
    li{
      font-size: 28px;
      margin: 30px 15px 0 5px;
      display: inline-block;
      vertical-align: top;
      width: 80px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      list-style: none;
      p{
        color: #eee;
      }
      div{
        height: 100%;
        line-height: 45px;
      }
      &:nth-child(7n){
        margin: 30px 5px 0 0;
      }
      span:nth-child(1){
        height: 50px;
        line-height: 55px;
        color: #999;
        display: block;
      }
      span:nth-child(2){
        color: #999;
        height: 40px;
        line-height: 38px;
        display: block;
        font-size: 22px;
      }
      &.TOMORROW_OPEN{
        border: 1PX solid #5386FF;
        color: #5386FF;
        border-radius:8px;
        font-size: 22px;
        text-align: center;
        span{
          display: inline-block;
          width: 50px;
          line-height: 45px;
          color: #5386FF;
        }
      }
      &.SOLD_OUT span:nth-child(1){
        background: #ddd;
        border-radius: 8px 8px 0 0;
        color: #fff;
      }
      &.SOLD_OUT span:nth-child(2){
        color: #ddd;
        border: 1PX solid #ddd;
        border-radius: 0 0 8px 8px;
      }
      &.AVAILABLE span:nth-child(1){
        background: #5386FF;
        border-radius: 8px 8px 0 0;
        color: #fff;
      }
      &.AVAILABLE span:nth-child(2){
        color: #6596F4;
        border: 1PX solid #5386FF;
        border-radius: 0 0 8px 8px;
      }
      &.CALLCENTER_AVAILABLE>span:nth-child(1){
        background: #52CC53;
        border-radius: 8px 8px 0 0;
        color: #fff;
      }
      &.CALLCENTER_AVAILABLE span:nth-child(2){
        color: #52CC53;
        border: 1PX solid #52CC53;
        border-radius: 0 0 8px 8px;
      }
      &.CALLCENTER_AVAILABLE{
        .v-icon{
          display: inline-block;
          width: auto;
          height: auto;
          line-height: inherit;
          font-size: 20px;
          color: #52CC53;
        }
      }
      &.NO_INVENTORY{
        span{
          color: #ddd;
        }
      }
    }
  }
}
</style>
