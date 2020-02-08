<template>
  <div :class="classObj">
    <div>
      <span>{{ text }}</span>
      <span
        v-if="moreTip"
        class="more-tip"
        :style="moreStyle"
      >({{ moreTip }})</span>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>

/*
  1、默认主标题：就诊人信息
  2、支持主标题后说明行文案moreTip
  3、主标题说明性文案默认颜色#bbb，可配置moreColor
  4、支持slot，slot内容会被排到最右边
 */

export default {
  props: {
    text: {
      type: String,
      default: '就诊人信息'
    },
    moreTip: { //  主标题后说明行文案
      type: String,
      default: ''
    },
    moreStyle: { // 主标题后说明行文案颜色，有默认值#bbb
      type: Object,
      default: _ => ({})
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    classObj () {
      return {
        'head-tip': true,
        'large': this.type === 'large'
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .head-tip {
    height: 60px;
    line-height: 60px;
    color: #666666;
    font-size: 24px;
    padding-left: 30px;
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    background-color: #F6F6F6;
    &.large {
      height: 80px;
      line-height: 80px;
    }
  }
  .more-tip {
    margin-left: 10px;
    display: inline-block;
    color: #BBBBBB;
  }
</style>
