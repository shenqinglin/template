<template>
  <div
    class="notice-list border-bottom"
  >
    <div class="select_personnel">
      <p>
        <span
          v-if="title"
          :class="noBlod ? 'noBlod' : '' "
        >
          {{ title }}
        </span>
        <span v-if="createTime">{{ createTime }}</span>
      </p>
      <v-icon
        name="right"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    createTime: {
      type: String,
      default: ''
    },
    noBlod: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less">
.notice-list{
  padding: 30px 30px 30px 0;
  margin-left: 30px;
  .select_personnel{
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    border-radius:20px;
    background: #fff;
    p{
      width: 590px;
      span{
        font-size: 24px;
        display: block;
        i{
          margin-left: 20px;
          font-style: normal;
        }
      }
      span:nth-child(1){
        color: #333333;
        font-size: 28px;
        font-weight: bold;
        &.noBlod{
          font-weight: 400;
        }
      }
      span:nth-child(2){
        margin-top: 12px;
      }
    }
    .v-icon{
      color: #999;
      font-size: 24px;
    }
  }
}
</style>
