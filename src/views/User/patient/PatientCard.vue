<template>
  <div
    class="patient-card-wrap"
  >
    <div class="inner-wrap">
      <card-left
        :name="name"
        :id-type="idTypeText"
        :id-no="idNoText"
      />
      <div class="right">
        <v-icon
          name="right"
          class="right-icon"
        />
      </div>
    </div>
    <div
      v-if="patientStatus === 'wait_bind'"
      class="to-active"
    >
      <div class="active-tip">
        就诊人被多个用户绑定 需要激活
      </div>
      <card-btn
        text="激活"
        @click="onActive"
      />
    </div>
  </div>
</template>

<script>
import CardBtn from '@/components/CardBtn'
import CardLeft from '@/components/CardLeft'
import { activePatient } from '@/api/user'
export default {
  components: {
    CardBtn, CardLeft
  },
  props: {
    patientStatus: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    idType: {
      type: String,
      default: ''
    },
    idTypeText: {
      type: String,
      default: ''
    },
    idNo: { // 证件号全部，没有*，用于请求接口
      type: String,
      default: ''
    },
    idNoText: { // 用于显示隐藏的证件号
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onActive (ev) {
      ev.stopPropagation()
      const vm = this
      const { idNo, idType } = vm
      activePatient({ idNo, idType }).then(data => {
        vm.$toast({
          message: '激活成功',
          onClose () {
            vm.$emit('activeSuccess')
          }
        })
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
@import '~@/assests/styles/common.less';
  .patient-card-wrap {
    padding: 26px 26px 0 40px;
    border-radius:20px;
    background-color: #ffffff;
    width: 690px;
    box-sizing: border-box;
    margin-top: 30px;

    .inner-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 26px;
    }

    .right-icon {
      color: #999;
      font-size: 26px;
    }
    .to-active {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 73px;
      /* border-top: 1px solid #EEEEEE; */
      .border-top(#eee);
      width: 610px;
      margin: 0 auto;
      .active-tip {
        font-size: 22px;
        color:#FF5F5F;
      }

    }
  }
</style>
