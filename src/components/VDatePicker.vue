<template>
  <v-up-select
    ref="upSelect"
    label="出生日期"
    :show-placeholder="showPlaceholder"
    placeholder="请选择出生日期"
    @onMiddleClick="onMiddleClick"
  >
    <div
      slot="middle-content"
      class="middle-content"
    >
      <span>{{ year }}年</span>
      <span>{{ month }}月</span>
      <span>{{ date }}日</span>
    </div>
    <div slot="component">
      <van-popup
        v-model="showPopup"
        position="bottom"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
    </div>
  </v-up-select>
</template>

<script>
import VUpSelect from './VUpSelect'
import { doubleNum } from '@/utils'
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
const currentDate = new Date().getDate()
export default {
  components: {
    VUpSelect
  },
  data () {
    return {
      showPopup: false, // 是否展示弹出菜单
      birthday: '',
      currentDate: new Date(),
      maxDate: new Date(currentYear, currentMonth, currentDate),
      minDate: new Date(currentYear - 100, currentMonth, currentDate),
      year: '',
      month: '',
      date: '',
      showPlaceholder: true // 展示组件中间默认提示文案
    }
  },
  methods: {
    onMiddleClick () { // 监听到中间内容点击时
      this.openPopup()
    },
    onConfirm (val) { // 确认点击
      // console.log(val, this.currentDate)
      this.year = val.getFullYear()
      this.month = doubleNum(val.getMonth() + 1)
      this.date = doubleNum(val.getDate())
      // console.log(this.year, this.month, this.date)
      const date = `${this.year}-${this.month}-${this.date}`
      this.showPlaceholder = false
      this.closePopup()
      this.$emit('input', date)
      this.$emit('picker', date)
    },
    onCancel (val) { // 取消点击
      this.closePopup()
    },
    openPopup () { // 打开弹出层
      this.showPopup = true
    },
    closePopup () { // 关闭弹出层
      this.showPopup = false
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .middle-content {
    &>span {
      display: inline-block;
      margin-right: 25px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  /deep/.van-picker {
    .van-picker__toolbar {
      padding: 10px 0;
      .van-picker__cancel, .van-picker__confirm {
        font-size: 28px;
      }
    }
    .van-picker-column__item {
      font-size: 26px;
      color:#999;
      &.van-picker-column__item--selected {
        color: #000;
      }
    }
  }
</style>
