<template>
  <div
    class="login-input border-bottom"
    @click="inputClick"
  >
    <p class="login-p">
      {{ dataPhone }}
    </p>
    <p
      v-if="showPlaceholder"
      class="login-placeholder"
    >
      {{ placeholder }}
    </p>
    <span class="login-animation" />
    <v-icon
      v-if="searchClear"
      name="clear"
      class="login-clear"
      @click.native="clearInput"
    />
    <van-number-keyboard
      v-model="dataPhone"
      :show="show"
      :maxlength="13"
      :transition="false"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      placeholder: '请输入您的手机号码',
      dataPhone: '',
      btnstyle: false,
      redirect: '',
      show: true,
      showPlaceholder: true,
      searchClear: false
    }
  },
  watch: {
    // 通过watch来设置空格
    dataPhone (newValue, oldValue) {
      this.dataPhone = newValue.length > oldValue.length ? newValue.replace(/\D/g, '').replace(/(\d{3})(\d{0,4})(\d{0,4})/, '$1 $2 $3') : this.dataPhone.trim()
      this.$emit('phoneValue', this.dataPhone)
      if (this.dataPhone.length > 0) {
        this.showPlaceholder = false // 提示文字隐藏
        this.searchClear = true// 清除按钮出现
      }
      if (this.dataPhone.length === 13) {
        this.$emit('btnStyleVisible', true)
      } else {
        this.$emit('btnStyleVisible', false)
      }
    }
  },
  created () {
    this.$nextTick(() => {
      document.querySelector('.van-number-keyboard').addEventListener('touchmove', function (e) {
        e.preventDefault() // 阻止默认事件(上下滑动)
      })
    })
  },
  methods: {
    ifshow () {
      this.show = false
    },
    inputClick () {
      this.show = true
    },
    clearInput () {
      this.searchClear = false// 清除按钮隐藏
      this.showPlaceholder = true // 提示文字出现
      this.dataPhone = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.login {
  overflow: hidden;
  min-height: 1000px;
  .login-title {
    font-size: 46px;
    margin: 60px 0 90px 60px;
    color: #333;
    font-weight: bold;
  }
  .login-input {
    margin:0 60px 40px;
    overflow: hidden;
    position: relative;
    .login-p{
      font-size: 40px;
      height: 50px;
      float: left;
      padding-bottom: 24px;
      color: #333;
    }
    .login-placeholder{
      position: absolute;
      left: 0;
      top: 0;
      font-size: 40px;
      color: #ddd;
    }
    .login-search {
      border-bottom: 2px solid #eee;
    }
    .login-animation {
      float: left;
      width: 1PX;
      height: 40px;
      margin-top: 8px;
      margin-left: 4px;
      background-color: #5386FF;
      -webkit-animation: 1s van-cursor-flicker infinite;
      animation: 1s van-cursor-flicker infinite;
    }
    .login-clear {
      font-size: 30px;
      position: absolute;
      right: 10px;
      top: 15px;
      color: #ddd;
    }
  }
}
.bottom-btn {
  position: absolute;
  bottom: 360px;
  left: 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  overflow: hidden;
  background: @backgroundColorGray;
  color: #999;
  font-size: 32px;
}
.blue {
  background: @backgroundColorBlue;
  color: #fff;
}
/*数字键盘样式重写*/
/deep/ .van-number-keyboard__title {
  height: 60px;
  line-height: 60px;
}
/deep/ .van-number-keyboard__close {
  font-size: 28px;
  width: 100%;
  padding-right: 0;
}
/deep/ .van-key {
  height:90px;
  line-height:90px;
  font-size: 40px;
}
/deep/ .van-key--gray{
  // background: #fff;
  font-size: 30px;
  background-color:transparent
}
</style>
