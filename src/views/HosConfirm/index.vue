<template>
  <v-page
    class="order-detail"
    :show-header="false"
  >
    <person-select
      :person-list="patientList"
      @changePatient="changePatient"
    />
    <order-info
      :is-pay-source="isPaySource"
      @checkHosCard="checkHosCard"
      @hasLink="hasLink"
      @dutySourceId="getDutySource"
    />
    <div
      v-if="!isPaySource"
      class="patient-info"
    >
      <head-tip
        v-if="!showPatientInfo"
        text="就诊人信息"
      />
      <van-cell-group v-if="!showPatientInfo">
        <div
          v-if="showCardItem.medicareCardId!==2"
          class="list border-bottom"
        >
          <van-field
            v-model="formParams.medicareCardId"
            clearable
            label="北京社保卡"
            placeholder="请输入医保卡"
            maxlength="12"
            @input="clearMedicareCardIdBlank"
          >
            <p v-if="showCardItem.medicareCardIdTip">
              {{ showCardItem.medicareCardIdTip }}
            </p>
          </van-field>
        </div>
        <div
          v-if="showCardItem.jytCardId!==2"
          class="list border-bottom"
        >
          <van-field
            v-model="formParams.jytCardId"
            clearable
            label="京医通卡"
            placeholder="请填写98开头的京医通卡号"
            maxlength="14"
            @input="clearJytCardIdBlank"
          />
          <p v-if="showCardItem.jytCardIdTip">
            {{ showCardItem.jytCardIdTip }}
          </p>
        </div>
        <div
          v-if="showCardItem.hospitalCardId!==2"
          class="list border-bottom"
        >
          <van-field
            v-model="formParams.hospitalCardId"
            clearable
            label="院内就诊卡"
            :disabled="showCyPatientCard"
            placeholder="如曾在本院就诊，请填写"
            maxlength="26"
            @input="clearHospitalCardBlank"
          />
          <p v-if="showCardItem.hospitalCardIdTip">
            {{ showCardItem.hospitalCardIdTip }}
          </p>
        </div>
        <div class="list border-bottom">
          <van-field
            v-model.trim="formParams.mobileNo"
            clearable
            required
            label="就诊人手机号"
            placeholder="请填写就诊人手机号"
            maxlength="11"
            border
            :disabled="checkPhoneEdit"
          />
        </div>
        <div class="list">
          <van-field
            v-model.trim="formParams.smsCode"
            clearable
            required
            label="短信验证码"
            placeholder="请输入短信验证码"
            maxlength="6"
          >
            <countdown
              slot="button"
              ref="countdown"
              size="small"
              type="primary"
              :mobile="formParams.mobileNo"
              sms-key="ORDER_CODE"
              :duty-source-id="dutySourceId"
            />
          </van-field>
        </div>
      </van-cell-group>
    </div>
    <hospital-rules
      v-if="!link"
      :is-pay-source="isPaySource"
    />
    <div
      v-if="link&&loaded"
      class="readMe"
    >
      <notice-list
        title="挂号须知，请务必阅读"
        :no-blod="true"
        @click.native="goLink"
      />
    </div>
    <div class="bgColor">
      <v-btn
        text="确认挂号"
        @click.native="preCheck"
      />
    </div>
  </v-page>
