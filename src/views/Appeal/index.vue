<template>
  <v-page
    :show-header="false"
    :show-blue-head="false"
    class="appeal"
  >
    <div class="top">
      <p>账号申诉能够帮您处理您在平台上所遇到的异常问题，<span>提交申诉前请仔细阅读如下申诉说明。</span></p>
    </div>
    <div class="bottom">
      <dl>
        <dt class="bottom-dt" />
        <dd>
          <span>更换注册手机号</span>
          <p>适用于注册手机号更改，申诉成功后可使用新手机号登录账户</p>
        </dd>
      </dl>
      <dl>
        <dt class="bottom-dt" />
        <dd>
          <span>实名认证未通过</span>
          <p>适用于注册账户实名失败或就诊人实名失败，申诉需提供实名本人人证合一照片，申诉成功后可重新操作实名或添加就诊人</p>
        </dd>
      </dl>
      <dl>
        <dt class="bottom-dt" />
        <dd>
          <span>注销用户数据</span>
          <p>适用于注销已完成注册的账户，账户注销后，账户本人在平台所产生的一切预约历史均被删除，申诉需提供与账户实名信息相同的人证合一照片（自然人死亡需提供死亡证明）</p>
        </dd>
      </dl>
      <dl>
        <dt class="bottom-dt" />
        <dd>
          <span>实名信息被绑定</span>
          <p>适用于注册账户实名时，本人实名信息被其他账户占用，申诉需提供实名信息人证合一照片，申诉成功后可使用本人实名信息完成认证</p>
        </dd>
      </dl>
      <dl>
        <dt class="bottom-dt" />
        <dd>
          <span>就诊人被绑定</span>
          <p>适用于就诊人被其它陌生账户绑定，申诉需提供实名信息人证合一照片，申诉成功后，将解除就诊人与陌生账户绑定关系</p>
        </dd>
      </dl>
    </div>
    <div class="bottom-btn">
      <router-link to="/appeal/appealInfo">
        我已经准备好证件，进入申诉
      </router-link>
    </div>
  </v-page>
</template>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.appeal {
  .top {
    padding: 28px 30px;
    overflow: hidden;
    background: @backgroundColorGray;
    p {
      color: #333;
      font-size: 30px;
      span {
        color: @backgroundColorRed;
      }
    }
  }
  .bottom {
    dl {
      overflow: hidden;
      padding: 30px 30px 0;
      .bottom-dt{
        width: 6px;
        height: 6px;
        background: @fontColorBlue;
        float: left;
        margin-right: 14px;
        margin-top: 16px;
      }
      dd {
        margin-left: 16px;
        span {
          font-family: PingFangSC-Medium;
          font-size:28px;
          font-weight: bold;
          color: #333;
          display: block;
          margin-bottom: 5px;
        }
        p {
          font-size: 24px;
          color: #999;
          line-height: 33px;
          letter-spacing: 1px;
        }
      }
    }
  }
  .bottom-btn{
    width: 100%;
    overflow: hidden;
    text-align: center;
    margin-top: 60px;
    padding: 25px 0 35px;
    a{
      display: inline-block;
      width:690px;
      height:80px;
      line-height: 80px;
      background:@backgroundColorBlue;
      box-shadow:0px 6px 30px 0px @boxShadow;
      border-radius:45px;
      color: #fff;
      font-size: 32px
    }
  }
}
</style>

