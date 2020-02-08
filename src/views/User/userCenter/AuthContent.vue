<template>
  <van-popup
    v-show="showContent"
    v-model="isShow"
    round
    position="bottom"
    @close="onClose"
    @click="onClose"
  >
    <div
      class="diy-wrap"
      @click="onWrapClick"
    >
      <v-icon
        class="closeBtn"
        name="close"
        @click.native="onClose"
      />
      <div class="picture">
        <img :src="authPic">
      </div>
      <div class="auth-tip">
        {{ authStatusWords }}
      </div>
      <div class="author">
        <v-left-right
          label="姓名"
          :val="name"
        />
        <v-left-right
          label="证件类型"
          :val="idType"
        />
        <v-left-right
          class="no-border"
          label="证件号码"
          :val="idNo"
        />
      </div>
    </div>
  </van-popup>
</template>

<script>

import { STATIC_URL } from '@/config'
import VLeftRight from '@/components/VLeftRight'
import { authStatus } from '@/api/user'
export default {
  components: {
    VLeftRight
  },
  props: {
    showContent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      status: '',
      authStatusWords: '',
      name: '',
      idNo: '',
      idType: ''
    }
  },
  computed: {
    authPic () {
      const { status } = this
      const pic = status === 'OK' ? 'auth-success' : 'auth-ing-center'
      return `${STATIC_URL}/img/${pic}.png`
    }
  },
  watch: {
    showContent (val) {
      if (val) {
        this.isShow = true
        this.getAuthInfo()
      }
    }
  },
  methods: {
    onClose () {
      this.isShow = false
      this.$emit('close-content', false)
    },
    onWrapClick (ev) {
      ev.stopPropagation()
    },
    getAuthInfo () {
      authStatus().then(data => {
        this.name = data.name
        this.idType = data.idType
        this.idNo = data.idNo
        this.status = data.status
        if (data.status === 'OK') {
          this.authStatusWords = '实名认证成功'
        } else if (data.status === 'PROCESSING') {
          this.authStatusWords = '认证中，请耐心等待'
        } else {
          this.authStatusWords = '认证失败'
        }
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .van-popup--bottom.van-popup--round {
    border-radius: 20px 20px 0 0;
  }
  .diy-wrap {
    .close-wp {
      height: 70px;
      text-align: right;
      .icon-btn {
        display: inline-block;
        margin:20px 20px 0 0;
      }
    }
    .picture {
      width: 177px;
      height: 197px;
      margin: 70px auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .auth-tip {
      color: #333333;
      font-size: 34px;
      font-weight: bold;
      text-align: center;
      margin: 0 0 72px;
    }
    .author {
      margin-left: 30px;
      margin-bottom: 69px;
    }
  }
</style>
