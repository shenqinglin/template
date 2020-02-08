<template>
  <div class="hospital-rule">
    <div
      v-if="!attention"
      class="hos"
    >
      <h3>医院预约规则</h3>
      <div
        class="content"
        v-html="specialRule"
      />
      <h3>科室预约规则</h3>
      <div
        class="content"
        v-html="deptTips"
      />
    </div>
    <div
      v-if="attention"
      class="hos"
    >
      <h3>注意事项</h3>
      <div
        class="content"
        v-html="attention"
      />
    </div>
  </div>
</template>
<script>
import { getMarkdown } from '@/api/common'
export default {
  props: {
    isPaySource: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    },
    blod: {
      type: Boolean,
      default: false
    },
    attention: {
      type: String,
      default: ''
    },
    secondDept: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      specialRule: '',
      deptTips: ''
    }
  },
  computed: {
    hosCode () {
      return this.$route.params.hosCode
    },
    secondDeptCode () {
      return this.$route.params.secondDeptCode
    }
  },
  mounted () {
    if (!this.attention) {
      this.getSpecialRule()
      this.getTips()
    }
  },
  methods: {
    getSpecialRule () {
      getMarkdown({
        hosCode: this.hosCode,
        label: 'specialRule',
        bizType: 'HOSPITAL'
      }).then(res => {
        this.specialRule = res || '无'
      })
    },
    getTips () {
      console.log(this.secondDeptCode, 456789, this.$route.params)
      getMarkdown({
        hosCode: this.hosCode,
        label: 'tips114A',
        bizType: 'DEPARTMENT',
        secondDept: this.secondDeptCode || this.secondDept
      }).then(res => {
        this.deptTips = res || '无'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.hospital-rule{
  background: #F9F9F9;
  padding: 0 30px 40px;
  font-size: 24px;
  .content{
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  h3{
    font-size: 24px;
    font-weight: bold;
    padding: 40px 0 20px 0;
    color: #666;
  }
  p{
    line-height:38px;
    font-size: 24px;
    color: #999;
  }
  /deep/ol{
    color: #999;
    line-height: 38px;
  }
  /deep/code{
    white-space: pre-wrap;
  }
}
</style>
