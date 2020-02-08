<template>
  <div class="dept-list">
    <div class="box">
      <div class="menu_left">
        <ul id="firstDept">
          <li
            v-for="(item, index) in firseDept"
            :key="index"
            :class="index === selectIndex ? 'active' : '' "
            @click="getSecondDept(item, index)"
          >
            {{ item.groupName || item.name }}
          </li>
        </ul>
      </div>
      <div class="menu_right">
        <ul id="secondDept">
          <li
            v-for="(item, index) in secondDept"
            :key="index"
          >
            <router-link
              :to="path(item)"
            >
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    deptList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      selectIndex: 0,
      firseDept: [],
      secondDept: [],
      firstDeptCode: ''
    }
  },
  computed: {
    hospitalId () {
      const { hosCode } = this.$route.params
      return hosCode
    }
  },
  watch: {
    deptList: {
      handler (val) {
        this.firseDept = val
        this.secondDept = val[this.selectIndex].secondDept
        this.firstDeptCode = /^[0-9a-zA-Z\-_]+$/.test(val[this.selectIndex].id) ? val[this.selectIndex].id : 0
      },
      deep: true
    }
  },
  methods: {
    getSecondDept (item, index) {
      this.selectIndex = index
      this.secondDept = item.secondDept
      this.firstDeptCode = /^[0-9a-zA-Z\-_]+$/.test(item.id) ? item.id : 0
    },
    path (item) {
      const path = { path: `/lookDisease/${this.hospitalId}/${item.id}` }
      return path
    }
  }
}
</script>
<style lang="less" scoped>
.dept-list{
  flex: 1;
  overflow: hidden;
  z-index: 8;
  box-sizing: border-box;
  .box{
    height: 100%;
    overflow: scroll;
    .menu_left{
      float: left;
      height: 100%;
      overflow-y: scroll;
      width: 260px;
      background-color: #fafafa;
      -webkit-overflow-scrolling: touch;
      li{
        position: relative;
        padding: 30px;
        font-size: 28px;
        color: #999;
        text-align: center;
        -webkit-tap-highlight-color: transparent;
        &.active{
          background-color: #fff;
          color: #5386FF;
          font-weight: bold;
        }
        &.active:after {
          content: "";
          height: 26px;
          width: 8px;
          background: #5386FF;
          position: absolute;
          top: 50%;
          left: 10px;
          border-radius: 4px;
          transform: translateY(-50%);
        }
      }
    }
    .menu_right{
      height: 100%;
      margin-left: 260px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      ul{
        li{
          font-weight:400;
          -webkit-tap-highlight-color: transparent;
          a{
            display: block;
            padding: 30px 30px 30px 60px;
            font-size: 28px;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
