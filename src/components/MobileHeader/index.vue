<template>
  <div class="header">
    {{ title }}
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '北京114预约挂号平台'
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background:rgba(175, 204, 255, 1);
  font-size: 24px;
  color: #fff;
}
</style>
