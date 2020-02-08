<template>
  <div :class="shadow?'hos-title shadow':'hos-title'">
    <img
      v-if="showPortrait"
      v-lazy="hosDetail.portrait"
      class="hosImg"
      :src="hosDetail.portrait"
    >
    <div
      v-if="hosDetail.hosName"
      class="hos_detail"
      :class="showHosDetail?'border-bottom':''"
    >
      <div class="detail_left">
        <h3>{{ hosDetail.hosName }}</h3>
        <p>
          <m-icon
            name="level"
            :desc="hosDetail.hospitalLevelName"
          />
          <m-icon
            name="time"
            :desc="hosDetail.fhTimes"
          />
        </p>
        <p
          v-if="currentSource"
          class="distance"
        >
          <m-icon
            name="distance"
            :desc="hosDetail.currentSource"
          />
        </p>
        <p
          v-if="showAddress"
          class="distance"
        >
          <m-icon
            name="distance"
            :desc="hosDetail.hosAddress"
          />
        </p>
      </div>
      <div
        v-if="showHosFollow"
        class="detail_right"
      >
        <div @click="collect">
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
    </div>
    <div
      v-if="showHosDetail"
      class="look_detail"
    >
      <router-link
        v-if="showDisease"
        :to="'/disease/' + hospitalId"
      >
        按疾病挂号
      </router-link>
      <router-link :to="'/hosDetail/' + hospitalId">
        查看医院详情
      </router-link>
    </div>
  </div>
</template>
<script>
import { checkHosIsFavorite, addHosIsFavorite, cancelHosCollect, getHosAuthority } from '@/api/common'
import { STATIC_URL } from '@/config'
import MIcon from '@/components/MIcon'
export default {
  components: {
    MIcon
  },
  props: {
    showPortrait: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: false
    },
    showAddress: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    hosDetail: {
      type: Object,
      default: () => {
        return {
          name: '', // 医院名称
          hospitalLevelName: '', // 医院等级
          fhTime: '', // 放号时间
          address: '', // 医院地址
          portrait: '', // 医院头像
          homeLink: '', // 医院链接
          phone: '', // 联系电话
          busGuide: '', // 交通指南
          fhPeriod: '', // 预约周期
          tgTimeDetail: '' // 停挂时间
        }
      }
    }
  },
  data () {
    return {
      isCollect: false,
      path: '',
      currentSource: false,
      showHosDetail: false, // 是否展示查看医院详情
      showHosFollow: false, //  是否展示收藏按钮
      showDisease: false // 是否展示按疾病挂号
    }
  },
  computed: {
    hospitalId () {
      const { hospitalId } = this.$route.params
      return hospitalId
    },
    collectImg () {
      return `${STATIC_URL}/img/collect.png`
    }
  },
  mounted () {
    this.getDetailRoot()
    // 待优化布局
  },
  methods: {
    getDetailRoot () {
      getHosAuthority(this.hospitalId).then(res => {
        this.showHosDetail = res.showHosDetail
        this.showHosFollow = res.showHosFollow
        this.showDisease = res.showDisease
        if (res.showHosFollow) {
          this.getHosIsFavorite()
        }
      })
    },
    collect () {
      if (this.isCollect) {
        this.cancelCollect()
      } else {
        this.addCollect()
      }
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
    getHosIsFavorite () {
      checkHosIsFavorite(this.hospitalId).then(res => {
        this.isCollect = res.status
      })
    }
  }
}
</script>
<style lang="less">
.hos-title{
  z-index: 999;
  padding: 20px 30px 0;
  &.shadow{
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.06);
    -webkit-box-shadow: 0 0 30px 0 rgba(0,0,0,0.06);
  }
  .hosImg{
    width: 100%;
    height: 320px;
    margin: 10px 0 30px 0;
    border-radius: 20px;
  }
  .hos_detail{
    // overflow: hidden;
    padding-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .detail_left{
      width: 580px;
      flex-grow: 1;
      h3{
        margin-bottom: 20px;
        padding: 2px 0;
        font-weight: bold;
        font-size: 34px;
        color: #333;
      }
      p{
        margin-bottom: 10px;
        .m-icon{
          font-size: 24px;
          margin-right: 40px;
        }
        &.distance{
          .desc{
            width: 500px;
          }
        }
      }
    }
    .detail_right{
      width: 110px;
      display: flex;
      align-items:center;
      justify-content:center;
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
      div{
        text-align: center;
        .blue{
          color: #5386FF;
        }
        .grey{
          color: #dddddd;
        }
      }
    }
  }
  .look_detail{
    height: 72px;
    line-height: 72px;
    display: flex;
    justify-content: space-around;
    font-size: 24px;
    text-align: center;
    color: #999999;
    a{
      display: block;
      color: #999999;
    }
  }
}
</style>
