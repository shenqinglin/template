<template>
  <div
    v-if="hosRecommendList.length"
    class="hos-recommend"
  >
    <div class="grey" />
    <div class="hos_recommend">
      <div class="recommend">
        <p><img :src="recommend">推荐医院科室</p>
        <p>
          <m-icon
            name="level"
            desc="按等级"
            :class="active==='LEVEL'?'active':''"
            @click.native="sortLevel('LEVEL')"
          />
          <m-icon
            name="distance"
            desc="按距离"
            :class="active==='POSITION'?'active':''"
            @click.native="sortLevel('POSITION')"
          />
        </p>
      </div>
      <hos-list
        v-for="(item,index) in hosRecommendList"
        :key="index"
        :hos-detail="item"
        :isto-update="item.maintain"
        @click.native="goHosCalendar(item)"
      />
    </div>
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
import HosList from '@/components/HosList/item'
import { STATIC_URL } from '@/config'
import { Session } from '@/utils/storage'
import { getRecommend } from '@/api/common'
import { getLocation } from '@/utils'
export default {
  components: {
    MIcon,
    HosList
  },
  props: {
    recommendItem: {
      type: Object,
      default: function () {
        return {
          a: 1
        }
      }
    }
  },
  data () {
    return {
      refuse: false,
      hospitalList: [],
      location: {}, // 保存定位信息
      active: 'LEVEL',
      hosRecommendList: [] // 推荐号源列表
    }
  },
  computed: {
    recommend () {
      return `${STATIC_URL}/img/recommend.png`
    },
    hosCode () {
      return this.$route.params.hosCode
    },
    firstDeptCode () {
      return this.$route.params.firstDeptCode
    },
    secondDeptCode () {
      return this.$route.params.secondDeptCode
    }
  },
  watch: {
    $route (val) {
      this.getHosRecommend()
    }
  },
  mounted () {
    this.getHosRecommend(this.active)
  },
  methods: {
    async getHosRecommend (type) {
      const cachedData = Session.get('LOCATION')
      if (type === 'POSITION' || cachedData) {
        await getLocation().then(res => {
          if (res.refuse) {
            this.refuse = res.refuse
            return
          }
          this.refuse = false
          this.location = res
        })
      }
      if (this.refuse) {
        this.active = 'LEVEL'
        return
      }
      getRecommend({
        hosCode: this.hosCode,
        deptCode: this.secondDeptCode,
        sortType: type || 'LEVEL',
        longitude: this.location.lng,
        latitude: this.location.lat
      }).then(res => {
        this.hosRecommendList = res
      })
    },
    sortLevel (val) {
      this.active = val
      this.getHosRecommend(val)
    },
    goHosCalendar (item) {
      if (item.maintain) {
        this.$router.replace(`/children/department/${item.hosCode}`)
        return
      }
      this.$router.replace(`/calendar/${item.hosCode}/0/${item.deptCode}/date`)
    }
  }
}
</script>
<style lang="less" scoped>
.grey{
  background: #F6F6F6;
  height: 20px;
}
.hos_recommend{
  padding: 30px;
  .recommend{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p:nth-child(1){
      position: relative;
      padding-left: 44px;
      font-size: 28px;
      color: #333333;
    }
    .m-icon{
      margin-left: 41px;
      &.active{
        color: #333333;
      }
    }
    img{
      position: absolute;
      top: 2px;
      left: 0;
      width: 34px;
      height: 34px;
    }
  }
  .hos-list{
    margin: 30px 0 10px;
  }
}
</style>
