<template>
  <div class="footer-tip">
    <span class="left tip">北京市卫生健康委员会</span>
    <span class="center tip" />
    <span class="right tip">北京市预约挂号统一平台</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .footer-tip {
        margin-top: 62px;
        font-size: 20px;
        text-align: center;
        .tip {
          display: inline-block;
          vertical-align: middle;
        }
        .center {
          height: 28px;
          width: 1PX;
          background-color: #fff;
          border: none;
          margin: 0 20px;
        }
      }
</style>
