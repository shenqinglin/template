<template>
  <div
    class="one-item"
    :class="ifMid"
    @click="onItemClick"
  >
    <div class="icon">
      <img :src="obj.icon">
    </div>
    <div class="desc">
      {{ obj.label }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    obj: {
      type: Object,
      default: _ => ({})
    },
    authStatus: {
      type: String,
      default: ''
    },
    statusInfoShow: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ifMid () {
      return this.obj.route === '/user/patient' ? 'mid' : ''
    }
  },
  methods: {
    onItemClick () {
      if (this.authStatus && this.obj.route === '/user/auth') {
        this.$emit('statusInfoShow', true)
      } else {
        this.$router.push(this.obj.route)
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .one-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .desc {
      margin-top: 20px;
      color: #666;
      font-size: 24px;
    }
    .icon {
      width: 62px;
      height: 62px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
