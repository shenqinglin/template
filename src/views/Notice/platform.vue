<template>
  <div class="platform">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <notice-list
        v-for="(item,index) in noticeList"
        :key="index"
        :title="item.title"
        :create-time="item.date"
        @click.native="getDetail(item.id)"
      />
    </van-list>
  </div>
</template>
<script>
import NoticeList from '@/components/NoticeList'
import { getSystemNotices } from '@/api/common'
export default {
  name: 'Notice',
  components: {
    NoticeList
  },
  data () {
    return {
      params: {
        pageNo: 1,
        pageSize: 10
      },
      noticeList: [],
      loading: false,
      finished: false,
      total: 0
    }
  },
  mounted () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      getSystemNotices(this.params).then(res => {
        this.loading = false
        this.finished = true
        const result = res.list
        this.total = res.count
        this.noticeList = this.noticeList.concat(result)
      })
    },
    onLoad () {
      this.params.currentPage += 1
      if (this.params.currentPage * this.params.pageSize < this.total) {
        this.getNoticeList()
      }
    },
    getDetail (id) {
      this.$router.push('/noticeDetail/' + id)
    }
  }
}
</script>
<style lang="less">

</style>
