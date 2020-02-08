<template>
  <div class="hos-list">
    <div class="hos_left">
      <p
        v-if="istoUpdate"
        class="hos_left_whz"
      >
        <span>维护中</span>
      </p>
      <img
        v-lazy="hosDetail.portrait || hosDetail.photo"
      >
    </div>
    <div :class="istoUpdate ? 'hos_right three whz' : hosDetail.departmentName ? 'hos_right three' : 'hos_right'">
      <h3>{{ hosDetail.name ? hosDetail.name : hosDetail.hospitalName }}</h3>
      <p
        v-if="hosDetail.departmentName"
        class="depart"
      >
        {{ hosDetail.departmentName }}
      </p>
      <p>
        <span>{{ hosDetail.hospitalLevelName }}</span>
        <span>每天{{ hosDetail.fhTime }}放号</span>
        <m-icon
          v-if="hosDetail.distance"
          name="distance"
          :desc="hosDetail.distance + 'km'"
        />
      </p>
      <slot />
    </div>
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
export default {
  components: {
    MIcon
  },
  props: {
    hosDetail: {
      type: Object,
      default: function () {
        return {
          portrait: '', // 医院头像
          hosId: '', // 医院id
          name: '', // 医院名称
          fhTime: '', // 医院放号时间
          hospitalLevelName: '', // 医院等级
          distance: '', // 距离
          departmentName: '', // 推荐科室
          departmentId: '' // 科室id
        }
      }
    },
    istoUpdate: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.hos-list{
  width: 690px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .hos_left{
    width: 160px;
    height: 132px;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
    .hos_left_whz{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(255, 255, 255, 0.5) none repeat scroll 0 0 !important;/*实现FF背景透明，文字不透明*/
      span{
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: #FF5F5F;
        color: #fff;
        font-size: 22px;
        border-radius: 10px 0 10px 0;
      }
    }
  }
  .hos_right{
    width: 510px;
    h3{
      margin: 0;
      color: #333;
      font-size: 28px;
      font-weight: bold;
    }
    p{
      color: #999;
      font-size: 24px;
      margin-top: 20px;
      span:first-child{
        margin-right: 20px;
      }
      .m-icon{
        float: right;
      }
    }
    &.three{
      p{
        margin-top: 10px;
        &.depart{
          // margin-top: 10px;
          color: #5386FF;
        }
      }
    }
  }
  .whz{
    h3{
      color: #AEAEAE;
    }
    p{
      color: #D7D7D7;
    }
  }
}
</style>
