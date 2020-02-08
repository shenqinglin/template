<template>
  <v-page
    :show-header="false"
  >
    <div
      class="help-content"
      v-html="content"
    />
  </v-page>
</template>

<script>
import { getMarkdown } from '@/api/common'
import { decrypt } from '@/utils'
export default {
  data () {
    return {
      params: {
        label: '',
        bizType: 'PLATFORM'
      },
      content: ''
    }
  },
  mounted () {
    this.params.label = decrypt(this.$route.params.label)
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
.help-content {
  padding: 30px 30px 30px;
  font-size: 24px;
  /deep/ h1 {
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
    font-size: 34px;
    text-align: center;
  }
  /deep/ h3 {
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  /deep/ img {
    width: 100%;
  }
  /deep/ p {
    font-size: 24px;
    margin-bottom: 20px;
  }
}

</style>
