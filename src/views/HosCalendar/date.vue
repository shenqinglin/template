<template>
  <div class="source-date">
    <div class="calendar">
      <source-list />
    </div>
    <!-- 号源详情展示 -->
    <div class="source_to_detail">
      <!-- 无号提示 -->
      <div
        v-if="sourceStatus==='NO_INVENTORY'"
        class="no_source"
      >
        当天已无号，请查看其它日期号源
      </div>
      <!-- 有号展示 -->
      <div
        v-if="sourceStatus==='AVAILABLE'||sourceStatus==='SOLD_OUT'||sourceStatus==='CALLCENTER_AVAILABLE'"
        class="has_source"
      >
        <source-detail
          v-for="(item,index) in sourceDetailList"
          :key="index"
          :duty-list="item"
        />
      </div>
      <!-- 倒计时展示 -->
      <div
        v-if="sourceStatus==='TOMORROW_OPEN'"
        class="timeout"
      >
        <count-down />
      </div>
    </div>
    <!-- 推荐医院展示（组件里根据数据长度是否为0判断是否展示） -->
    <hos-recommend />
  </div>
</template>
<script>
import SourceList from './components/SourceList'
import SourceDetail from './components/SourceDetail'
import hosRecommend from './components/hosRecommend'
import CountDown from './components/CountDown'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    SourceList,
    SourceDetail,
    hosRecommend,
    CountDown
  },
  data () {
    return {
      name: 1,
      sourceStatus: '',
      times: null,
      formatData: {},
      hosDept: {}
    }
  },
  computed: {
    ...mapState('source', ['sourceDetailList', 'selectStatus']),
    hosCode () {
      return this.$route.params.hosCode
    },
    firstDeptCode () {
      return this.$route.params.firstDeptCode === '0' ? '' : this.$route.params.firstDeptCode
    },
    secondDeptCode () {
      return this.$route.params.secondDeptCode
    }
  },
  watch: {
    selectStatus (val) {
      if (this.times) {
        clearInterval(this.times)
      }
      this.sourceStatus = val
    }
  },
  destroyed () {
    this.CLEAR_SOURCE()
  },
  mounted () {
    this.sourceStatus = this.selectStatus || ''
  },
  methods: {
    ...mapMutations('source', ['CLEAR_SOURCE'])
  }
}
</script>
<style lang="less" scoped>
.source-date{
  .calendar{
    padding-left: 30px;
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.02);
  }
  .source_to_detail{
    .no_source{
      height: 153px;
      line-height: 153px;
      text-align: center;
      color: #999999;
      font-size: 24px;
    }
    .timeout{
      height: 213px;
    }
  }
}
</style>
