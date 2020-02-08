<template>
  <v-page
    :show-header="false"
  >
    <div class="paySuccess">
      <div class="icons">
        <img
          :src="searchImg"
          alt=""
        >
        <p>支付成功</p>
      </div>
      <div class="btn">
        查看订单
      </div>
    </div>
  </v-page>
</template>
<script>
import { STATIC_URL } from '@/config'
export default {
  name: 'PaySucces',
  data () {
    return {
      searchImg: `${STATIC_URL}/img/user-auth.png`
    }
  }
}
</script>
<style lang="less" scoped>
.paySuccess{
  height: calc(100% - 44px);
  background: #F6F6F6;
  .icons{
    height: 385px;
    text-align: center;
    background: #fff;
    img{
      width: 100px;
      margin: 100px 0 40px;
    }
    p{
      font-size: 32px;
      font-weight: bold;
      color: #333;
    }
  }
  .btn{
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    background: #5386FF;
    position: absolute;
    bottom: 0;
  }
}
</style>
