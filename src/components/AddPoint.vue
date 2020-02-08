<template>
  <div
    class="insert-point"
    @touchend="onAddPointClick"
  >
    <span>如果姓名中含有特殊符号 “ · ”，</span>
    <span
      class="point-btn"
    >
      请点此添加
    </span>
  </div>
</template>

<script>
export default {
  name: 'AddPoint',
  data () {
    return {
    }
  },
  methods: {
    onAddPointClick (ev) {
      ev.preventDefault()
      ev.stopPropagation()
      this.$emit('click')
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .insert-point {
    margin-right: 30px;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    border-radius: 10px;
    text-align: center;
    border: none;
    background-color: #F9F9F9;
    color: #CCCCCC;
    .point-btn {
      color: #6596F4;
    }
  }
</style>
