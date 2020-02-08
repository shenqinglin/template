<template>
  <div class="hos-list">
    <div class="hos_left">
      <img src="http://img.114yygh.com/naja/hospital/1.jpg">
    </div>
    <div class="hos_right three">
      <h3>{{ hosDetail.portrait }}</h3>
      <p class="depart">
        {{ hosDetail.depart }}
      </p>
      <p>
        <span>{{ hosDetail.hospitalLevelName }}</span>
        <span>每天{{ hosDetail.fhTime }}放号</span>
        <m-icon
          name="distance"
          :desc="hosDetail.distance + 'km'"
        />
      </p>
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
          depart: '', // 推荐科室
          departId: '' // 科室id
        }
      }
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
    img{
      width: 100%;
      height: 100%;
      border-radius: 10px;
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
          color: #5386FF;
        }
      }
    }
  }
}
</style>
