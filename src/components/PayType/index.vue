<template>
  <div class="pay-type">
    <div class="left">
      <img
        :src="imgUrl"
        alt=""
      >
      <span>{{ name }}</span>
    </div>
    <v-icon
      :class="status"
      :name="status"
    />
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.pay-type{
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left{
    display: flex;
    align-items: center;
    img{
      display: inline-block;
      width: 34px;
      height: 34px;
      margin-right: 20px;
    }
    span{
      font-size: 28px;
      color: #333333;
    }
  }
  .selected{
    color: #5386FF;
  }
}
</style>
