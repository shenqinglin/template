<template>
  <div
    v-if="info"
    class="label-line"
  >
    <label>{{ label }}</label>
    <span
      v-if="dutyImgUrl"
      :class="blod ? 'blod' : '' "
    >
      <magic-number
        :url="dutyImgUrl"
        :value="info"
      />
    </span>
    <span
      v-if="!dutyImgUrl"
      :class="blod ? 'blod' : '' "
    >{{ info }}</span>
  </div>
</template>
<script>
import MagicNumber from '@/components/MagicNumber'
export default {
  components: {
    MagicNumber
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    info: {
      type: [String, Number],
      default: ''
    },
    blod: {
      type: Boolean,
      default: false
    },
    dutyImgUrl: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.label-line{
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  font-size: 26px;
  label{
    width: 210px;
    color: #999999;
  }
  span{
    width: 480px;
    color: #333333;
    word-break: break-word;
    &.blod{
      font-weight: bold;
      font-size: 34px;
      line-height: 40px;
    }
  }
  &:last-child{
    margin-bottom: 0;
  }
}
</style>
