/* eslint-disable vue/no-v-html */
<template>
  <span
    class="v-icon iconfont"
    v-html="iconCode"
  />
</template>

<script>
import ICON from '@/constants/icon'

export default {
  name: 'VIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconCode () {
      return ICON[this.name]
    }
  }
}
</script>
