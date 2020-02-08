<template>
  <div class="person-select">
    <div
      class="showPatient"
      @click="selectPatient"
    >
      <patient-list
        :select="true"
        :get-status="setStatus"
        :patient-info="patientInfo"
      />
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
          @click.native="patientConfirm(item)"
        />
        <p
          v-if="isPaySource"
          class="tips"
        >
          <m-icon
            name="tip"
            desc="因医院系统升级，未录入北京社保卡号的就诊人挂号，无法进行医保报销。如需医保挂号请点击【添加就诊人】添加医保就诊人信息"
          />
        </p>
        <p v-if="personList.length<4">
          <m-icon
            name="add"
            desc="添加就诊人"
            @click.native="addPatient"
          />
        </p>
      </div>
    </van-popup>
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
import PatientList from './PatientList'
export default {
  components: {
    PatientList,
    MIcon
  },
  props: {
    personList: {
      type: Array,
      default: () => []
    },
    changePatient: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      length: 0, // 就诊人数量
      patientInfo: {}, // 选中就诊人信息
      show: false,
      isPaySource: false,
      setStatus: 0 // 根据就诊人数量，更改传入状态
    }
  },
  watch: {
    personList: {
      handler (val) {
        const length = val.length
        this.setStatus = length < 2 ? length : 2
        this.patientInfo = length === 1 ? val[0] : {}
        if (length === 1) {
          this.$emit('changePatient', this.patientInfo)
        }
      },
      deep: true
    }
  },
  methods: {
    selectPatient (val) {
      this.show = true
    },
    patientConfirm (val) {
      this.setStatus = 1
      this.show = false
      this.patientInfo = val
      this.$emit('changePatient', this.patientInfo)
    },
    addPatient () {
      this.$router.push({
        name: 'addPatient',
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    closeBtn () {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
.showPatient{
  background: #AFCCFF;
}
.list{
  background: #F6F6F6;
  h3{
    padding: 22px 0 30px;
    font-size: 30px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }
  p{
    padding: 30px 0 60px;
    color: #333333;
    font-size: 28px;
    text-align: center;
  }
  .tips{
    padding: 0 30px;
    text-align: inherit;
    /deep/.m-icon{
      color: #FF5F5F;
      .desc{
        width: 650px;
      }
    }
  }
  /deep/.van-popup{
    background: #F6F6F6;
  }
}
</style>
