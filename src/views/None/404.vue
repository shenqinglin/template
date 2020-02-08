<template>
  <v-page
    class="home"
    :show-header="false"
  >
    <div class="none">
      <div class="pic">
        <img :src="noPageImg">
      </div>
      <div class="tip-text">
        您访问的页面不存在
      </div>
      <v-btn
        text="首页"
        class="cancel fix-bottom"
        @touchend.native="onBtnTouch"
      />
    </div>
  </v-page>
</template>

<script>
import { STATIC_URL } from '@/config'
import VBtn from '@/components/VBtn'
export default {
  components: {
    VBtn
  },
  data () {
    return {
    }
  },
  computed: {
    noPageImg () {
      return `${STATIC_URL}/img/404.png`
    }
  },
  methods: {
    onBtnTouch () {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .home {
    background-color: #fff;
    .pic {
      width: 335px;
      height: 137px;
      margin: 130px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tip-text {
      margin-top: 102px;
      font-size: 28px;
      color: #999;
      text-align: center;
    }
    .fix-bottom {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
