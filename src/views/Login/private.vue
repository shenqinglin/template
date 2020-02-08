<template>
  <v-page :show-header="false">
    <div
      class="zhuc_zongze"
      v-html="content"
    />
  </v-page>
</template>

<script>
import { getMarkdown } from '@/api/common'
export default {
  data () {
    return {
      params: {
        label: 'privacyAgreements',
        bizType: 'PLATFORM'
      },
      content: ''
    }
  },
  mounted () {
    this.fetchMarkdown()
  },
  methods: {
    fetchMarkdown () {
      getMarkdown({ ...this.params }).then((data) => {
        this.content = data
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.zhuc_zongze {
  padding: 30px 30px 30px;
  font-size: 24px;
  /deep/ h2 {
    font-weight: bold;
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  /deep/ h4 {
    font-weight: bold;
    font-size: 24px;
    padding: 20px 0;
    color: #333;
  }
}
</style>
