<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import TransitionView from '@/components/TransitionView'
// import { getAccreditStatus } from '@/api/login'
// import { NO_NEED_ACCREDIT } from '@/constants'
import { handleIosInput } from '@/utils'
export default {
  components: {
    // TransitionView
  },
  mounted () {
    // const currentUrl = window.location.pathname
    // const noNeedAccredit = Object.freeze(NO_NEED_ACCREDIT)
    // if (noNeedAccredit.indexOf(currentUrl) === -1) {
    //   // 微信授权
    //   getAccreditStatus()
    // }
    // ios input
    handleIosInput()
    // // 禁用IOS橡皮筋效果
    // this.$nextTick(() => {
    //   let startY = 0
    //   document.body.addEventListener('touchstart', (e) => {
    //     startY = e.touches[0].pageY
    //   }, { passive: false })

    //   document.body.addEventListener('touchmove', (e) => {
    //     const scrollBox = document.querySelector('.content-container')
    //     const moveY = e.touches[0].pageY
    //     const top = scrollBox.scrollTop
    //     const ch = scrollBox.clientHeight
    //     const sh = scrollBox.scrollHeight
    //     if (!this.isChildTarget(e.target, scrollBox)) {
    //       e.preventDefault()
    //     } else if ((top === 0 && moveY > startY) || (top + ch === sh && moveY < startY)) {
    //       e.preventDefault()
    //     }
    //   }, { passive: false })
    // })
  },
  methods: {
    isChildTarget (child, parent, justChild = false) {
      // justChild为true则只判断是否为子元素，若为false则判断是否为本身或者子元素 默认为false
      let parentNode
      if (justChild) {
        parentNode = child.parentNode
      } else {
        parentNode = child
      }

      if (child && parent) {
        while (parentNode) {
          if (parent === parentNode) {
            return true
          }
          parentNode = parentNode.parentNode
        }
      }
      return false
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
  background-color: #53b9f5;
}
.grey{
  color: #ccc;
  font-weight: 400;
}
</style>
