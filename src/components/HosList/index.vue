<template>
  <div
    ref="box"
    class="hospital-list"
  >
    <scoll-list
      ref="scrollList"
      :load-data="loadData"
      @noResult="noResult"
    >
      <template v-slot="props">
        <!--搜索医院列表-->
        <hos-list
          v-for="(item,index) in props.list"
          :key="index"
          :hos-detail="{
            portrait: item.picture,
            hosId: item.picture,
            name: item.name,
            fhTime: item.openTimeText,
            hospitalLevelName: item.levelText,
            distance: item.distance,
          }"
          :isto-update="item.maintain"
          class="hos-list-data"
          @click.native="clickList(item.code)"
        />
        <!-- 两个参数，hospitalId：医院id，查询科室；toUserOpen：是否开放，不开放展示医院维护中 -->
        <!-- <router-link :to="{path:'/department/'+item.code}">
            {{ props.list }}

          </router-link> -->
        <!--搜索医院列表end-->
      </template>
    </scoll-list>
  </div>
</template>

<script>
import HosList from './item'
import { fetchHospitalList } from '@/api/home'
import { getLocation } from '@/utils/index'
import { Session } from '@/utils/storage'
import { mapMutations } from 'vuex'
import scollList from '@/components/ScollList'
export default {
  name: 'HomeNav',
  components: {
    HosList,
    scollList
  },
  props: {
    keywords: {
      type: String,
      default: ''
    },
    getAreaId: {
      type: [String, Number],
      default: '0'
    },
    value: {
      type: String,
      default: 'LEVEL'
    },
    changeSortType: {
      type: Function,
      default: () => ({})
    }
  },
  data () {
    return {
      refuse: false, // 获取定位是否拒绝
      longitude: '', // 经度
      latitude: '' // 纬度
    }
  },
  watch: {
    keywords () {
      this.loadListData()
    },
    value () {
      this.loadListData()
    },
    getAreaId () {
      this.loadListData()
    }
  },
  methods: {
    ...mapMutations('home', ['SET_HOME_MIN_HEIGHT']),
    async loadData (pageNo, pageSize = 10) {
      const cachedData = Session.get('LOCATION')
      if (this.longitude === '' && this.latitude === '' && (this.value === 'POSITION' || cachedData)) {
        await getLocation().then((res) => {
          this.longitude = res.lng
          this.latitude = res.lat
        })
      }
      return fetchHospitalList({
        keywords: this.keywords,
        sortType: this.value, // LEVEL("按等级"),POSITION("按距离");
        areaId: this.getAreaId, // 区域id
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
    clickList (code) {
      this.$router.push({
        name: 'department',
        params: {
          hospitalId: code
        }
      })
    },
    noResult (val) { // 没有数据
      this.$emit('noResult', val)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.hospital-list{
  padding: 0 30px 0;
  /deep/ .van-list__finished-text {
    font-size: 24px;
  }
}

</style>
