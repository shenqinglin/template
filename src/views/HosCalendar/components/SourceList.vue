<template>
  <div class="source-list">
    <div class="list">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <swiper-slide
            v-for="(item,index) in dateList"
            :key="index"
            :active="index"
            :day="item.weekDesc"
            :date="item.dutyDate"
            :status="item.status"
            @click.native="getDetailIndex(item,index)"
          />
        </div>
      </div>
    </div>
    <div
      v-if="!weekSearch"
      class="show_calendar"
      @click="showCalendar('day')"
    >
      查看<br>日期
    </div>
    <div
      v-if="weekSearch"
      class="show_calendar"
      @click="showCalendar('week')"
    >
      查看<br>周期
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
    >
      <v-icon
        class="closeBtn"
        name="close"
        @click.native="closeBtn"
      />
      <calendar-list
        @close="close"
      />
    </van-popup>
    <van-popup
      v-model="showWeek"
      round
      position="bottom"
    >
      <v-icon
        class="closeBtn"
        name="close"
        @click.native="closeWeekBtn"
      />
      <week-list
        :total-week="totalWeek"
        @close="close"
      />
    </van-popup>
  </div>
</template>
<script>
import Swiper from 'swiper'
import SwiperSlide from './SwiperSlide'
import CalendarList from './CalendarList'
import WeekList from './WeekList'
import { getSourceList, getSourceDetail } from '@/api/common'
import { mapMutations, mapState } from 'vuex'
export default {
  components: {
    SwiperSlide,
    CalendarList,
    WeekList
  },
  data () {
    return {
      dateList: [],
      dutySwiper: null,
      show: false,
      showWeek: false,
      refreshTime: '',
      totalWeek: 0
    }
  },
  computed: {
    ...mapState('source', ['sIndex', 'sourceList', 'selectWeek', 'timeoutInfo']),
    hosCode () {
      return this.$route.params.hosCode
    },
    firstDeptCode () {
      return this.$route.params.firstDeptCode
    },
    secondDeptCode () {
      return this.$route.params.secondDeptCode
    },
    weekSearch () {
      return this.totalWeek > 1
    }
  },
  watch: {
    sIndex (val) {
      this.dutySwiper.slideTo(val, 1000, false)
      this.getDetail(this.sourceList[val], val)
    },
    $route (val) {
      this.SELECT_INDEX(0)
      this.dutySwiper.slideTo(0, 0, false)
      this.getList()
    },
    selectWeek (val) {
      this.getList()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapMutations('source', ['SELECT_INDEX', 'SOURCE_LIST', 'SOURCE_DETAIL_LIST', 'SELECT_STATUS', 'TIMEOUT_INFO', 'CURRENT_TIMES', 'SELECT_DATE', 'SELECT_WEEK']),
    getList () {
      getSourceList({
        hosCode: this.hosCode,
        firstDeptCode: this.firstDeptCode,
        secondDeptCode: this.secondDeptCode,
        week: this.selectWeek
      }).then(res => {
        this.totalWeek = res.totalWeek
        this.dateList = res.calendars
        // 保存号源list，和日历列表公用
        this.SOURCE_LIST(res.calendars)
        this.TIMEOUT_INFO({
          fhTime: res.openTimestamp,
          fhTimeBetween: res.openTimestamp - Date.now()
        })
        // 保存当前时间，方便计算倒计时
        this.CURRENT_TIMES(Date.now())
        this.refreshTime = res.refreshTime
        this.countdownToRefresh()
      }).then(() => {
        this.$nextTick(function () {
          this.dutySwiper = new Swiper('.swiper-container', {
            slidesPerView: 5.5,
            freeMode: true,
            observer: true
          })
        })
      }).then(() => {
        const defaultSelectIndex = this.sIndex || 0
        // 首次进入号源页面，需要默认加载第一天的详情数据
        const item = this.dateList[defaultSelectIndex]
        this.getDetail(item, defaultSelectIndex)
        this.SELECT_DATE(item.dutyDate)
      })
    },
    getDetailIndex (item, index) {
      this.SELECT_INDEX(index)
      this.SELECT_DATE(item.dutyDate)
    },
    getDetail (item, index) {
      // 点击号源list时记录当前点击的状态，展示不同的详情，记录值为dutyStatus，1代表有号，2电话有号，4约满，32无号。
      const status = item.status
      // 当前选中状态
      this.SELECT_STATUS(status)
      // 保存选中index
      this.SELECT_INDEX(index)
      if (status === 'NO_INVENTORY' || status === 'TOMORROW_OPEN') {
        return
      }
      // 获取医院id和科室id
      getSourceDetail({
        hosCode: this.hosCode,
        firstDeptCode: this.firstDeptCode,
        secondDeptCode: this.secondDeptCode,
        target: item.dutyDate
      }).then(res => {
        // 号源详情
        this.SOURCE_DETAIL_LIST(res)
      })
    },
    showCalendar (val) {
      val === 'day' ? this.show = true : this.showWeek = true
    },
    close (val) {
      this.show = val
      this.showWeek = val
    },
    countdownToRefresh () {
      this.timer = setTimeout(() => {
        this.getList()
      }, this.refreshTime)
    },
    closeBtn () {
      this.show = false
    },
    closeWeekBtn () {
      this.showWeek = false
    }
  }
}
</script>
<style lang="less" scoped>
.source-list{
  height: 157px;
  overflow: hidden;
  position: relative;
  .list{
    width: 625px;
    padding-top: 25px;
    /deep/.swiper-slide{
      width: 120px;
      height: 110px;
    }
  }
  .show_calendar{
    width: 94px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 24px;
    -webkit-box-shadow: -20px 0px 14px -20px rgba(0,0,0,0.1);
    box-shadow:-20px 0px 14px -20px rgba(0,0,0,0.1);
  }
}
</style>
