<template>
  <div id="app">
    <router-view />
    <div class="footer-tip">
      <span class="left tip">北京市卫生健康委员会</span>
      <span class="center tip" />
      <span class="right tip">北京市预约挂号统一平台</span>
    </div>
  </div>
</template>

<style lang="less">
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';

* {
  margin: 0;
  padding: 0;
}
*:not(i) {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  color: #666;
  height: 100vh;
  background-color: #53b9f5;
}
.grey{
  color: #ccc;
  font-weight: 400;
}

.footer-tip {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin-top: 62px;
  font-size: 20px;
  text-align: center;
  color: #fff;
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
