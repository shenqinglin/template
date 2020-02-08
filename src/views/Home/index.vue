<template>
  <v-page
    class="home"
    :show-header="false"
    :show-blue-head="false"
  >
    <home-swipe />
    <home-nav />
    <van-sticky>
      <div
        class="xd"
      >
        <!-- <hospital-search
          class="index-search"
          :show-action="false"
          @click.native="search"
        /> -->
        <p
          class="index-search"
          @click="search"
        >
          <v-icon
            class="index-search-icon"
            name="search"
          />
          <span class="index-search-text">请输入医院关键字</span>
        </p>
      </div>
      <home-center-select
        v-model="getSortType"
        class="home-ce-se"
        @areaId="areaId"
      />
    </van-sticky>
    <hospital-list
      v-model="getSortType"
      class="index-hosList"
      :style="`min-height: ${homeMinHeight}px`"
      :get-area-id="getAreaId"
    />
  </v-page>
</template>

<script>
import HomeSwipe from './HomeSwipe'
import HomeNav from './HomeNav'
// import HospitalSearch from '@/components/Search'
import { mapState, mapMutations } from 'vuex'
import HospitalList from '@/components/HosList'
import HomeCenterSelect from '@/components/HosList/filter'
export default {
  name: 'Home',
  components: {
    HomeSwipe,
    HomeNav,
    // HospitalSearch,
    HospitalList,
    HomeCenterSelect
  },
  data () {
    return {
      loading: false,
      getAreaId: '0',
      getSortType: 'LEVEL',
      homeListMinHeight: 0
    }
  },
  computed: {
    ...mapState('savePosition', ['includePage']),
    ...mapState('home', ['homeMinHeight'])
  },
  mounted () {
    if (this.includePage.indexOf('cdata') !== -1) { // cdata其实就是c页面的name，可以在路由设置name
      // console.log('有缓存，清除缓存')
      this.$store.commit('INCLUDE_PAGE', { pageName: 'cdata', flag: false })
    }
  },
  methods: {
    ...mapMutations('savePosition', ['INCLUDE_PAGE']),
    init () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    search () {
      // document.activeElement.blur()// 禁止拉起系统键盘
      this.$router.push('/search')
    },
    areaId (val) { // 获取区域id
      this.getAreaId = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.home {
  .index_swipe {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 200px;
    }
  }
  .index-search {
    width: 690px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
    height: 60px;
    line-height: 60px;
    box-shadow:0px 0px 30px 0px rgba(0,0,0,0.06);
    border-radius:33px;
    font-size: 28px;
    color: #bbb;
    .index-search-icon{
      margin-left: 34px;
      color: #bbb;
      font-size: 29px;
      float: left;
    }
    .index-search-text{
      float: left;
      margin-left: 5px;
    }
  }
  .index-hosList {
    padding-top: 30px;
    min-height: 1800px;
  }
  .xd{
    background: @backgroundColorWhiter;
  }
  .home-ce-se{
    background: @backgroundColorWhiter;
    min-height:50px;
  }
}
/deep/ .van-sticky--fixed{
  background: @backgroundColorWhiter;
}
</style>
