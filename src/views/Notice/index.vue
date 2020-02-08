<template>
  <v-page
    :show-header="false"
    class="notice"
  >
    <van-tabs
      v-model="active"
      line-width="70px"
      line-height="2px"
      title-active-color="#6596f5"
      title-inactive-color="#666"
      color="#6596f5"
    >
      <van-tab
        title="平台公告"
        to="/notice/platform"
        replace
      />
      <van-tab
        title="停诊公告"
        to="/notice/stop"
        replace
      />
    </van-tabs>
  </v-page>
</template>
<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    this.active = this.$route.name === 'stop' ? 1 : 0
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assests/styles/common.less';
.notice{
  /deep/.van-tabs{
    .van-tabs__wrap{
      height: 80px;
      box-shadow: 0px 0 30px 0px rgba(0,0,0,0.06);
      .van-tab span{
        height: 100%;
        line-height: 80px;
        font-size: 28px;
      }
    }
  }
  .van-list{
    padding-left: 30px;
  }
  .notice-list{
    padding-left: 0;
    .border-bottom;
  }
}
</style>
