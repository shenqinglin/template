<template>
  <v-page
    :show-header="false"
  >
    <div class="hos-detail border-bottom">
      <hos-list
        :hos-detail="{
          portrait: hosDetail.picture,
          name: hosDetail.hosName,
          fhTime: hosDetail.openTimeText,
          hospitalLevelName: hosDetail.hospitalLevelName
        }"
        class="hos-list-data"
      />
      <div
        class="cancelCollect"
        @click="toCollect"
      >
        <v-icon
          v-if="!isCollect"
          name="collect"
          :class="isCollect?'blue':''"
        />
        <img
          v-if="isCollect"
          :src="collectImg"
        >
        <p :class="isCollect?'grey':''">
          {{ isCollect ? '取消收藏' : '收藏' }}
        </p>
      </div>
    </div>
    <div
      class="content"
    >
      <div class="detail_item">
        <h5>联系地址</h5>
        <p>{{ hosDetail.hosAddress }}</p>
      </div>
      <div class="detail_item">
        <h5>医院网址</h5>
        <p>{{ hosDetail.hosLink }}</p>
      </div>
      <div class="detail_item">
        <h5>联系电话</h5>
        <p>{{ hosDetail.hosTelephone }}</p>
      </div>
      <div class="detail_item">
        <h5>交通指南</h5>
        <p v-html="busGuide" />
      </div>
      <div class="detail_item">
        <h5>预约指南</h5>
        <p>1.预约周期：{{ hosDetail.bookingRange }}天</p>
        <p>2.放号时间：{{ hosDetail.openTimeText }}</p>
        <p>3.停挂时间：{{ hosDetail.closeTimeText }}</p>
      </div>
    </div>
  </v-page>
</template>
<script>
import HosList from '@/components/HosList/item'
import { getHospitalDetail, addHosIsFavorite, cancelHosCollect, checkHosIsFavorite, getMarkdown } from '@/api/common'
import { STATIC_URL } from '@/config'
export default {
  components: {
    HosList
  },
  data () {
    return {
      hosDetail: [],
      isCollect: false,
      busGuide: ''
    }
  },
  computed: {
    collectImg () {
      return `${STATIC_URL}/img/collect.png`
    },
    hospitalId () {
      const { hospitalId } = this.$route.params
      return hospitalId
    }
  },
  mounted () {
    this.getHosIsFavorite()
    this.getHosDetail()
    this.getBusGuide()
  },
  methods: {
    getHosDetail () {
      getHospitalDetail(this.hospitalId).then(res => {
        this.hosDetail = res
      })
    },
    toCollect () {
      if (this.isCollect) {
        this.cancelCollect()
      } else {
        this.addCollect()
      }
    },
    getHosIsFavorite () {
      checkHosIsFavorite(this.hospitalId).then(res => {
        this.isCollect = res.status
      })
    },
    addCollect () {
      addHosIsFavorite(this.hospitalId).then(res => {
        this.isCollect = true
        this.$toast.success('收藏成功')
      })
    },
    cancelCollect () {
      cancelHosCollect(this.hospitalId).then(res => {
        this.isCollect = false
        this.$toast.success('取消收藏成功')
      })
    },
    getBusGuide () {
      getMarkdown({
        hosCode: this.hospitalId,
        label: 'busGuide',
        bizType: 'HOSPITAL'
      }).then(res => {
        this.busGuide = res
      })
    }
  }
}
</script>
<style lang="less" scoped>
.hos-detail{
  margin: 30px 30px 0 30px;
  padding-bottom: 30px;
  position: relative;
  .cancelCollect{
    width: 100px;
    text-align: center;
    position: absolute;
    right: 0;
    top: 40px;
    text-align: center;
    img{
      width: 34px;
      height: 34px;
    }
    .v-icon{
      font-size: 34px;
    }
    p{
      font-size: 20px;
      margin-top: 4px;
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
  .empty{
    font-size: 30px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
}
.content{
  padding: 0 30px 60px;
  .detail_item{
    margin-top: 40px;
    font-size: 24px;
    h5{
      color: #999999;
      margin-bottom: 10px;
    }
    p{
      color: #333333;
      padding: 5px 0;
    }
  }
}
</style>
