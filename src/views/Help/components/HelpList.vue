<template>
  <div class="help-list">
    <h3 class="border-bottom">
      <span />{{ title }}<span />
    </h3>
    <notice-list
      v-for="(item,index) in helpList"
      :key="index"
      :title="item.title"
      :no-blod="true"
      @click.native="clickList(item.path)"
    />
  </div>
</template>
<script>
import noticeList from '@/components/NoticeList'
export default {
  components: {
    noticeList
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    helpList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {
    clickList (path) {
      this.$router.push({
        path: path
      })
    }
  }
}
</script>
<style lang="less" scoped>
.help-list{
  margin: 30px;
  background: #fff;
  border-radius: 20px;
  h3{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 30px;
    height: 82px;
    line-height: 82px;
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    color: #333333;
    span{
      width: 34px;
      height: 2px;
      background: linear-gradient(90deg,rgba(169,195,255,1) 0%,rgba(46,108,255,1) 100%,);
      &:nth-child(1){
        margin-right: 20px;
      }
      &:nth-child(2){
        margin-left: 20px;
        background: linear-gradient(90deg,rgba(46,108,255,1) 0%,rgba(169,195,255,1) 100%,);
      }
    }
  }
}
</style>
