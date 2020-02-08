<template>
  <div class="week-list">
    <h3>选择周期</h3>
    <ul>
      <li
        v-for="(item,index) in week"
        :key="index"
        :class="selectIndex === index ? 'active' : ''"
        @click="saveSelectWeek(index)"
      >
        第{{ item | formatWeek }}周
      </li>
    </ul>
  </div>
</template>
<script>
import { numberToCn } from '@/utils/date'
import { mapMutations } from 'vuex'
export default {
  filters: {
    formatWeek (val) {
      return numberToCn(val)
    }
  },
  props: {
    totalWeek: {
      type: Number,
      default: 0
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      week: [],
      selectIndex: 0
    }
  },
  mounted () {
    for (let i = 0; i < this.totalWeek; i++) {
      this.week.push(i + 1)
    }
  },
  methods: {
    ...mapMutations('source', ['SELECT_WEEK', 'SELECT_INDEX']),
    saveSelectWeek (index) {
      this.SELECT_WEEK(index + 1)
      this.SELECT_INDEX(0)
      this.$emit('close', false)
      this.selectIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.week-list{
  padding: 22px 30px 60px;
  h3{
    margin-bottom: 36px;
    font-size: 30px;
    font-weight: bold;
    color: #333333;
    text-align: center;
  }
  ul{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      width:150px;
      height:60px;
      line-height: 60px;
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
      color: #999999;
      border-radius:4px;
      border:1px solid rgba(221,221,221,1);
      &.active{
        color: #6596F4;
        background:rgba(245,249,255,1);
        border:1px solid rgba(101,150,244,1);
      }
    }
  }
}
</style>
