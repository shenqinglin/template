<template>
  <div
    class="personnel"
  >
    <div class="select_personnel">
      <p v-if="getStatus===1">
        <span>{{ patientInfo.patientName }}</span>
        <span>{{ patientInfo.patientIdTypeText }}<i>{{ patientInfo.patientIdNoText }}</i></span>
      </p>
      <p v-if="getStatus!==1">
        <span>{{ text[`${getStatus}`] }}</span>
      </p>
      <v-icon
        v-if="getStatus!==1"
        name="right"
      />
      <m-icon
        v-if="getStatus===1&&select"
        name="replace"
        desc="更换就诊人"
      />
    </div>
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
export default {
  components: {
    MIcon
  },
  props: {
    patientInfo: {
      type: Object,
      default: () => {}
    },
    getStatus: { // 1是选中有值状态，0是添加就诊人状态，2是选择就诊人状态
      type: Number,
      default: 0
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      text: ['添加就诊人', '选中', '选择就诊人']
    }
  }
}
</script>
<style lang="less">
.personnel{
  padding: 10px 30px 20px;
  .select_personnel{
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: 140px;
    padding: 0 40px;
    border-radius:20px;
    background: #fff;
    p{
      span{
        font-size: 24px;
        display: block;
        i{
          margin-left: 10px;
          font-style: normal;
        }
      }
      span:nth-child(1){
        color: #333333;
        font-size: 28px;
        font-weight: bold;
      }
      span:nth-child(2){
        margin-top: 12px;
      }
    }
    .m-icon{
      position: absolute;
      top: 0;
      right: 0;
      width:190px;
      height:44px;
      line-height: 44px;
      color: #5386FF;
      background: #F1F6FF;
      border: 1px solid #AFCCFF;
      border-radius:0px 20px 0px 20px;
      text-align: center;
    }
  }
}
</style>
