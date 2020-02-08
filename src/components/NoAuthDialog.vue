<template>
  <div />
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    redirect: {
      type: String,
      default: ''
    },
    cancelPath: { // 点击取消功能按钮时跳转的路径，如果未传，则只是关掉当前dialog
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  watch: {
    visible (val) {
      if (val === true) {
        const { message, redirect } = this
        this.$dialog.confirm({
          title: '',
          message,
          confirmButtonText: '去实名',
          confirmButtonColor: '#5386FF',
          cancelButtonText: '跳过',
          cancelButtonColor: '#999999',
          closeOnPopstate: true // 按返回按钮时弹出关闭
        }).then(_ => {
          this.$router.push({
            name: 'auth',
            query: {
              redirect
            }
          })
          // this.visible = false
          this.$emit('update:visible,false')
        }).catch(_ => {
          this.$emit('update:visible', false)
          if (this.cancelPath) {
            this.$router.push(this.cancelPath)
          }
        })
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>

</style>
