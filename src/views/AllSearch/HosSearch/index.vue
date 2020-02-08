<template>
  <v-page
    :show-header="false"
    :show-blue-head="false"
    class="Hos_search fixed"
  >
    <van-sticky>
      <hospital-search
        class="top-search"
        :show-action="true"
        search-content="hos"
        @search="search"
        @searchClear="searchClear"
      />
      <hospital-list-nav
        v-if="showSearchNav"
        v-model="getSortType"
        class="hoslistNav"
        @areaId="areaId"
      />
    </van-sticky>
    <div
      v-if="showSearchResults"
      class="searchHoslist"
    >
      <hospital-list
        v-model="getSortType"
        :keywords="value"
        :get-area-id="getAreaId"
        @noResult="noResult"
      />
    </div>
    <div
      v-if="showHistory"
      class="search-history"
    >
      <h3 class="title">
        浏览历史
      </h3>
      <div
        class="delete"
        @click="clearHistory"
      >
        <v-icon
          name="delete"
        />
      </div>
      <div class="search-history-box">
        <ul>
          <li
            v-for="(item,index) in historyList"
            :id="item.id"
            :key="index"
            @click="searhHos(item.name,item.code)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </v-page>
</template>
<script>
import { Local } from '@/utils/storage'
import HospitalSearch from '@/components/Search'
import HospitalListNav from '@/components/HosList/filter'
import HospitalList from '@/components/HosList'
export default {
  components: {
    HospitalSearch,
    HospitalListNav,
    HospitalList
  },
  data () {
    return {
      historyList: [],
      showHistory: false,
      showSearchResults: false,
      showSearchNav: false,
      value: '',
      nosearch: false,
      rsult: '',
      getAreaId: '0',
      getSortType: 'LEVEL'
    }
  },
  mounted () {
    this.changfouce()
    this.historyFun()
  },
  methods: {
    changfouce () {
      document.querySelector('.van-field__control').focus()
      this.$nextTick(() => { // 正确写法
        document.querySelector('.van-field__control').focus()
      }, 100)
    },
    areaId (val) { // 获取区域id
      this.getAreaId = val
    },
    clearHistory () {
      Local.del('SEARCH_HISTORY')
      this.historyFun()
    },
    historyFun () {
      this.historyList = Local.get('SEARCH_HISTORY')
      if (this.historyList !== null) {
        this.historyList = this.historyList.slice(0, 10)
        this.showHistory = true
      } else {
        this.showHistory = false
      }
    },
    searhHos (name, id) {
      this.$router.push({ path: 'department/' + id })
    },
    search (val) {
      this.value = val
      this.showHistory = false
      this.showSearchResults = true
      if (this.nosearch && this.getAreaId === '0') {
        this.showSearchNav = false
      } else {
        this.showSearchNav = true
      }
    },
    searchClear () { // 清除搜索
      document.getElementsByClassName('content-container')[0].scrollTop = 0 // 返回顶部
      this.getAreaId = '0'
      this.getSortType = 'LEVEL'
      this.value = ''
      this.showSearchNav = false
      this.showSearchResults = false
      document.querySelector('.van-field__control').focus()// 输入框聚焦
      this.historyFun()
    },
    noResult (val) {
      this.nosearch = val
      if (val && this.getAreaId === '0') { // 没有搜索结果
        this.showSearchNav = false
      } else {
        this.showSearchNav = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.fixed{
  position: fixed;
}
.Hos_search{
  .searchHoslist{
    margin-top: 30px;
  }
  .search-history {
    padding-top:10px;
    overflow: hidden;
    .title {
      float: left;
      font-size: 28px;
      padding-left: 30px;
      font-weight: bold;
      color: #333;
    }
    .delete {
      float: right;
      margin-top: 5px;
      font-size: 30px;
      color: #cdcdcd;
      margin-right: 40px;
    }
  }
  .search-history-box {
    overflow: hidden;
    clear: both;
    ul {
      padding: 14px 30px 0;
      margin-bottom: 14px;
      li {
        color: #666;
        font-size: 24px;
        float: left;
        background: #f6f6f6;
        padding: 8px 16px;
        margin-right: 14px;
        margin-bottom: 14px;
        border-radius: 25px;
      }
    }
  }
  .hoslistNav{
    background: @backgroundColorWhiter;
    min-height:50px;
  }
}
/deep/ .van-sticky--fixed{
  background: @backgroundColorWhiter;
}
</style>
