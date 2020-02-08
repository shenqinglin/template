<template>
  <v-page
    class="payment"
    :show-header="false"
  >
    <pay-detail />
    <div
      v-if="isPaySource"
      class="payBtn"
      @click="pay('go')"
    >
      去支付 480.00 元
    </div>
  </v-page>
</template>
<script>
import PayDetail from './components/PayDetail'
import { cancelOrder } from '@/api/common'
export default {
  components: {
    PayDetail
  },
  data () {
    return {
      name: 1,
      height: '0',
      bInfo: '',
      isPaySource: true
    }
  },
  computed: {
    fromPage () {
      return this.$route.params.fromPage
    },
    orderId () {
      return this.$route.params.orderId
    }
  },
  mounted () {
    if (this.fromPage !== 'order') {
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
      console.log(val)
      if (val === 'default') {
        this.$router.push('/')
      } else {
        cancelOrder(this.orderId).then(res => {
          this.$router.push('/' + this.fromPage)
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
.payment{
  .payBtn{
    height: 90px;
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 32px;
    background: #5386FF;
    color: #fff;
  }
}
</style>
