<template>
  <div class="s-grid">
    <slot />
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.s-grid{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
