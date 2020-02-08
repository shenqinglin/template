<!-- 就诊人基本信息卡片 -->
<template>
  <div class="patient-card">
    <card-left
      :name="name"
      :id-type="idType"
      :id-no="idNo"
    />
  </div>
</template>
<script>
import CardLeft from '@/components/CardLeft.vue'
export default {
  components: {
    CardLeft
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    idType: {
      type: String,
      default: ''
    },
    idNo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .patient-card {
    width: 660px;
    padding: 26px 0 26px 40px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06)
  }
</style>
