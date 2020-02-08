<template>
  <v-page
    :show-header="false"
  >
    <div class="detail">
      <h3>{{ title }}</h3>
      <p v-html="content" />
      <span>{{ date }}</span>
    </div>
  </v-page>
</template>
<script>
import { md2html } from '@/utils'
import { dateToCN } from '@/utils/date'
import { getNextSystemNotice } from '@/api/common'
export default {
  name: 'Detail',
  data () {
    return {
      params: {
        orderType: 'NONE',
        id: ''
      },
      title: '',
      content: '',
      date: ''
    }
  },
  mounted () {
    this.params.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail () {
      getNextSystemNotice(this.params.id).then(res => {
        this.title = res.title
        this.content = md2html(res.content)
        this.date = dateToCN(res.date)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail{
  padding: 40px 30px 30px;
  h3{
    font-size: 28px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }
  p{
    margin: 40px 0 60px;
    font-size: 28px;
    color: #333333;
  }
  span{
    float: right;
    color: #999999;
    margin-right: 20px;
    font-size: 22px;
  }
}
</style>
