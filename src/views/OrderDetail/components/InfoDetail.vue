<template>
  <div class="info-detail">
    <h3>
      <span>检查费</span>
      <span>80.00元</span>
    </h3>
    <div class="detail">
      <p
        v-for="index in 3"
        :key="index"
      >
        <span>电脑多导联心点图(心电图 心电图)</span>
        <span>20.00元/人次</span>
        <span>20.00元</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.info-detail{
  padding: 30px;
  h3{
    display: flex;
    justify-content: space-between;
    span{
      color: #333333;
      font-size: 26px;
      font-weight: bold;
    }
  }
  .detail{
    padding: 10px;
    background: #F6F9FF;
    margin-top: 10px;
    p{
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      padding: 3px;
      span{
        display: inline-block;
        font-size: 22px;
        color: #999;
      }
      span:nth-child(1){
        width: 320px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
      }
    }
  }
}
</style>
