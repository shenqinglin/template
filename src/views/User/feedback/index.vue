<template>
  <v-page
    class="home grey-background"
    :show-header="false"
  >
    <div class="feedback-wrap">
      <div class="feedback-text">
        <textarea
          v-model="feedbackWords"
          class="feedback-file"
          placeholder="请输入意见…"
        />
        <div class="remain-words">
          <span>{{ insertedCount }}</span>
          <span>/{{ feedbackTotal }}</span>
        </div>
      </div>
      <v-btn
        text="提交"
        class="submit-btn"
        @touchend.native="onSubmit"
      />
    </div>
    <van-popup
      v-model="isShow"
      :close-on-click-overlay="closeOnClickOverlay"
      class="popup-feedback"
    >
      <div class="top-content">
        <div class="tip">
          成功反馈，谢谢您的宝贵建议！
        </div>
      </div>
      <div
        class="btn-wrap"
        @touchend="onClose"
      >
        <div class="btn">
          关闭
        </div>
      </div>
    </van-popup>
  </v-page>
</template>

<script>
import { feedbackTotal } from '@/constants'
import { feedBack } from '@/api/user'
import VBtn from '@/components/VBtn'
export default {
  components: {
    VBtn
  },
  data () {
    return {
      feedbackTotal: Object.freeze(feedbackTotal),
      closeOnClickOverlay: true,
      feedbackWords: '',
      isShow: false
    }
  },
  computed: {
    insertedCount () {
      return this.feedbackWords.length
    }
  },
  watch: {
    feedbackWords (val) {
      if (val.length >= 200) {
        this.feedbackWords = this.feedbackWords.substr(0, 200)
      }
    }
  },
  methods: {
    onSubmit () {
      const { feedbackWords } = this
      if (!feedbackWords) {
        this.$toast('请输入反馈意见内容')
        return
      }
      feedBack(feedbackWords).then(data => {
        // this.isShow = true
        // this.$toast.success('成功反馈，谢谢您的宝贵建议！')
        this.$toast({
          type: 'success',
          message: '成功反馈，谢谢您的宝贵建议！',
          className: 'feed-back-toast'
        })
        this.feedbackWords = ''
      })
    },
    onClose () {
      this.isShow = false
      this.$router.replace('/user')
    }
  }

}
</script>

<style lang='less' scoped type='text/less'>
@import '~@/assests/styles/common.less';
  .grey-background {
    background-color: #F6F6F6;
  }
  .feedback-wrap {
    width: 100%;
    .feedback-text {
      width: 100%;
      height: 460px;
      background-color: #fff;
      position: relative;
      margin-bottom: 30px;
      padding: 30px;
      box-sizing:border-box;
      .feedback-file {
        resize: none;
        width: 100%;
        border: none;
        font-size: 28px;
        color: #333333;
        height: 100%;
      }
      textarea::-webkit-input-placeholder {
        color: #dddddd;
      }
      .remain-words {
        position: absolute;
        right: 30px;
        bottom: 30px;
        font-size: 22px;
        color: #DDDDDD;
      }
    }
  }
  .popup-feedback {
    width: 590px;
    background-color: #fff;
    border-radius: 20px;

    .top-content {
      height: 180px;
      display: flex;
      align-items:center;
      .tip {
        width: 100%;
        text-align:center;
        color:#333333;
        font-size: 28px;
      }
    }
    .btn-wrap {
      height: 90px;
      /* border-top: 1px solid #eeeeee; */
      .border-top(#eee);
      display: flex;
      align-items:center;
      justify-content: center;
      .btn {
        color: #5386FF;
        font-size: 30px;
      }
    }
  }

</style>
<style>
  .feed-back-toast {
    width: 228px !important;
  }
</style>
