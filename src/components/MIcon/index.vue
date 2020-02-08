<template>
  <span
    class="m-icon"
  >
    <v-icon
      v-if="iconLiftshow"
      :name="name"
    />
    <span class="desc">{{ desc }}</span>
    <v-icon
      v-if="!iconLiftshow"
      :name="name"
    />
  </span>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    desc: {
      type: [String, Number],
      default: ''
    },
    iconLiftshow: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="less" scoped>
.m-icon{
  color: #999;
  font-size: 24px;
  span:nth-child(2){
    margin-left: 10px;
  }
  .desc{
    display: inline-flex;
  }
  .v-icon{
    font-size: 20px;
  }
}
</style>
