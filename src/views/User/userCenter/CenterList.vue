<template>
  <div
    class="more-item"
    @click="onMoreClick"
  >
    <div class="left-tip">
      <v-icon
        :name="obj.icon"
        class="more-left-icon"
      />
      <span class="label">{{ obj.label }}</span>
    </div>
    <div class="right-arrow">
      <slot class="diy-slot" />
      <v-icon
        name="right"
        class="more-right-icon"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: _ => ({})
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onMoreClick () {
      console.log(this.obj)
      const query = this.obj.query
      const path = this.obj.route
      const route = {
        path
      }
      if (query) {
        route.query = query
      }
      this.$router.push(route)
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .more-item {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#333;
    .left-tip {
      .more-left-icon {
        font-size: 34px;
      }
      .label {
        display: inline-block;
        font-size: 28px;
        margin-left: 20px;
        height: 40px;
      }
    }
    .more-right-icon {
      font-size: 26px;
      color: #999999;
    }
    .right-arrow,.left-tip {
      display: flex;
      align-items: center;
    }
  }
</style>
