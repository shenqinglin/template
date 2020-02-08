<template>
  <div class="depContent">
    <div class="dep-top border-bottom">
      <div class="dep-top-left flexCol">
        <v-icon
          class="dep-top-icon col-left-middle"
          name="hospital"
        />
        <p @click="hosDetail(depDetail.hosCode)">
          {{ depDetail.hosName }}
        </p>
      </div>
      <div class="dep-top-right">
        <span class="dep-top-level">{{ depDetail.hosLevelText }}</span>
        <v-icon name="distance" />
        <span class="distance">{{ depDetail.distance + 'km' }}</span>
      </div>
    </div>
    <div class="dep-bottom">
      <ul>
        <li
          v-for="(item2,index2) in depDetail.depts"
          :key="index2"
          @click="liClick(item2.code,depDetail.hosCode)"
        >
          {{ item2.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeCenterSelect',
  props: {
    depDetail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    liClick (id, hosId) {
      this.$router.push({
        path: '/calendar/' + hosId + '/0/' + id + '/date'
      })
    },
    hosDetail (id) {
      this.$router.push({ path: 'department/' + id })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.depContent {
  background: @backgroundColorWhiter;
  overflow: hidden;
  .dep-top {
    position: relative;
    margin-left: 30px;
    padding-right: 20px;
    overflow: hidden;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .dep-top-left{
      overflow: hidden;
      float: left;
      .dep-top-icon{
        font-size: 30px;
        margin-right:10px;
        float: left;
        color: #999;
      }
      p{
        float: left;
        font-size: 28px;
        color: #333;
        max-width: 370px;
        font-family: PingFangSC-Semibold
      }
    }
    .dep-top-right{
      float: right;
      display: flex;
      align-items: center;
      .v-icon{
        font-size: 20px;
        margin-top: 2px;
        color: #999;
      }
      .distance{
        font-size: 20px;
        margin-left: 4px;
        color: #999;
      }
      .dep-top-level{
        font-size: 20px;
        float: left;
        color: #999;
        margin-right: 20px;
        // margin-top: 6px;
      }
      .dep-top-address{
        float: left;
        margin-top: 3px;
        &.m-icon{
          font-size: 20px;
        }
      }
    }
  }
  .dep-bottom {
    padding: 30px 30px 16px;
    overflow: hidden;
    ul {
      li {
        float: left;
        font-size: 24px;
        background: @backgroundColorBluer;
        color: @fontColorBlue;
        padding: 10px 14px;
        margin-bottom: 14px;
        margin-right: 14px;
        border-radius:10px;
      }
    }
  }
}
</style>

