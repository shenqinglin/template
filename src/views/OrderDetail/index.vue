<template>
  <v-page
    class="department"
    :show-header="false"
  >
    <order-detail
      ref="orderDetail"
      v-model="showBtn"
      :can-dialog="canDialog"
    />
    <div
      v-if="showBtn"
      class="btn"
    >
      <v-btn
        :class="bInfo.class"
        :text="bInfo.name"
        @click.native="goNext(bInfo.class)"
      />
    </div>
    <div
      v-if="isPaySource"
      class="payBtn"
    >
      <span @click="pay('cancel')">取消挂号</span>
      <span @click="pay('go')">去支付100元</span>
    </div>
  </v-page>
</template>
<script>
import VBtn from '@/components/VBtn'
import OrderDetail from './components/OrderDetail'
import { cancelOrder } from '@/api/common'
export default {
  components: {
    OrderDetail,
    VBtn
  },
  data () {
    return {
      name: 1,
      height: '0',
      bInfo: '',
      isPaySource: false,
      canCancel: '',
      showBtn: false,
      canDialog: false // 确认预约页进来，且是，新医院，可以弹窗
    }
  },
  computed: {
    fromPage () {
      return this.$route.params.fromPage
    },
    orderId () {
      return this.$route.params.orderId
    },
    hosCode () {
      return this.$route.params.hosCode
    }
  },
  mounted () {
    if (this.fromPage !== 'order') {
      this.canDialog = true
      this.bInfo = {
        name: '回首页',
        class: 'default'
      }
    } else {
      this.bInfo = {
        name: '取消挂号',
        class: 'cancel'
      }
    }
    this.getListHeight()
  },
  methods: {
    getListHeight () {
      this.height = (window.innerHeigh - 100) + 'px'
    },
    goNext (val) {
      if (val === 'default') {
        this.$router.push('/')
      } else {
        this.$dialog.confirm({
          message: '您确认要取消预约吗？',
          closeOnPopstate: true // 按返回按钮时弹出关闭
        }).then(res => {
          cancelOrder({ hosCode: this.hosCode, orderNo: this.orderId }).then(res => {
            this.$toast.success('取消成功')
            // 刷新订单信息，返回顶部
            this.$refs.orderDetail.getOrder()
            document.getElementsByClassName('content-container')[0].scrollTop = 0
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    pay (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  @import '~@/assests/styles/common.less';
.department{
  font-size: 1;
  .btn{
    padding: 60px 0 60px;
  }
  .payBtn{
    height: 90px;
    display: flex;
    justify-content: space-between;
    span:nth-child(1){
      width: 230px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 26px;
      color: #999999;
      /* border-top: 1px solid #eee; */
      .border-top(#eee);
    }
    span:nth-child(2){
      width: 520px;
      height: 90px;
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      background: #5386FF;
      color: #fff;
    }
  }
}
</style>
