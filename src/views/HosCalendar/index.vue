<template>
  <v-page
    :show-header="false"
  >
    <div
      class="source-date"
      :class="showDocReg && !hasTabs ? 'boxShadow':''"
    >
      <div
        class="calendar"
        :class="showDocReg && !hasTabs ? 'paddingTop0':''"
      >
        <div class="title-left">
          <p class="title">
            <span>{{ hosDept.hosName }}</span>
            <span>{{ hosDept.firstDeptName }}</span>
          </p>
          <h3>{{ hosDept.secondDeptName }}</h3>
        </div>
        <div
          v-if="showDeptCase"
          class="title-right"
          @click="goDeptCase"
        >
          <m-icon
            desc="科室案例"
            name="right"
            :icon-liftshow="false"
          />
        </div>
      </div>
    </div>
    <van-tabs
      v-if="showDocReg && !hasTabs"
      v-model="active"
      line-width="70px"
      line-height="2px"
      title-active-color="#6596f5"
      title-inactive-color="#666"
      color="#6596f5"
      class="border-bottom"
    >
      <van-tab
        title="按日期挂号"
        to="date"
        replace
      />
      <van-tab
        title="按专家挂号"
        to="expert"
        replace
      />
    </van-tabs>
  </v-page>
</template>
<script>
import MIcon from '@/components/MIcon'
import { fetchDeptName, getMarkdown } from '@/api/common'
import { sourceAuthority } from '@/api/special'
import { Session } from '@/utils/storage'
export default {
  components: {
    MIcon
  },
  data () {
    return {
      hosDept: {},
      active: 0,
      showDeptCase: false,
      showDocReg: false
    }
  },
  computed: {
    hosCode () {
      return this.$route.params.hosCode
    },
    firstDeptCode () {
      return this.$route.params.firstDeptCode === '0' ? '' : this.$route.params.firstDeptCode
    },
    secondDeptCode () {
      return this.$route.params.secondDeptCode
    },
    hasTabs () {
      return this.$route.name === 'doctorIndex'
    }
  },
  watch: {
    $route (val) {
      if (val.name === 'doctorIndex') {
        this.showDocReg = false
      } else if (val.name === 'expert') {
        this.showDocReg = true
        this.active = 1
      } else {
        this.getDeptName()
      }
    }
  },
  destroyed () {
    this.$popup.close()
  },
  mounted () {
    this.getDeptName()
    this.getSourceAuthority()
    const DEPTMENT_TIP = Session.get(`${this.secondDeptCode}_DEPTMENT`)
    if (!DEPTMENT_TIP) {
      this.checkoutDepNotice()
    }
    this.active = this.$route.name === 'expert' ? 1 : 0
  },
  methods: {
    getDeptName () {
      fetchDeptName({ hosCode: this.hosCode, firstDeptCode: this.firstDeptCode, secondDeptCode: this.secondDeptCode }).then(res => {
        this.hosDept = res
      })
    },
    getSourceAuthority () {
      sourceAuthority(this.hosCode).then(res => {
        this.showDeptCase = res.showDeptCase
        this.showDocReg = res.showDocReg
      })
    },
    goDeptCase () {
      this.$router.push({
        name: 'deptCase',
        params: {
          hosCode: this.hosCode,
          firstDept: this.$route.params.firstDeptCode,
          secondDept: this.secondDeptCode
        }
      })
    },
    checkoutDepNotice () {
      getMarkdown({
        hosCode: this.hosCode,
        label: 'depProclamation',
        bizType: 'DEPARTMENT',
        secondDept: this.secondDeptCode
      }).then(res => {
        if (res) {
          Session.set(`${this.secondDeptCode}_DEPTMENT`, true)
          this.showOverlay(res)
        }
      })
    },
    showOverlay (content) {
      this.$popup.open({
        title: '重要提示',
        content: content,
        btnText: '我知道了'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.boxShadow{
  box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.04);
}
.calendar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 0;
  &.paddingTop0{
    padding-bottom: 20px;
  }
  .m-icon{
    font-size: 24px;
    /deep/.desc{
      color: #5386FF;
    }
  }
  .title{
    color: #999;
    font-size: 24px;
    span{
      margin-right: 20px;
    }
  }
  h3{
    margin: 10px 0 0;
    color: #333333;
    font-size: 28px;
    font-weight: bold;
  }
}
/deep/.van-tabs{
  position: relative;
  [class*=van-hairline]::after{
    border: none;
  }
  .van-tabs__wrap{
    height: 80px;
    .van-tab span{
      height: 100%;
      line-height: 80px;
      font-size: 28px;
    }
  }
  .van-tabs__nav{
    background-color: transparent;
  }
}
</style>
