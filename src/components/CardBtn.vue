<!-- 完成就诊人卡片按钮 -->
<template>
  <div
    class="card-btn"
    @click="$emit('click',$event)"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
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
  .card-btn {
    width: 140px;
    height: 44px;
    line-height: 44px;
    border: 1PX solid #333333;
    border-radius: 44px;
    text-align: center;
    font-size: 24px;
    color: #333;
  }
</style>
