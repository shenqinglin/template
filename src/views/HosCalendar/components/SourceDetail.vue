<template>
  <div class="source-detail">
    <head-tip :text="dutyDesc" />
    <source-bar
      v-for="(item,index) in dutyList.detail"
      :key="index"
      :list-index="index"
      :show-index-position="dutyList.showIndexPosition"
      :doctor-info="item"
      :duty-img-url="dutyList.dutyImgUrl"
      @showAll="showAll"
    />
  </div>
</template>
<script>
import HeadTip from '@/components/HeadTip'
import SourceBar from './SourceBar'
import { dutyStatus } from '@/constants/rules'
export default {
  components: {
    HeadTip,
    SourceBar
  },
  props: {
    dutyList: {
      type: Object,
      default: function () {
        return {
          detail: [],
          dutyCode: '',
          dutyImgType: '',
          dutyImgUrl: '',
          showIndexPosition: ''
        }
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    dutyDesc () {
      return dutyStatus[this.dutyList.dutyCode] + '号源'
    }
  },
  methods: {
    showAll () {
      this.dutyList.showIndexPosition = this.dutyList.detail.length
    }
  }
}
</script>
<style lang="less" scoped>
.source-bar:last-child{
  border-bottom: 0;
}
</style>
