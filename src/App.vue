<template>
  <div id="app">
    test
  </div>
</template>

<script>
import { isWechat } from '@/utils'

export default {
  mounted () {
    if (isWechat() && process.env.CURRENT_ENV !== 'dev') {
      Request.get('/wx/wechat/config').then((data) => {
        console.log(data)
      })
    }
  }
}
</script>

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
  background: #fff;
}
.grey{
  color: #ccc;
  font-weight: 400;
}
</style>
