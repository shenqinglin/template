<!-- 解决历史就诊人与就诊人卡片左侧 -->
<template>
  <div class="left">
    <div class="name">
      {{ name }}
    </div>
    <div class="card-info">
      <div class="card-type">
        {{ idType }}
      </div>
      <div class="card-number">
        {{ idNo }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  .left{
    .name {
      font-size: 28px;
      color:#333;
      font-weight:600;
    }
    .card-info {
      margin-top: 15px;
      display: flex;
      align-items: baseline;
      font-size: 24px;
      color:#999;
      font-weight:400;
      .card-number {
        margin-left: 10px;
      }
    }
  }
</style>
