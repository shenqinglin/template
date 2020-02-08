<template>
  <div class="attention">
    <img :src="imgSrc">
  </div>
</template>
<script>
import { STATIC_URL } from '@/config/index'
export default {
  data () {
    return {
      imgSrc: `${STATIC_URL}/img/smgz-ewm.png`
    }
  }
}
</script>
<style lang="less" scoped>
.attention{
  width: 100%;
  img{
    width: 100%;
  }
}
</style>
