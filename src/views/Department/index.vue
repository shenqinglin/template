<template>
  <v-page
    :show-header="false"
    class="fixed"
  >
    <div class="department">
      <!-- 医院信息组件 -->
      <hos-title
        :show-portrait="false"
        :show-button="true"
        :show-address="true"
        :shadow="true"
        :hos-detail="hosDetail"
      />
      <!-- 科室列表组件 -->
      <dept-list
        v-if="!serviceStatus"
        :dept-list="deptmentList"
        type="hos"
      />
      <!-- 医院维护中组件 -->
      <hos-service v-if="serviceStatus" />
    </div>
  </v-page>
</template>
<script>
import { getDeptList } from '@/api/common'
import HosTitle from './component/HosTitle'
import DeptList from '@/components/DeptList'
import HosService from './component/HosService'
import { getHosDetail, getMarkdown } from '@/api/common'
import { Session } from '@/utils/storage'
export default {
  name: 'Department',
  components: {
    HosTitle,
    DeptList,
    HosService
  },
  data () {
    return {
      name: 1,
      deptmentList: [], // 全部科室列表
      serviceStatus: false, // serviceStatus为false时，表示当前医院在维护中，不能挂号，显示维护中内容，默认是true
      hosDetail: {}
    }
  },
  computed: {
    hospitalId () {
      const { hospitalId } = this.$route.params
      return hospitalId
    }
  },
  destroyed () {
    this.$popup.close()
  },
  mounted () {
    // 查询医院信息
    this.gethosDetailFromId()
    // md查看医院提示
    const HOSPITAL_TIP = Session.get(`${this.hospitalId}_HOSPITAL`)
    if (!HOSPITAL_TIP) {
      this.checkoutHosNotice()
    }
  },
  methods: {
    getDept () {
      getDeptList(this.hospitalId).then(res => {
        this.deptmentList = res.list
      })
    },
    checkoutHosNotice () {
      getMarkdown({
        hosCode: this.hospitalId,
        label: 'hosProclamation',
        bizType: 'HOSPITAL'
      }).then(res => {
        if (res) {
          Session.set(`${this.hospitalId}_HOSPITAL`, true)
          this.showOverlay(res)
        }
      })
    },
    async gethosDetailFromId () {
      await getHosDetail(this.hospitalId).then((res) => {
        this.hosDetail = res
        this.hosDetail.fhTimes = '每日' + res.openTimeText + '开放第' + res.bookingRange + '日号源'
        this.serviceStatus = res.maintain
        if (!this.serviceStatus) {
          this.getDept()
        }
      })
    },
    showOverlay (content) {
      this.$popup.open({
        title: '医院提示',
        content: content,
        btnText: '我知道了'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.department{
  display: flex;
  flex-direction: column;
  height: calc(100% - 44px);
  background: #fff;
  z-index: 99;
}
.fixed{
  position: fixed;
}
</style>
