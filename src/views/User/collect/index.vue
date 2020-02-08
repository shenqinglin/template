<template>
  <v-page
    :show-header="false"
  >
    <div class="collect">
      <div
        v-for="(item,index) in collectList"
        :key="index"
        class="item"
      >
        <router-link :to="{path:'/department/' + item.id }">
          <hos-list
            :hos-detail="item"
            class="hos-list-data"
            :isto-update="!item.toUserOpen"
          />
        </router-link>
        <div
          class="cancelCollect"
          @touchend="cancelCollect(item.id)"
        >
          <img :src="collect">
          <p class="grey">
            取消收藏
          </p>
        </div>
      </div>
      <!-- <div
        v-if="empty"
        class="empty"
      >
        暂无收藏
      </div> -->
      <no-search-result v-if="empty" />
    </div>
  </v-page>
</template>
<script>
import HosList from '@/components/HosList/item'
import { STATIC_URL } from '@/config'
import { collectList, cancelHosCollect } from '@/api/common'
import NoSearchResult from '@/components/NoSearchResult'
export default {
  components: {
    HosList, NoSearchResult
  },
  data () {
    return {
      collectList: [],
      params: {
        page: 1,
        pageSize: 10
      },
      empty: false
    }
  },
  computed: {
    collect () {
      return `${STATIC_URL}/img/collect.png`
    }
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    getCollectList () {
      collectList(this.params).then(res => {
        const result = res.result
        if (result.length === 0) {
          this.empty = true
        }
        this.collectList = result
      })
    },
    cancelCollect (hospitalId) {
      cancelHosCollect(hospitalId).then(res => {
        this.getCollectList()
        this.$toast.success('取消收藏成功')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.collect{
  padding: 0 30px;
  .item{
    margin-top: 30px;
    position: relative;
  }
  .cancelCollect{
    position: absolute;
    right: 0;
    top: 40px;
    text-align: center;
    img{
      width: 34px;
      height: 34px;
    }
  }
  .blue{
    color: #5386FF;
  }
  .grey{
    color: #ddd;
    margin-top: 5px;
    font-size: 20px;
  }
  /* .empty{
    font-size: 30px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  } */
}
</style>
