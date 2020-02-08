<template>
  <div
    :class="classObj"
  >
    <slot />
    <label-line
      v-for="(item,index) in soureList"
      :key="index"
      :label="item.name"
      :info="item.value"
      :blod="item.blod"
      :duty-img-url="item.dutyImgUrl"
    />
  </div>
</template>
<script>
import LabelLine from '@/components/LabelLine'
export default {
  components: {
    LabelLine
  },
  props: {
    soureList: {
      type: Array,
      default: () => []
    },
    hasBorder: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObj () {
      return {
        'source-info': true,
        'border': this.hasBorder
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.source-info{
  margin: 0 30px;
  padding: 30px 0;
  &.border{
    .border-bottom;
  }
  b{
    display: block;
    font-size: 26px;
    margin-bottom: 20px;
  }
}
</style>
