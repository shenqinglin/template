<template>
  <div
    v-if="show"
    class="overlay"
    @click="show = false"
  >
    <div
      class="block"
      @click.stop
    >
      <h3 class="border-bottom">
        {{ title }}
      </h3>
      <div
        class="content"
        v-html="content"
      />
      <div
        class="btn border-top"
        @click="show = false"
      >
        {{ btnText }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: '',
      content: '',
      btnText: '',
      show: false
    }
  }
}
</script>
<style lang="less" scoped>
.overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.4);
  .block{
    width:590px;
    background:rgba(255,255,255,1);
    border-radius:20px;
    h3{
      margin: 0 40px;
      height: 120px;
      line-height: 120px;
      font-size: 34px;
      font-weight: bold;
      color: #333;
      text-align: center;
    }
    .content{
      min-height: 250px;
      max-height: 590px;
      line-height:38px;
      margin: 40px;
      overflow-y: auto;
      color: #666666;
      font-size: 26px;
    }
    .btn{
      display: flex;
      justify-content: space-around;
      height: 90px;
      line-height: 90px;
      color: #5386FF;
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      span{
        display: inline-block;
        width: 50%;
      }
      span:nth-child(2){
        border-left: 1px solid #eeeeee;
      }
    }
  }
}
</style>
