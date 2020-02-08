<template>
  <v-page
    :show-header="false"
    :show-blue-head="true"
  >
    <div
      class="mzsm"
      v-html="notice"
    />
  </v-page>
</template>

<script>
import { getMarkdown } from '@/api/common'
export default {
  data () {
    return {
      notice: ''
    }
  },
  computed: {
    hosCode () {
      return this.$route.params.hosCode
    }
  },
  mounted () {
    getMarkdown({
      hosCode: this.hosCode,
      label: 'notice',
      bizType: 'HOSPITAL'
    }).then(res => {
      this.notice = res
    })
  }
}
</script>
<style lang="less" scoped>
.mzsm{
  padding: 30px 30px 30px;
  font-size: 24px;
  /deep/ h2 {
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    font-size: 34px;
    text-align: center;
  }
  /deep/ h4 {
    font-size: 28px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
  }
  /deep/ img {
    width: 100%;
  }
  /deep/ p {
    font-size: 24px;
    margin-bottom: 20px;
  }
  /deep/ ol{
    padding-bottom: 20px;
  }
}
</style>

