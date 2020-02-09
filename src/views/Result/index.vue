<template>
  <div class="result-wrap">
    <!-- <main-container>
    </main-container> -->
    <div
      class="main-contiainer"
      :class="resultClass"
    >
      <div class="title">
        自测结果
      </div>
      <div class="result-img-tips">
        <div class="img-wp">
          <img :src="resultImg">
        </div>
        <div
          class="result-tips"
          :style="resultStyle"
        >
          {{ resultTips }}
        </div>
      </div>
      <div class="btn-wp">
        <div
          class="invite-btn"
          @click="onInviteClk"
        >
          邀请测试
        </div>
      </div>
      <div
        class="look-hos-list"
        @click="goHotList"
      >
        查看北京市发热门诊医院列表
      </div>
    </div>
    <div class="footer-risk-tip">
      <div class="footer-risk">
        风险提示：本测试及测试结果仅供参考，不能代替医生面诊，不能作为诊断及诊疗的依据，请您根据自身情况及时线下就医。
      </div>
      <footer-tip />
    </div>
  </div>
</template>

<script>
import FooterTip from '@/components/FooterTip'
const backgroundImg = require('@/assests/img/bg.png')
import Request from '@/utils/request'
import wx from 'weixin-js-sdk'
console.log(wx)
const resultImgObj = {
  r1: require('@/assests/img/result1.png'),
  r2: require('@/assests/img/result2.png'),
  r3: require('@/assests/img/result3.png'),
  r4: require('@/assests/img/result4.png')
}
const resultWords = {
  r1: '建议立刻发热门诊就诊，并且佩戴好口罩做好防护。佩戴医用外科口罩或N95口罩，避免乘坐公共交通工具。',
  r2: '结合您提供的病情症状及接触史特点，建议继续在家监测体温，可适当服用治疗感冒的中成药，注意手卫生，多饮水，休息为主。若体温持续不退或体温大于38℃或不适症状加重，及时就诊。',
  r3: '建议您们全家及密切接触者居家隔离至少2周，在家期间建议戴口罩交流，条件允许时，尽量单独居住或居住在通风良好的单人房间。多休息，多饮水，注意手卫生和常用物品卫生消毒。若出现发热及呼吸道症状，需马上前往医院就诊。',
  r4: '建议您戴口罩、勤洗手，避免人群聚集，减少不必要外出。'
}
const resultColor = {
  r1: '#F44E4E',
  r2: '#F4904E',
  r3: '#F4C74E',
  r4: '#9BD680'
}
// import MainContainer from '@/components/MainContainer'
export default {
  components: {
    FooterTip
  },
  data () {
    return {
      bgImg: Object.freeze(backgroundImg),
      result: -1
    }
  },
  computed: {
    resultImg () {
      if (this.result !== -1) {
        return resultImgObj[`r${this.result}`]
      } else {
        return ''
      }
    },
    resultTips () {
      if (this.result !== -1) {
        return resultWords[`r${this.result}`]
      } else {
        return ''
      }
    },
    resultStyle () {
      const color = resultColor[`r${this.result}`]
      return {
        color
      }
    },
    resultClass () {
      return `result${this.result}`
    }
  },
  created () {
    this.initResult()
  },
  methods: {
    initResult () {
      const { result } = this.$route.query
      this.result = result
      console.log(result)
    },
    goHotList () {
      this.$router.push({
        name: 'hot'
      })
    },
    onInviteClk () {
      const url = window.location.href
      Request.get('/wx/wechat/config', { data: { url }}).then(data => {
        console.log(data)
        wx.config({
          debug: false,
          appId: data.appid,
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名
          jsApiList: [ // 用的方法都要加进来
            'updateAppMessageShareData',
            'updateTimelineShareData',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]

        })
        wx.ready(function () {
          // 分享到朋友圈
          wx.updateTimelineShareData({
            title: 'test',
            desc: 'test desc',
            link: 'www.baid.com',
            imgUrl: '',
            success: function (res) {

            }
          })
          wx.updateTimelineShareData({

          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .result-wrap {
    padding: 160px 50px 0px;
    background: #53B9F5;
    background: url('~@/../../../../public/background.png') no-repeat left top;
    background-size: contain;
    .main-contiainer {
      height: 870px;
      background: rgba(255,255,255,1);
      box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.2),0px 1px 10px 0px rgba(159,217,255,1);
      border-radius: 20px;
      padding: 23px 50px 0px;
      .title {
        color: #999;
        font-size: 24px;
        text-align: center;
      }
    }
    .result-img-tips {
      width: 530px;
      margin: 92px auto;
      .img-wp {
        width: 440px;
        height: 258px;
        margin:0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .result-tips {
        font-size: 28px;
        margin-top: 62px;
      }
    }
    .btn-wp {
      text-align: center;
      margin:126px auto 0;
    }
    .invite-btn {
      display: inline-block;
      height: 84px;
      line-height: 84px;
      border-radius: 84px;
      padding: 0 55px;
      font-size: 30px;
      background-color: #53B9F5;
      color: #fff;
      text-align: center;

    }
    .look-hos-list {
      color: #999;
      font-size: 24px;
      margin-top: 40px;
      text-align: center;
    }
    .footer-risk-tip {
      color: #fff;
      margin-top: 32px;
      text-align: left;
      .footer-risk {
        font-size: 22px;

      }
    }
    .main-contiainer {
      &.result1 {
        .result-img-tips {
          margin-top: 90px;
        }
      }
      &.result2 {
        .btn-wp {
          margin-top: 66px;
        }
        .result-img-tips {
          margin-top: 35px;
          .result-tips {
            margin-top: 59px;
          }
        }
      }
      &.result3 {
        .btn-wp {
          margin-top: 46px;
        }
        .result-img-tips {
          margin-top: 38px;
          .result-tips {
            margin-top: 36px;
          }
        }
      }
    }
  }
</style>
