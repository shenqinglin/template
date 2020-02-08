<template>
  <v-page
    class="order"
    :show-header="false"
  >
    <div class="headers">
      <div class="patientList">
        <span @click="openPatient">当前就诊人<m-icon
          name="open"
          :desc="this.default.patientName"
          :icon-liftshow="false"
        /></span>
        <span class="tips">仅提供查询近180天订单</span>
      </div>
    </div>
    <div class="orderList">
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <order-item
          v-for="(item,index) in orderList"
          :key="index"
          :item="item"
        />
        <no-search-result v-if="orderList.length === 0 && finished === true && isNone" />
      </van-list>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
    >
      <v-icon
        class="closeBtn"
        name="close"
        @click.native="closeBtn"
      />
      <div class="list">
        <h3>选择就诊人</h3>
        <patient-list
          v-for="(item,index) in personList"
          :key="index"
          :get-status="1"
          :patient-info="item"
          @touchend.native="patientConfirm(item)"
        />
      </div>
    </van-popup>
  </v-page>
</template>
<script>
import MIcon from '@/components/MIcon'
import OrderItem from './components/OrderItem'
import PatientList from '@/views/HosConfirm/components/PatientList'
import NoSearchResult from '@/components/NoSearchResult'
import { orderPatientList, orderList } from '@/api/common'
export default {
  components: {
    MIcon,
    OrderItem,
    PatientList,
    NoSearchResult
  },
  data () {
    return {
      default: {},
      personList: [],
      orderList: [],
      show: false,
      loading: false,
      finished: true,
      params: {
        pageNo: 1,
        pageSize: 10,
        patientId: ''
      },
      isNone: false
    }
  },
  mounted () {
    this.getPatient()
  },
  methods: {
    getPatient () {
      orderPatientList('USER_CENTER').then(res => {
        const patient = res.list[0]
        this.default = patient
        this.personList = res.list
        this.params.patientId = patient.patientId
        this.getOrderList()
      })
    },
    openPatient () {
      this.show = true
    },
    patientConfirm (val) {
      this.show = false
      this.default = val
      this.orderList = []
      this.params.patientId = val.patientId
      this.getOrderList()
    },
    getOrderList () {
      orderList(this.params).then(res => {
        this.isNone = true
        // this.orderList = this.orderList.concat(res.result)
        // this.loading = false
        // console.log(res.currentPage >= res.totalPage, this.finished)
        // if (res.currentPage >= res.totalPage) {
        //   this.finished = true
        // } else {
        //   this.finished = false
        // }
      })
    },
    onLoad () {
      this.params.pageNo += 1
      this.getOrderList()
    },
    closeBtn () {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.order{
  // .headers{
  //   position: fixed;
  //   width: 100%;
  // }
  /deep/.van-list{
    .van-list__finished-text{
      height: 80px;
      line-height: 80px;
      font-size: 24px;
    }
  }
  .orderList{
    height: calc(100% - 124px);
    overflow-y: auto;
  }
  .patientList{
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    background: #fff;
    span{
      color: #999999;
      font-size: 28px;
      &.m-icon{
        margin-left: 10px;
        color: #5386FF;
      }
      /deep/.v-icon{
        color: #ccc;
      }
    }
    .tips{
      font-size: 22px;
      color: #DDDDDD;
    }
  }
  .list{
    padding: 22px 30px 30px;
    background: #F6F6F6;
    h3{
      text-align: center;
      color: #333333;
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }
}
</style>
