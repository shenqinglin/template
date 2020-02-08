<template>
  <v-page
    :show-header="false"
  >
    <div class="cashier">
      <div class="payStatus">
        <p class="desc">
          待支付金额
        </p>
        <b class="money">
          ￥100
        </b>
        <p class="tip">
          请在<span>04分50秒</span>内完成支付，如超时，系统自动取消订单
        </p>
      </div>
      <div class="payType">
        <pay-type
          v-for="(item,index) in typeList"
          :key="index"
          :img-url="item.img"
          :name="item.name"
          :status="selectType===item.type?'selected':'select'"
          @click.native="selectPayType(item)"
        />
      </div>
      <p class="attention">
        <m-icon
          name="tip"
          desc="北京社保卡用户预约时需全额支付，就诊当天取号时医保报销部分金额将根据您的支付方式原路退还。"
        />
      </p>
      <div class="btn">
        立即支付
      </div>
    </div>
  </v-page>
</template>
<script>
import MIcon from '@/components/MIcon'
import PayType from '@/components/PayType'
import { STATIC_URL } from '@/config'
export default {
  name: 'PaySucces',
  components: {
    MIcon,
    PayType
  },
  data () {
    return {
      searchImg: `${STATIC_URL}/img/index-user.png`,
      typeList: [{
        name: '微信支付',
        img: `${STATIC_URL}/img/index-user.png`,
        type: 'wechat'
      },
      {
        name: '支付宝支付',
        img: `${STATIC_URL}/img/index-user.png`,
        type: 'ali'
      }],
      selectType: 'wechat'
    }
  },
  methods: {
    selectPayType (item) {
      console.log(item)
      this.selectType = item.type
    }
  }
}
</script>
<style lang="less" scoped>
.cashier{
  height: calc(100% - 44px);
  background: #F6F6F6;
  .payStatus{
    background: #fff;
    padding: 45px 30px 30px;
    .desc{
      color: #999999;
      font-size: 22px;
      text-align: center;
    }
    b{
      display: block;
      font-size: 52px;
      text-align: center;
      color: #5386FF;
      margin: 10px 0 53px;
    }
    .tip{
      font-size: 24px;
      color: #999;
      text-align: center;
    }
  }
  .payType{
    margin-top: 20px;
    background: #fff;
  }
  .attention{
    padding: 20px 30px 0;
    /deep/.m-icon{
      color: #5386FF;
      .desc{
        width: 650px;
        color: #999999;
        font-size: 22px;
      }
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
