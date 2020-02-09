<template>
  <div
    class="content-container"
    :class="{
      small: type === 'small'
    }"
  >
    <div class="title-wrapper">
      <div class="title">
        <slot name="title" />
      </div>
      <div
        v-if="multiple"
        class="desc"
      >
        多选
      </div>
    </div>
    <div class="line" />

    <slot />
  </div>
</template>

<script>

export default {
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'large'
    }
  }
}
</script>

<style lang="less" scoped>
.content-container {
  height: 870px;
  background: rgba(255,255,255,1);
  box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.2),0px 1px 10px 0px rgba(159,217,255,1);
  border-radius: 20px;
  padding: 44px 50px 0px;
  &.small {
    height: 600px;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 36px;
    font-weight: 500;
    color:rgba(51,51,51,1);
  }

  .desc {
    margin-left: 13px;
    font-size: 24px;
    font-weight:400;
    color:rgba(204,204,204,1);
  }

  .line {
    width: 100px;
    height: 2px;
    background:rgba(83,185,245,1);
    border-radius:4px;
    opacity:0.4;
    margin-top: 20px;
    margin-bottom: 30px;
  }
}

</style>
