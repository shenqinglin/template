<template>
  <div
    class="nosearch"
  >
    <dl>
      <dt><img :src="searchImg"></dt>
      <dd>暂无数据</dd>
    </dl>
  </div>
</template>

<script>
import { STATIC_URL } from '@/config/index'
export default {
  data () {
    return {
      searchImg: `${STATIC_URL}/img/nosearch.png`
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.nosearch {
  width: 100%;
  text-align: center;
  overflow: hidden;
  padding-top: 240px;
  dl {
    display: inline-block;
    dt {
      img {
        width: 200px;
        height: 200px;
      }
    }
    dd {
      font-size:28px;
      color: #ccc;
      margin-top: 20px;
    }
  }
}
</style>

