<template>
  <div class="v-page">
    <div class="content-container">
      <mobile-header
        v-if="showBlueHead"
      />
      <slot />
      <transition-view />
    </div>
  </div>
</template>

<script>
import router from '@/router'
import { isWechat } from '@/utils'
import TransitionView from '../TransitionView'
import MobileHeader from '../MobileHeader'

export default {
  name: 'VPage',
  components: {
    TransitionView, MobileHeader
  },
  props: {
    showHeader: {
      type: Boolean,
      default: !isWechat()
    },
    showBlueHead: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    leftEvent: {
      type: Function,
      default: function () {
        router.back()
      }
    },
    leftText: {
      type: String,
      default: '返回'
    }
  }
}
</script>

<style lang="less" scoped>
.v-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 99;
  .header-wrapper {
    height: 44px;
  }
  .content-container {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

</style>
