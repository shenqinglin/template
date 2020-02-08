<template>
  <div class="order-item">
    <router-link :to="`/user/order/orderDetail/${item.hosCode}/${item.orderNo}/order`">
      <div class="header border-bottom">
        <span class="hosName">
          <m-icon name="hospital" />
          <span class="hos-name-text">{{ item.hosName }}</span>
        </span>
        <m-icon
          name="right"
          :class="item.orderStatus"
          :desc="item.orderStatus | formatOrderStatus"
          :icon-liftshow="false"
        />
      </div>
      <div class="content">
        <label-line
          v-for="(items,index) in list"
          :key="index"
          :label="items.name"
          :info="items.value"
          :blod="items.blod"
        />
        <div
          v-if="isPaySource"
          class="pay"
        >
          支付
        </div>
      </div>
      <div class="grey" />
    </router-link>
  </div>
</template>
<script>
import LabelLine from '@/components/LabelLine'
import MIcon from '@/components/MIcon'
import { orderStatus } from '@/constants/rules'
export default {
  components: {
    MIcon,
    LabelLine
  },
  filters: {
    formatOrderStatus (val) {
      return orderStatus[val].name
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      list: [],
      isPaySource: false
    }
  },
  mounted () {
    const list = [
      {
        name: '就诊科室',
        value: this.item.deptName
      },
      {
        name: '就诊时间',
        value: this.item.visitTime
      }
    ]
    this.list = list
  }
}
</script>
<style lang="less" scoped>
.header{
  height: 120px;
  margin-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border-bottom: 1PX solid #EEEEEE; */
  .SUCCESS{
    color: #5386FF;
  }
  .hosName{
    color: #333333;
    font-size: 28px;
    font-weight: bold;
    display: flex;
    align-items: center;
    .m-icon{
      margin-right: 20px;
      font-weight: 400;
      /deep/.v-icon{
        font-size: 28px;
      }
    }
    .hos-name-text {
      display: inline-block;
      width:460px ;
    }
  }
}

.content{
  padding: 20px 30px 20px;
  position: relative;
  .pay{
    position: absolute;
    top: 75px;
    right: 14px;
    width:140px;
    height:44px;
    line-height: 44px;
    color: #fff;
    text-align: center;
    background:rgba(83,134,255,1);
    box-shadow:0px 6px 30px 0px rgba(73,144,241,0.4);
    border-radius:25px;
  }
}
.grey{
  background: #F9F9F9;
  height: 20px;
  width: 100%;
}
</style>
