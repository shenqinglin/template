<template>
  <div class="index">
    <img
      :src="indexImg"
      alt=""
    >
    <div class="content">
      <h3>此测试依据：</h3>
      <p class="main">
        《国家卫生健康委办公厅关于在疫情防控中做好互联网诊疗咨询服务工作的通知》<span>（国卫办医函〔2020〕112号）</span>中，智能辅助新型冠状病毒肺炎问诊量表制作。
      </p>
    </div>
    <div
      class="btn"
      @click="toTest"
    >
      开始测试
    </div>
  </div>
</template>

<script>
const indexImg = require('@/assests/img/index.png')
export default {
  data () {
    return {
      indexImg: indexImg
    }
  },
  mounted () {

  },
  methods: {
    toTest () {
      this.$router.replace({ name: 'q1' })
    }
  }
}
</script>

<style lang="less" scoped>
.index{
  padding: 157px 85px 0;
  background: url('~@/assests/img/bg.png') no-repeat left top;
  background-size: contain;
  img{
    width: 239px;
    height: 260px;
    margin-left: 175px;
  }
  .content{
    color: #fff;
    h3{
      font-size: 34px;
    }
    .main{
      font-size: 34px;
      margin: 48px 0 20px;
      span{
        font-size: 24px;
      }
    }
    .date{
      font-size: 24px;
      text-align: right;
    }
  }
  .btn{
    width:570px;
    height:84px;
    margin-top: 100px;
    line-height: 84px;
    background:rgba(255,255,255,1);
    border-radius:42px;
    text-align: center;
    font-size: 30px;
    color: #53B9F5;
    font-weight: bold;
  }
}
</style>
