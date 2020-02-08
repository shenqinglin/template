<template>
  <div class="m-button">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.m-button{
  width: 690px;
  height: 80px;
  line-height: 80px;
  color: #fff;
  background: #5386FF;
  border-radius: 40px;
  text-align: center;
  font-size: 32px;
  &.cancel{
    color: #5386FF;
    background: #fff;
    border: 1PX solid #5386FF;
  }
}
</style>
