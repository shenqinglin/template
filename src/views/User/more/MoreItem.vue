<template>
  <div
    class="more-item-wrap"
    @touchend="onMoreItemClick(item)"
  >
    <div class="label">
      {{ item.label }}
    </div>
    <div class="icon">
      <v-icon
        name="right"
        class="icon-right"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: _ => {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    onMoreItemClick (item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .more-item-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    line-height: 100px;
    .label {
      font-size: 28px;
      color:#333;
    }
    .icon-right {
      font-size: 26px;
      color:#999;
    }

  }
</style>
