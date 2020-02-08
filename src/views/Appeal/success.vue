<template>
  <v-page
    :show-header="false"
    :show-blue-head="false"
  >
    <div class="success">
      <div class="notice">
        提交申诉成功!
      </div>
      <div class="msg">
        我们会在7个工作日内处理完成，请关注微信服务号消息。
      </div>
      <v-btn
        text="我知道了"
        @click.native="closePages"
      />
    </div>
  </v-page>
</template>
<script>
import VBtn from '@/components/VBtn'
export default {
  components: {
    VBtn
  },
  methods: {
    closePages () {
      if (typeof WeixinJSBridge !== 'undefined') {
        window.WeixinJSBridge.call('closeWindow')
      } else {
        if (navigator.userAgent.indexOf('MSIE') > 0) {
          if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
            window.opener = null; window.close()
          } else {
            window.open('', '_top'); window.top.close()
          }
        } else if (navigator.userAgent.indexOf('Firefox') > 0) {
          window.location.href = 'about:blank '
        } else {
          window.opener = null
          window.open('', '_self', '')
          window.close()
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.success{
  padding: 103px 30px 0;
  .notice{
    color: #333333;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }
  .msg{
    width: 489px;
    margin: 31px auto 200px;
    color: #999999;
    font-size: 28px;
  }
}
</style>
