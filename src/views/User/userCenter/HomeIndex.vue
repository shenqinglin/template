<template>
  <div
    class="home-index"
    @click="onHomeClick"
  >
    <div class="img">
      <img :src="imgSrc">
    </div>
    <div class="word-tip">
      首页
    </div>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config'
export default {
  data () {
    return {

    }
  },
  computed: {
    imgSrc () {
      return `${STATIC_URL}/img/home-index.png`
    }
  },
  methods: {
    onHomeClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .home-index {
    width:100px;
    height:100px;
    background:rgba(83,134,255,1);
    box-shadow:0px 4px 20px 0px rgba(83,134,255,0.5);
    border-radius:50px;
    opacity:0.4;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    position: absolute;
    transform: translateZ(0);
    right: 30px;
    bottom: 50px;
    .img {
      width:46px;
      height:41px;
      img {
        width: 100%;
      }
    }
    .word-tip {
      font-size: 20px;
      color:#fff;
      margin-top: 3px;
      height: 28px;
      line-height: 28px;
    }
  }
</style>
