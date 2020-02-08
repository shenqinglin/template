<template>
  <div class="one-pixel" />
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .one-pixel {
    width: 100%;
    height: 1PX;
    border: none;
    background-color: #eee;
    position: absolute;
    bottom: 0;
    transform: scaleY(0.5);
    margin:0 auto;
  }
</style>
