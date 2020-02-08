<template>
  <v-page
    class="home"
    :show-header="false"
  >
    <div class="bind-wx-wrap">
      <div
        v-if="bindVisible"
        class="had-bind"
      >
        <div class="pic-words">
          <div class="pic">
            <img :src="headImg">
          </div>
          <div
            id="wx-nickname"
            class="words"
          >
            {{ nickName }}
          </div>
        </div>
        <div
          class="btn clear-btn"
          @click="onClear"
        >
          解除绑定
        </div>
      </div>
      <div
        v-if="unbindVisible"
        class="no-bind"
      >
        <div class="pic-words">
          <div class="pic cur-unbind">
            <img :src="defaultImg">
          </div>
          <div class="words">
            您还没有绑定微信
          </div>
        </div>
        <div
          class="btn bind-btn"
          @click="addContact"
        >
          绑定微信
        </div>
      </div>
    </div>
  </v-page>
</template>

<script>
import { STATIC_URL } from '@/config'
import { wechatUnBind, wechatBind, wechatBindInfo } from '@/api/user'
export default {
  data () {
    return {
      bindVisible: false,
      unbindVisible: false,
      headImg: '',
      nickName: ''
    }
  },
  computed: {
    defaultImg () {
      return `${STATIC_URL}/img/no-bind.png`
    }
  },
  created () {
    this.getWechatInfo()
  },
  methods: {
    onClear () { // 解除绑定点击二次确认
      this.$dialog.confirm({
        title: '',
        message: '确定解绑',
        closeOnPopstate: true // 按返回按钮时弹出关闭
      }).then(_ => {
        this.clearContact()
      }).catch(_ => {

      })
    },
    clearContact () { // 解除绑定
      wechatUnBind().then(data => {
        this.showUnbind()
      })
    },
    addContact () { // 绑定微信
      wechatBind().then(data => {
        this.getWechatInfo()
      })
    },
    showBind () { // 展示绑定视图
      this.bindVisible = true
      this.unbindVisible = false
    },
    showUnbind () { // 展示未绑定视图
      this.bindVisible = false
      this.unbindVisible = true
    },
    getWechatInfo () { // 获取微信信息
      wechatBindInfo().then(data => {
        if (data.status === true) {
          this.showBind()
          this.nickName = data.weChatNickName
          this.headImg = data.weChatPortrait
        } else {
          this.showUnbind()
        }
      }).catch(res => {
        this.$toast('服务异常，请稍后再试')
        this.showUnbind()
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .had-bind {
    margin-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .pic-words {
      font-size: 0;
      display: flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      .pic {
        width: 160px;
        height: 160px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .words {
        font-size: 30px;
        height: 42px;
        line-height: 42px;
        color: #333333;
        margin-top: 38px;
        text-align: center;
      }
    }
    .clear-btn {
      color: #999999;
      font-size: 24px;
      height: 33px;
      line-height: 33px;
      margin-top: 121px;
    }
  }
  .no-bind {
    .pic {
      width: 258px;
      height: 74px;
      margin:199px 248px 0 244px;
      img {
        width: 100%;
      }
    }
    .words {
      font-size: 28px;
      color: #999999;
      text-align: center;
      margin: 87px auto 97px;
    }
    .bind-btn {
      width: 690px;
      height: 80px;
      line-height: 80px;
      background-color: #5386FF;
      font-size: 32px;
      color: #fff;
      text-align: center;
      border-radius: 42px;
      margin: 0 auto;
    }
  }
  .van-dialog {
    width: 600px;
  }
</style>
