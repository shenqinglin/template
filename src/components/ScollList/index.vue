<template>
  <div
    class="scroll-list"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      :finished-text="noMoreText"
      @load="lodemore"
    >
      <slot :list="list" />
    </van-list>
    <no-search-result v-if="list.length === 0 && noResultVisible" />
  </div>
</template>

<script>
import NoSearchResult from '@/components/NoSearchResult'
import { NOOP } from '@/constants'
// import { fetchHospitalList } from '@/api/home'
import { mapMutations } from 'vuex'
export default {
  name: 'HomeNav',
  components: {
    NoSearchResult
  },
  props: {
    loadData: {
      type: Function,
      default: NOOP
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      noResultVisible: false, // 没有结果
      finished: false,
      noMoreText: ''
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
    this.pageNo = 1
    this.pageSize = 10
    this.handlePageChange()
  },
  methods: {
    ...mapMutations('home', ['SET_HOME_MIN_HEIGHT']),
    lodemore () {
      this.pageNo += 1
      this.handlePageChange()
    },
    // getHospitalList () {
    //   fetchHospitalList({ ...this.params }).then((res) => {
    //     this.loading = false // 关闭加载
    //     const result = res.list
    //     if (result === null || (result.length === 0 && res.count === 0)) { // 代表原本就没有数据
    //       this.$emit('noRsult', true)
    //       this.noSearchResults = true
    //       this.finished = true
    //       return false
    //     }
    //     this.noSearchResults = false
    //     this.List = this.List.concat(result)
    //     if (res.count > 0 && result.length === 0) { // 代表数据滚动加载后已没有数据了
    //       this.finished = true
    //       return false
    //     } else {
    //       this.finished = false
    //     }
    //     this.$nextTick(() => { // 获取最小高度
    //       const filterWrapper = document.querySelector('.van-sticky')
    //       const minHeight = document.body.clientHeight - filterWrapper.offsetHeight
    //       this.SET_HOME_MIN_HEIGHT(minHeight)
    //     })
    //   })
    // },
    async handlePageChange () {
      this.noResultVisible = false
      try {
        const result = await this.loadData(this.pageNo, this.pageSize)
        this.loading = false
        this.count = result.count
        this.list = this.pageNo > 1 ? [...this.list, ...result.list] : result.list
        this.noMore = this.count === this.list.length
        if (this.list.length === 0 && this.count === 0) { // 代表原本就没有数据
          this.$emit('noResult', true)
          this.noMoreText = ''
          this.finished = true
          this.noResultVisible = true
          return false
        } else {
          this.$emit('noResult', false)
          this.finished = false
        }
        if (this.noMore) { // 没有更多了
          this.noMoreText = '没有更多了'
          this.finished = true
          return false
        } else {
          this.finished = false
        }
        this.$nextTick(() => { // 获取最小高度
          const filterWrapper = document.querySelector('.van-sticky')
          const minHeight = document.body.clientHeight - filterWrapper.offsetHeight
          this.SET_HOME_MIN_HEIGHT(minHeight)
        })
      } catch (e) {
        if (this.pageNo > 1) {
          this.pageNo -= 1
          this.loading = true
          this.finished = true
        }
      }
    },
    load ({ pageNo, pageSize = 10, callback = NOOP }) {
      this.pageNo = pageNo
      this.handlePageChange()
      setTimeout(() => {
        callback()
      }, 300)
    },
    reset () {
      this.list = []
      this.pageNo = 1
      this.loading = true
      this.finished = false
      this.noResultVisible = false
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.scroll-list {
  clear: both;
  /deep/ .hos-list-data{
    margin-bottom: 40px;
  }
  /deep/ .van-list__finished-text {
    font-size: 24px;
  }
  /deep/ .van-loading__circular{
    color: #5386FF;
  }
}

</style>