</template>
<script>
import NoticeList from '@/components/NoticeList'
import HospitalRules from '@/components/HospitalRule'
import VBtn from '@/components/VBtn'
import OrderInfo from './components/OrderInfo'
import PersonSelect from './components/PersonSelect'
import HeadTip from '@/components/HeadTip'
import Countdown from '@/components/Countdown'
import { orderPatientList, saveOrder, preSaveCheck, getHospitalCard, fetchOrderStatus } from '@/api/common'
import { validator } from '@/constants/rules'
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
  components: {
    HospitalRules,
    VBtn,
    OrderInfo,
    PersonSelect,
    HeadTip,
    Countdown,
    NoticeList
  },
  data () {
    return {
      patientList: [],
      formParams: {
        medicareCardId: '', // 北京社保卡
        jytCardId: '', // 京医通卡
        hospitalCardId: '', // 院内就诊卡
        mobileNo: '', // 手机号
        smsCode: ''
      },
      patientInfo: {},
      checkPhoneEdit: false,
      isPaySource: false, // 是不是支付订单
      showCyPatientCard: false,
      link: '', // 新医院预约须知链接
      patientId: '', // 当前就诊人id
      hasCodeCard: false,
      dutySourceId: '',
      sendStatus: 'INIT',
      showCountdown: true,
      loaded: false
    }
  },
  computed: {
    ...mapState('confirm', ['showCardItem']),
    showPatientInfo () {
      // showCardItem中，状态1，选填，状态2，不展示，状态4，必填
      return this.showCardItem.hospitalCardId === 2 && this.showCardItem.jytCardId === 2 && this.showCardItem.medicareCardId === 2 && this.showCardItem.smsCode === 2
    }
  },
  watch: {
    patientId (val) {
      if (val && this.hasCodeCard) {
        this.getHosCard(val)
      }
    },
    hasCodeCard (val) {
      if (val && this.patientId) {
        this.getHosCard(this.patientId)
      }
    }
  },
  beforeDestroy () {
    clearInterval(window.timer)
    if (this.loading) {
      this.loading.clear()
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  created () {
    this.getPatientList()
  },
  methods: {
    getPatientList () {
      // 获取就诊人列表
      orderPatientList('ORDER_CONFIRM').then(res => {
        this.patientList = res.list
      })
    },
    preCheck () {
      const { hosCode, firstDeptCode, secondDeptCode, target, uniqProductKey, dutyTime } = this.$route.params
      if (!this.patientId) {
        this.$toast('请选择就诊人')
        return false
      }
      const valid = this.validData(this.formParams)
      if (valid) {
        preSaveCheck({
          hosCode,
          firstDeptCode: firstDeptCode === '0' ? '' : firstDeptCode,
          secondDeptCode,
          treatmentDay: target,
          uniqProductKey: uniqProductKey,
          dutyTime,
          ...this.formParams
        }).then(res => {
          if (res.state === 'OK') {
            this.confirm()
          } else if (res.state === 'TO_SUPPLY') {
            this.$dialog({
              message: res.msg,
              confirmButtonText: '去补充',
              closeOnPopstate: true // 按返回按钮时弹出关闭
            }).then(() => {
              this.$router.push({
                name: 'patientDetail',
                params: {
                  idType: this.patientInfo.patientIdType,
                  idNo: this.patientInfo.patientIdNo
                },
                query: {
                  redirect: encodeURIComponent(this.$route.fullPath)
                }
              })
            })
          } else if (res.state === 'To_AUTH') {
            this.$dialog({
              message: res.msg,
              confirmButtonText: '去实名',
              closeOnPopstate: true // 按返回按钮时弹出关闭
            }).then(() => {
              this.$router.push({
                name: 'auth',
                query: {
                  redirect: encodeURIComponent(this.$route.fullPath)
                }
              })
            })
          } else if (res.state === 'ALERT') {
            this.$dialog({
              message: res.msg,
              confirmButtonText: '我知道了',
              closeOnPopstate: true // 按返回按钮时弹出关闭
            })
          }
        })
      }
    },
    confirm () {
      const { hosCode, firstDeptCode, secondDeptCode, target, uniqProductKey, dutyTime } = this.$route.params
      saveOrder({
        hosCode,
        firstDeptCode: firstDeptCode === '0' ? '' : firstDeptCode,
        secondDeptCode,
        treatmentDay: target,
        uniqProductKey: uniqProductKey,
        dutyTime,
        ...this.formParams
      }).then(res => {
        if (!res.lineup) {
          this.$router.replace({
            name: 'OrderDetail',
            params: {
              hosCode: hosCode,
              orderId: res.orderNo,
              fromPage: 'confirm'
            }
          })
        } else {
          this.loadOrderStatus(res.orderNo)
          this.loopFetchOrderStatus(res.orderNo)
        }
      })
    },
    loopFetchOrderStatus (orderId) {
      window.timer = setInterval(() => {
        this.loadOrderStatus(orderId)
      }, 5000)
    },
    loadOrderStatus (orderId) {
      fetchOrderStatus(orderId).then((data) => {
        if (data.lineup && data.lineupCode === 0) {
          if (this.loading) {
            return
          }
          this.loading = Toast.loading({
            message: data.lineupMsg,
            forbidClick: true,
            duration: 0
          })
        } else {
          clearInterval(window.timer)
          this.loading.clear()
          this.$router.replace({
            name: 'OrderDetail',
            params: {
              hosCode: this.$route.params.hosCode,
              orderId: data.orderId,
              fromPage: 'confirm'
            }
          })
        }
      }).catch((resp) => {
        if (this.loading) {
          this.loading.clear()
        }
        this.loading = Toast.loading({
          message: resp.msg,
          forbidClick: true,
          duration: 0
        })
        setTimeout(() => {
          this.loading.clear()
          this.loading = null
        }, 3000)
        clearInterval(window.timer)
      })
    },
    validData (form) {
      const rules = [
        {
          name: 'checkMedicareCardId',
          val: form.medicareCardId,
          noCheck: true
        },
        {
          name: 'checkJytCardId',
          val: form.jytCardId,
          noCheck: true
        },
        {
          name: 'checkHospitalCardId',
          val: form.hospitalCardId,
          noCheck: true
        },
        {
          name: 'isPhone',
          val: form.mobileNo,
          noCheck: this.showPatientInfo
        },
        {
          name: 'validateCode',
          val: form.smsCode,
          noCheck: this.showPatientInfo
        }
      ]
      const result = validator(rules.filter((item) => {
        return !item.noCheck
      }), this)
      return result
    },
    changePatient (patientInfo) {
      const phone = patientInfo.phone
      if (phone !== '') {
        this.checkPhoneEdit = true
      } else {
        this.checkPhoneEdit = false
        this.$dialog.confirm({
          message: '当前就诊人没有手机号，请补充',
          confirmButtonText: '去补充',
          closeOnPopstate: true // 按返回按钮时弹出关闭
        }).then(() => {
          this.$router.push({
            name: 'patientDetail',
            params: {
              idType: this.patientInfo.patientIdType,
              idNo: this.patientInfo.patientIdNo
            },
            query: {
              redirect: encodeURIComponent(this.$route.fullPath)
            }
          })
        }).catch(err => {
          console.log(err)
        })
      }
      this.formParams.cardType = patientInfo.patientIdType
      this.formParams.cardNo = patientInfo.patientIdNo
      // 当前选中就诊人证件类型和号码
      this.patientInfo.patientIdNo = patientInfo.patientIdNo
      this.patientInfo.patientIdType = patientInfo.patientIdType
      this.formParams.mobileNo = phone
      // 切换就诊卡时，且，就诊人不同时，就诊卡数据及验证码清空
      if (this.patientId !== patientInfo.patientId) {
        this.patientId = patientInfo.patientId
        this.formParams.jytCardId = ''
        this.formParams.hospitalCardId = ''
        this.formParams.medicareCardId = ''
        this.formParams.smsCode = ''
        if (!this.showPatientInfo) {
          this.clearCountdown()
        }
      }
    },
    checkHosCard (val) {
      this.hasCodeCard = val
    },
    getHosCard () {
      getHospitalCard(this.patientId).then(res => {
        this.formParams.hospitalCardId = res
        this.showCyPatientCard = true
      })
    },
    hasLink (val) {
      this.loaded = true
      this.link = val
    },
    goLink () {
      this.$router.push({
        name: 'appointNotice',
        params: {
          hosCode: this.$route.params.hosCode
        }
      })
    },
    getDutySource (val) {
      this.dutySourceId = val
    },
    clearCountdown () {
      this.$refs.countdown.clearCountdown()
    },
    clearMedicareCardIdBlank (val) {
      this.formParams.medicareCardId = val.replace(/\s+/gi, '')
    },
    clearJytCardIdBlank (val) {
      this.formParams.jytCardId = val.replace(/\s+/gi, '')
    },
    clearHospitalCardBlank (val) {
      this.formParams.hospitalCardId = val.replace(/\s+/gi, '')
    }
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assests/styles/common.less';
.order-detail{
  background: #F9F9F9;
  .order-info{
    background: #fff;
  }
  .bgColor{
    padding: 0 0 60px;
  }
  .readMe{
    padding: 20px 0 60px;
    background: #F9F9F9;
    .notice-list{
      background: #fff;
      font-size: 28px;
      margin-left: 0;
      padding-left: 30px;
    }
  }
  /deep/.van-cell-group{
    .van-cell{
      height: 96px;
      padding: 0;
    }
    .list{
      margin-left: 30px;
      .border-bottom
      &:last-child{
        border: none;
        .no-border
      }
      p{
        margin: 0 30px 30px;
        padding: 20px;
        font-size: 22px;
        line-height: 40px;
        letter-spacing: 1px;
        background: #F9F9F9;
        color: #999999;
      }
    }
    .van-field__label{
      width: 250px;
      color: #999999;
      span{
        display: block;
        font-size: 26px;
        height: 95px;
        line-height: 95px;
      }
    }
    .van-cell__value{
      text-align: left;
      color: #5386FF;
    }
    .van-field__button{
      width: 180px;
      padding-top: 4px;
      text-align: right;
      span{
        font-size: 24px;
      }
    }
    input::-webkit-input-placeholder { color: #ddd; }
    .van-field__body{
      width: 440px;
      padding-top: 22px;
      .van-field__control{
        display: block;
        font-size: 26px;
        height: 50px;
        line-height: 50px;
        margin-right: 30px;
        &:disabled{
          color: #333;
          -webkit-text-fill-color: #333;
        }
      }
    }
  }
}
</style>
