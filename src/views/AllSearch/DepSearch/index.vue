<template>
  <v-page
    :class="grayStyle? 'all-department grey-color':'all-department'"
    :show-header="false"
    :show-blue-head="false"
  >
    <van-sticky>
      <department-search
        class="top-search"
        :keyword="keyword"
        :show-action="true"
        search-content="dep"
        :dept-id="deptId"
        @searchClear="searchClear"
        @listClick="listClick"
      />
      <depart-list-nav
        v-if="SearchNavVisible"
        v-model="getSortType"
        class="deplistNav"
        @areaId="areaId"
      />
    </van-sticky>
    <div
      v-if="!noSearchResults"
      class="departmentList"
    >
      <!-- <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="noMoreText"
        :immediate-check="false"
        @load="lodemore"
      >
        <dep-content
          v-for="(item,index) in List"
          :key="index"
          :dep-detail="item"
          class="departmentList-content"
        />
      </van-list> -->
      <scoll-list
        ref="scrollList"
        :load-data="loadData"
        @noResult="noResult"
      >
        <template v-slot="props">
          <!--搜索科室列表-->
          <dep-content
            v-for="(item,index) in props.list"
            :key="index"
            :dep-detail="item"
            class="departmentList-content"
          />
          <!--搜索科室列表end-->
        </template>
      </scoll-list>
    </div>
  </v-page>
</template>
<script>
import DepartmentSearch from '@/components/Search'
import DepartListNav from '@/components/HosList/filter'
import depContent from './component/DepContent'
import { getLocation } from '@/utils/index'
import { departmentReHospitals, departmentName } from '@/api/common'
import scollList from '@/components/ScollList'
export default {
  components: {
    DepartmentSearch,
    DepartListNav,
    depContent,
    scollList
  },
  data () {
    return {
      noSearchResults: false,
      SearchNavVisible: true,
      grayStyle: true,
      keyword: '',
      getAreaId: '0',
      getSortType: 'LEVEL',
      deptId: this.$route.query.departmentId,
      noMoreText: '',
      longitude: '', // 经度
      latitude: '' // 纬度
    }
  },
  watch: {
    getSortType () {
      this.$nextTick(() => {
        this.loadListData()
      })
    },
    getAreaId () {
      this.$nextTick(() => {
        this.loadListData()
      })
    }
  },
  mounted () {
    this.code = this.$route.query.departmentId
    this.getDetail()
  },
  methods: {
    async loadData (pageNo, pageSize = 10) {
      if (this.longitude === '' && this.latitude === '') {
        await getLocation().then((res) => {
          this.longitude = res.lng
          this.latitude = res.lat
        })
      }
      return departmentReHospitals({
        code: this.code, // 标准科室编码
        sortType: this.getSortType, // 排序类型，LEVEL("按等级"),POSITION("按距离");
        areaId: this.getAreaId, // 区域编码
        longitude: this.longitude, // 经度
        latitude: this.latitude, // 纬度
        pageNo,
        pageSize
      })
    },
    loadListData (pageNo = 1) {
      const scrollList = this.$refs.scrollList
      scrollList.reset()
      scrollList.load({ pageNo })
    },
    areaId (val) { // 获取区域id
      this.getAreaId = val
    },
    getDetail () {
      if (this.code === '') {
        return false
      }
      departmentName(this.code).then((res) => {
        this.keyword = res.deptName
      })
    },
    searchClear () { // 清除搜索
      this.getAreaId = '0'
      this.getSortType = 'LEVEL'
      this.noSearchResults = true
      this.SearchNavVisible = false
      this.grayStyle = false
      document.querySelector('.van-field__control').focus()// 输入框聚焦
    },
    listClick (code) {
      if (code !== '0' && code !== 0) {
        this.code = code
        this.noSearchResults = false
        this.SearchNavVisible = true
        this.grayStyle = true
        this.$nextTick(() => {
          this.loadListData()
        })
      }
    },
    noResult (val) {
      if (val && this.getAreaId === '0') { // 没有搜索结果
        this.SearchNavVisible = false
        this.grayStyle = false
      } else if (val && this.getAreaId !== '0') { // 切换区域并且没有数据时加灰背景
        this.grayStyle = false
      } else {
        this.SearchNavVisible = true
        this.grayStyle = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.departmentList {
  clear: both;
  // margin-top: 50px;
  .departmentList-content {
    padding-top: 20px;
    padding-bottom: 10px;
  }

}
.deplistNav{
  min-height: 50px;
  background: @backgroundColorWhiter;
}
/deep/ .van-sticky{
  background: @backgroundColorWhiter;
}
.grey-color {
  background: @backgroundColorGray;
}
/deep/ .hos-search-box{
  margin: 0;
  padding:30px 0 30px;
}
/deep/ .depContent{
  margin-bottom: 20px;
}
/deep/ .depContent:last-child{
  margin-bottom: 0;
}
/deep/ .van-sticky--fixed{
  background: @backgroundColorWhiter;
  padding-bottom: 10px;
}
</style>
