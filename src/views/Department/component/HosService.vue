<template>
  <div class="hos-service">
    <img
      :src="imgSrc"
      alt=""
    >
    <h3>医院维护中…</h3>
  </div>
</template>
<script>
import { STATIC_URL } from '@/config/index'
export default {
  data () {
    return {
      imgSrc: `${STATIC_URL}/img/serving.png`
    }
  }
}
</script>
<style lang="less" scoped>
.hos-service{
  padding: 0 30px 0;
  img{
    display: block;
    width: 200px;
    height: 200px;
    margin: 200px auto 30px;
  }
  h3{
    text-align: center;
    color: #333333;
    font-size: 30px;
  }
  p{
    margin-top: 10px;
    color: #999999;
    font-size: 24px;
  }
}
</style>
