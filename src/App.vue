<template>
  <div id="app">
    <router-view />
    <div class="footer-tip">
      <span class="left tip">北京市卫生健康委员会</span>
      <span class="center tip" />
      <span class="right tip">北京市预约挂号统一平台</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Request from '@/utils/request'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      flagFirst: true
    }
  },
  computed: {
    isWeixin () {
      const ua = navigator.userAgent.toLowerCase()
      const r = ua.match(/MicroMessenger/i)
      if (!r) {
        return false
      }
      if (r[0] === 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    ...mapGetters(['queue', 'currentIndex'])
  },
  watch: {
    '$route' (to) {
      this.initShare()
    }
  },
  mounted () {
    if (this.queue.length === 0) {
      this.toQuestionPage()
      this.$router.replace({ name: 'q1' })
    }

    Request.get('/wx/selfTest/visit')
    this.initPage()
    // this.initShare()
  },
  methods: {
    async toQuestionPage () {
      await this.$store.dispatch('generateDefaultQuestionQueue')
    },
    createShareUrl () {
      const curr = location.href
      // return curr
      // if (curr.indexOf('?') > -1) {
      //   return curr + '&share=true'
      // } else {
      //   return curr + '?share=true'
      // }

      const arr = curr.split('?')
      return arr[0]
    },
    initPage () {
      if (this.flagFirst) {
        this.initShare()
        // this.weixinJSBridgeShare()
        this.flagFirst = false
      }
    },
    weixinJSBridgeShare () {
      const url = window.location.href
      const options = {
        imgUrl: 'https://image.carelink.cn/carelink2/hospital/portrait/ANKUluZJlnmh9982235514181DBD62C2.jpg',
        lineLink: window.location.href,
        descContent: '测试描述',
        shareTitle: '测试标题'
      }
      Request.get('/wx/wechat/config', { data: { url }}).then(data => {
        window.WeixinJSBridge.on('menu:share:appmessage', function (argv) {
          this.shareFriend(data, options)
        })
        // 分享到朋友圈
        window.WeixinJSBridge.on('menu:share:timeline', function (argv) {
          this.shareTimeline(data, options)
        })
      })
    },
    shareFriend (data, options) {
      window.WeixinJSBridge.invoke('sendAppMessage', {
        'appid': data.appid,
        'img_url': options.imgUrl,
        'img_width': '200',
        'img_height': '200',
        'link': options.lineLink,
        'desc': options.descContent,
        'title': options.shareTitle
      }, function (res) {

      })
    },
    shareTimeline (data, options) {
      window.WeixinJSBridge.invoke('shareTimeline', {
        'img_url': options.imgUrl,
        'img_width': '200',
        'img_height': '200',
        'link': options.lineLink,
        'desc': options.descContent,
        'title': options.shareTitle
      }, function (res) {
        // _report('timeline', res.err_msg); // 这是回调函数，必须注释掉

      })
    },
    initShare () {
      const _this = this
      if (!_this.isWeixin) {
        return
      }
      // const url = location.origin + location.pathname
      const url = this.createShareUrl()
      // const shareLink = this.createShareUrl()
      Request.get('/wx/wechat/config', { data: { url }}).then(data => {
        // console.log(data)
        wx.config({
          debug: true,
          appId: data.appId,
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [ // 用的方法都要加进来
            'updateAppMessageShareData',
            'updateTimelineShareData'
            // 'onMenuShareTimeline',
            // 'onMenuShareAppMessage',
          ]

        })
        wx.ereor(function (res) {
          // console.log(res)
        })
        wx.ready(function () {
          // 分享到朋友圈
          // const shareLink = location.origin + '/activity/q1'
          // const shareLink = location.href + '&share=true'
          console.log('12345ready')
          // alert('ready')
          const shareLink = this.createShareUrl()
          const shareTitle = '新冠肺炎居家自测工具'
          const sharePic = 'http://beta2.le1.cm.cn/2020/02/7827381961356514.png'
          // const sharePic = ''
          // wx.onMenuShareTimeline({
          //   title: shareTitle,
          //   link: shareLink,
          //   desc: 'test',
          //   imgUrl: encodeURI(sharePic),
          //   success: function (res) {
          //     // _this.sharePicVisible = false
          //   }
          // })
          wx.updateTimelineShareData({
            title: shareTitle, // 分享标题
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: encodeURI(sharePic), // 分享图标
            desc: 'test',
            success: function () {
              // 设置成功
              // _this.sharePicVisible = false
              // console.log('分享到朋友圈成功返回的信息为:')
            }
          })

          // 分享给朋友
          // wx.onMenuShareAppMessage({
          //   title: shareTitle,
          //   desc: 'asdasd',
          //   link: shareLink,
          //   imgUrl: encodeURI(sharePic),
          //   type: '', // 不填默认时link
          //   dataUrl: '', // 默认空
          //   success: function () {
          //     alert(11111111)
          //     // _this.sharePicVisible = false
          //   }
          // })
          // 分享给朋友 及 QQ
          wx.updateAppMessageShareData({
            title: sharePic,
            desc: 'asd',
            link: shareLink,
            imgUrl: encodeURI(sharePic),
            success: function () {
              alert(11111111)
              // _this.sharePicVisible = false
            }
          })
        })
      })
    }
  }
}
</script>
<style lang="less">
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';

* {
  margin: 0;
  padding: 0;
}
*:not(i) {
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  color: #666;
  height: 100vh;
  background-color: #53b9f5;
}
.grey{
  color: #ccc;
  font-weight: 400;
}

.footer-tip {
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  margin-top: 62px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  .tip {
    display: inline-block;
    vertical-align: middle;
  }
  .center {
    height: 28px;
    width: 1PX;
    background-color: #fff;
    border: none;
    margin: 0 20px;
  }
}
</style>
