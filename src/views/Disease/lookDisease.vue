<template>
  <div class="look-disease">
    <van-sticky>
      <department-search
        class="top-search"
        :show-action="true"
        search-content="dise"
        @listClick="listClick"
      />
    </van-sticky>
    <van-index-bar
      highlight-color="#5386FF"
      :index-list="indexList"
      :sticky-offset-top="58"
    >
      <div
        v-for="(item,index) in list"
        :key="index"
      >
        <van-index-anchor :index="item.aliasName" />
        <van-cell
          v-for="(item2,index2) in item.h301DiseaseOutputList"
          :key="index2"
          :title="item2.name"
          @click="goResult(item2.id)"
        />
      </div>

      <!-- <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" /> -->
    </van-index-bar>
  </div>
</template>
<script>
import DepartmentSearch from '@/components/Search'
import { searchByDisease } from '@/api/special'
export default {
  components: {
    DepartmentSearch
  },
  data () {
    return {
      list: [],
      indexList: []
    }
  },
  mounted () {
    this.diseaseId = this.$route.params.id
    this.getDisease()
  },
  methods: {
    listClick (id) {
      if (id !== '0' && id !== 0) {
        this.$router.push({ path: '/disResult/' + id })
      }
    },
    goResult (id) {
      this.$router.push({ path: '/disResult/' + id })
    },
    getDisease () {
      const _this = this
      searchByDisease(_this.diseaseId).then((res) => {
        _this.list = res.list
        _this.list.forEach((item, index, arr) => {
          _this.indexList.push(item.aliasName)
        })
        // this.indexList = this.list.aliasName
      })
    }
  }
}
</script>
<style lang="less" scoped>
.look-disease{
  padding-bottom: 50px;
  /deep/.van-index-bar{
    .van-index-bar__sidebar{
      padding-right: 20px;
      font-size: 24px;
      margin-top:15px;
    }
    .van-index-anchor{
      height: 60px;
      line-height: 60px;
      background: #F6F6F6;
      font-size: 24px;
      color: #666;
      margin-bottom: 15px;
    }
    .van-index-bar__index{
      line-height: 30px;
    }
    .van-cell{
      padding: 15px 30px;
      font-size: 28px;
      line-height:normal;
    }
    .van-cell:not(:last-child)::after{
      border: none;
    }
  }
  /deep/ .van-sticky--fixed{
    background: #fff;
  }
  /deep/.hos-search-box{
    padding: 30px 0 30px;
    margin: 0;
  }
}
</style>
