<template>
  <div class="hyde-btn">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'VBtn',
  props: {
    text: {
      type: String,
      default: '提交'
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .hyde-btn {
    width: 690px;
    height: 80px;
    line-height: 80px;
    border-radius: 80px;
    text-align: center;
    color: #ffffff;
    font-size: 32px;
    background-color: #5386FF;
    margin: 0 auto;
    box-shadow:0px 6px 30px 0px rgba(73,144,241,0.4);
    &.disable {
      background-color: #e5e5e5;
      box-shadow:none;
    }
    &.cancel{
      color: #5386FF;
      background: #fff;
      border: 1PX solid #5386FF;
      box-shadow: none;
    }
  }
</style>
