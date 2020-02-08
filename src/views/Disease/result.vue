<template>
  <div class="result">
    <div class="title">
      <span>{{ diseaseText }}</span>相关科室
    </div>
    <notice-list
      v-for="(item,index) in deptList"
      :key="index"
      :title="item.deptName"
      :no-blod="true"
      @click.native="clickList(item.deptCode)"
    />
  </div>
</template>
<script>
import NoticeList from '@/components/NoticeList'
import { deptDetail } from '@/api/special'
export default {
  components: {
    NoticeList
  },
  data () {
    return {
      deptList: [],
      diseaseText: ''
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getDeptDetail()
  },
  methods: {
    clickList (deptId) {
      this.$router.push(`/calendar/162/0/${deptId}/date`)
    },
    getDeptDetail () {
      deptDetail(this.id).then(res => {
        this.deptList = res.list
        this.diseaseText = res.queryString
      })
    }
  }
}
</script>
<style lang="less" scoped>
.result{
  .title{
    height: 80px;
    padding: 0 30px;
    line-height: 80px;
    font-size: 28px;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    color: #999;
    span{
      margin-right: 6px;
      color: #5386FF;
    }
  }
}
</style>
