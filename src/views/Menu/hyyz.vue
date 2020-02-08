<template>
  <div class="hyyz">
    <div class="hyyz_index">
      <img :src="imgUrl+'/img/hyyz_index.png'">
    </div>
    <div class="hyyz_index_footer">
      <div class="f_l hyyz_index_btn">
        <a href="https://m.10010.com/mobilegoodsdetail/111808174020.html">
          <p class="text">惠医冰激凌套餐</p>
          <p class="money">
            <span>￥89</span>
            <del>￥99</del>
          </p>
          <p class="text">/月</p>
        </a>
      </div>
      <div
        class="f_r hyyz_index_btn2"
        @click="showDialog"
      >
        <a href="javascript:void(0);">
          <p class="text">惠医全家福套餐</p>
          <p class="money">
            <span>￥95</span>
            <del>￥106</del>
          </p>
          <p class="text">/月</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { STATIC_URL } from '@/config'
export default {
  data () {
    return {}
  },
  computed: {
    imgUrl () {
      return STATIC_URL
    }
  },
  methods: {
    showDialog () {
      this.$dialog({
        message: '敬请期待……',
        confirmButtonText: '我知道了',
        closeOnPopstate: true // 按返回按钮时弹出关闭
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import '~@/assests/styles/common.less';
.hyyz_index img{
  width: 100%;
}
.hyyz_index{
  padding-bottom: 50px;
}
.hyyz_index_footer{
  width: 690px;
  height: 70px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  /* border-top: 1px solid #EEE; */
  .border-top(#eee);
  background: #fff;
  a{
    color: #fff;
    display: block;
    height: 70px;
  }
  .hyyz_index_btn{
    width: 330px;
    background: #FF9800;
    border-radius: 10px;
  }
  .hyyz_index_btn2{
    width: 330px;
    background: #EB5919;
    border-radius: 10px;
  }
  p{
    float: left;
    height: 70px;
    &.text{
      font-size: 20px;
      line-height: 70px;
      margin-left: 10px;
    }
    &.money{
      padding-left: 50px;
      span{
        display: block;
        margin-top: 5px;
        font-size: 20px;
      }
      del{
        font-size: 20px;
      }
    }
  }
}
</style>
