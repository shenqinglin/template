<template>
  <div class="auth-info-wrap">
    <div
      class="userName"
      :data-auth="authState"
    >
      <span
        v-if="authState"
        class="phone-number info"
      >{{ userAccount }}</span>
      <div
        v-if="authState === 'OK'"
        class="phone"
      >
        {{ phone }}
      </div>
    </div>
    <div
      v-if="tipName"
      class="iconRight"
    >
      <m-icon
        :name="tipName"
        :desc="tip"
        :class="authState==='OK'?'status':'status colorRed'"
      />
      <v-icon
        class="right"
        name="right"
      />
    </div>
  </div>
</template>

<script>
import MIcon from '@/components/MIcon'
export default {
  components: {
    MIcon
  },
  props: {
    authState: {
      type: String,
      default: ''
    },
    phone: {
      type: [String, Number],
      default: ''
    },
    userName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tip: '',
      tipName: ''
    }
  },
  computed: {
    userAccount () {
      return this.authState === 'OK' ? this.userName : this.phone
    }
  },
  watch: {
    authState (val) {
      if (val) {
        this.init()
      }
    }
  },
  mounted () {
    // this.init() // authState为异步数据，在这里获取不到
  },
  methods: {
    init () {
      const { authState } = this
      if (authState === 'OK') {
        this.tip = '已认证'
        this.tipName = 'success'
      } else if (authState === 'PROCESSING') {
        this.tip = '认证中'
        this.tipName = 'authentication'
      } else {
        this.tip = '未认证'
        this.tipName = 'tip'
      }
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .auth-info-wrap {
    background-color: #fff;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    border-radius: 20px;
    width: 620px;
    height: 160px;
    padding: 0 30px 0 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 64px;
    left: 50%;
    transform: translate(-50%,0);
    .userName{
      .phone-number {
        font-size: 40px;
        color: #333;
        height: 56px;
        line-height: 56px;
        &.only-number {
          font-size: 40px;
        }
      }
      .phone{
        width: 100%;
        margin-top: 10px;
        color: #333333;
        font-size: 24px;
      }
    }
    .iconRight{
      display: flex;
      align-items: center;
      .right{
        margin-left: 10px;
        color: #999;
        font-size: 26px;
      }
      .status {
        display: inline-block;
        color: #5386FF;
        height: 40px;
        line-height: 42px;
        border-radius: 30px;
        padding: 0 16px;
        border:2px solid #5386FF;
        font-size: 24px;
        /deep/.v-icon{
          font-size: 26px;
          margin-left: 0;
        }
        &.colorRed{
          color: #FF5F5F;
          border:2px solid #FF5F5F;
        }
      }
    }
  }
</style>
