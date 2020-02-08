<template>
  <div class="doctor-index">
    <doctor-desc
      :photo="doctorInfo.photo"
      :title="doctorInfo.title"
      :name="doctorInfo.name"
      :specialty="doctorInfo.specialty"
      :show-right="true"
      @click.native="doctorDetail"
    />
    <special-source-bar
      v-for="(item,index) in sourceList"
      :key="index"
      :duty-date="item.dutyDate"
      :duty-code="item.dutyCode"
      :duty-state="item.dutyStatus"
      :week-code="item.weekCode"
      @click.native="toConfirm(item)"
    />
    <no-search-result
      v-if="sourceList.length===0&&loaded"
    />
  </div>
</template>
<script>
import NoSearchResult from '@/components/NoSearchResult'
import DoctorDesc from '@/components/DoctorDesc'
import SpecialSourceBar from '@/components/SpecialSourceBar'
import { doctorDetail, doctorDutyList } from '@/api/special'
export default {
  components: {
    DoctorDesc,
    SpecialSourceBar,
    NoSearchResult
  },
  data () {
    return {
      doctorInfo: {},
      sourceList: [],
      loaded: false
    }
  },
  computed: {
    doctorId () {
      return this.$route.params.id
    },
    deptId () {
      return this.$route.params.secondDeptCode
    }
  },
  mounted () {
    this.getDoctorDetail()
    this.getDoctorDutyList()
  },
  methods: {
    getDoctorDetail () {
      doctorDetail(this.deptId, this.doctorId).then(res => {
        this.doctorInfo = res
      })
    },
    getDoctorDutyList () {
      doctorDutyList(this.deptId, this.doctorId).then(res => {
        this.sourceList = res
        this.loaded = true
      })
    },
    doctorDetail () {
      this.$router.push(`/doctorDetail/${this.deptId}/${this.doctorId}`)
    },
    toConfirm (detail) {
      const { hosCode, firstDeptCode, secondDeptCode } = this.$route.params
      this.$router.push(`/confirm/${hosCode}/${firstDeptCode}/${secondDeptCode}/${detail.dutyDate}/${detail.uniqProductKey}/0`)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
