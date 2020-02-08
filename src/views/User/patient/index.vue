<template>
  <v-page
    class="home patient-outer-wrap"
    :show-header="false"
  >
    <div class="patient-wrap">
      <div class="patient-head-tip">
        <head-tip
          text="就诊人"
          :more-tip="moreTip"
          type="large"
        />
        <div
          v-if="existsHistory"
          class="history-patient"
          @touchend="onHistory"
        >
          查看历史就诊人
        </div>
      </div>
      <div class="patient-list">
        <patient-card
          v-for=" item in items"
          :key="item.patientId"
          :name="item.patientName"
          :id-type="item.patientIdType"
          :id-type-text="item.patientIdTypeText"
          :id-no="item.patientIdNo"
          :id-no-text="item.patientIdNoText"
          :patient-status="item.patientStatus"
          @click.native="onCardClick(item)"
          @activeSuccess="getPatients"
        />
      </div>
      <div
        v-if="showAdd"
        class="add-patient"
      >
        <v-icon
          class="add-icon"
          name="add"
        />
        <span
          class="add-text"
          @click="onAddPatient"
        >添加就诊人</span>
      </div>
    </div>
    <no-auth-dialog
      :visible.sync="noAuthVisible"
      message="实名认证后才可添加就诊人"
      redirect="/user/patient/addPatient"
    />
  </v-page>
</template>

<script>
import PatientCard from './PatientCard'
import { patientNumber } from '@/constants'
import { patientList, authStatus } from '@/api/user'
import HeadTip from '@/components/HeadTip'
import NoAuthDialog from '@/components/NoAuthDialog'
export default {
  components: {
    PatientCard,
    NoAuthDialog,
    HeadTip
  },
  data () {
    return {
      showAdd: false,
      items: [], // 就诊人列表
      existsHistory: false, // 是否有就诊人
      patientNumber: Object.freeze(patientNumber),
      noAuthVisible: false // 是否已经实名认证，未实名认证先弹窗
    }
  },
  computed: {
    moreTip () {
      return `最多${patientNumber}人`
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (from.name === 'patientDetail' || from.name === 'addPatient' || from.name === 'history') {
      this.getPatients()
    }
    next()
  },
  mounted () {
    this.getPatients()
  },
  methods: {
    onCardClick (obj) {
      const { patientIdType, patientIdNo } = obj
      this.$router.push({
        name: 'patientDetail',
        params: {
          idType: patientIdType,
          idNo: patientIdNo
        }
      })
    },
    onAddPatient () {
      authStatus().then(data => {
        if (data.status === 'OK') {
          this.$router.push({
            name: 'addPatient'
          })
        } else {
          this.noAuthVisible = true
        }
      })
    },
    getPatients () { // 获取就诊人列表
      patientList('USER_CENTER').then(data => {
        this.items = data.list
        this.existsHistory = data.existsHistory
        if (this.items.length < patientNumber) {
          this.showAdd = true
        } else {
          this.showAdd = false
        }
      })
    },
    onHistory () {
      this.$router.push({
        name: 'history'
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .patient-outer-wrap.v-page {
    background-color: #F6F6F6;
  }
  .patient-wrap {
    margin: 0 30px;
    .patient-head-tip {
      margin-top: 30px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      /deep/.head-tip {
        padding-left: 0;
      }
      .history-patient {
        color: #6596F4;
        font-size: 24px;
        display: inline-block;
      }
    }
    .patient-list {
      margin-top: 30px;
    }
    .add-patient {
      margin-top: 140px;
      text-align: center;
      .add-icon {
        font-size: 20px;
        color:#333;
      }
      .add-text {
        font-size: 28px;
        color: #333;
        margin-left: 10px;
      }
    }
  }
</style>
