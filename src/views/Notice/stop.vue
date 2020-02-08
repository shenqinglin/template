<template>
  <div class="platform">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <notice-list
        v-for="(item,index) in noticeList"
        :key="index"
        :content-item="item"
        :title="item.title"
        :create-time="item.createTime"
        @click.native="getDetail(item.id)"
      />
    </van-list>
  </div>
</template>
<script>
import NoticeList from '@/components/NoticeList'
import { getNotices } from '@/api/common'
export default {
  name: 'Notice',
  components: {
    NoticeList
  },
  data () {
    return {
      params: {
        currentPage: 1,
        pageSize: 10,
        searchType: 'DUTYOFF'
      },
      noticeList: [],
      empty: false,
      loading: false,
      finished: false,
      currentTab: 0
    }
  },
  mounted () {
    this.getNoticeList()
  },
  methods: {
    getNoticeList () {
      getNotices(this.params).then(res => {
        this.loading = false
        const result = res.result
        if (result.length === 0) {
          this.empty = true
        }
        if (res.currentPage >= res.totalPage) {
          this.finished = true
        }
        this.noticeList = this.noticeList.concat(result)
        console.log(this.noticeList)
      })
    },
    onLoad () {
      this.params.currentPage += 1
      this.getNoticeList()
    },
    getDetail (id) {
      this.$router.push('/stopDetail/' + id)
    }
  }
}
</script>
<style lang="less">

</style>
