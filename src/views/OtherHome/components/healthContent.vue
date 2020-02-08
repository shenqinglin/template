<template>
  <div class="hos-list">
    <div class="hos_left">
      <img
        v-lazy="hosDetail.portrait"
      >
    </div>
    <div class="hos_right three">
      <h3>{{ hosDetail.name }}</h3>
      <p
        v-if="hosDetail.departmentName"
        class="depart"
      >
        {{ hosDetail.departmentName }}
      </p>
      <p>
        <span>{{ hosDetail.articleFrome }}</span>
        <span>{{ hosDetail.look }}601人看过</span>
      </p>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hosDetail: {
      type: Object,
      default: function () {
        return {
          portrait: '', // 医院头像
          ArticleId: '', // 文章id
          name: '什么病不致命，却能折磨50%的中国人！', // 医院名称
          articleFrome: '北京114预约挂号微信', // 文章来源
          look: '' // 多少人看过
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
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
        text-align: center;
        background: #FF5F5F;
        color: #fff;
        font-size: 22px;
        border-bottom-right-radius: 10px;
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

