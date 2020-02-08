<template>
  <v-page
    :show-header="false"
    :show-blue-head="true"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="getmore"
    >
      <div class="health-box">
        <health-content
          class="health-content"
        />
      </div>
    </van-list>
  </v-page>
</template>

<script>
import healthContent from '../OtherHome/components/healthContent'
export default {
  components: {
    healthContent
  },
  data () {
    return {
      loading: false,
      finished: false
    }
  },
  methods: {
    getmore () {}
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.health-box{
  padding: 30px 30px 0;
  overflow: hidden;
  .health-content{
    margin-bottom: 40px;
  }
}
</style>
