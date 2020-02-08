<template>
  <van-swipe
    :autoplay="3000"
    indicator-color="white"
    class="index-swipe"
  >
    <van-swipe-item
      v-for="(item, index) in images"
      :key="index"
      @click="jumpTo(item.imgHref)"
    >
      <img v-lazy="item.imgLink">
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { fetchIndexData } from '@/api/home'
export default {
  name: 'HomeSwipe',
  data () {
    return {
      loading: false,
      images: []
    }
  },
  created () {
    this.getIndexData()
  },
  methods: {
    getIndexData () {
      fetchIndexData().then((res) => {
        this.images = res.list
      })
    },
    jumpTo (val) {
      window.location.href = val
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.home {
  .index-swipe {
    width: 100%;
    height: 200px;
    img {
      width: 100%;
      height: 200px;
    }
  }
}
/deep/ .van-swipe__indicator {
  opacity: 1;
  width: 8px;
  height: 3px;
  background-color: @backgroundColorWhiter;
  border-radius: 0;
  margin-top:5px;
}
/deep/ .van-swipe__indicator--active {
  width: 8px;
  height: 8px;
  border-radius: 0;
  background-color: @backgroundColorWhiter;
  margin-top:0;
}
</style>
