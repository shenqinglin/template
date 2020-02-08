<template>
  <div class="expert">
    <doctor-desc
      v-for="(item,index) in doctor"
      :key="item.doctorId"
      :photo="item.photo"
      :title="item.title"
      :duty="index===0? item.duty:''"
      :name="item.name"
      :specialty="item.specialty"
      :show-right="true"
      :show-more="true"
      :show-title="index===0"
      @click.native="toDoctorIndex(item.doctorId)"
    />
    <no-search-result v-if="doctor.length===0&&loaded" />
  </div>
</template>
<script>
import NoSearchResult from '@/components/NoSearchResult'
import DoctorDesc from '@/components/DoctorDesc'
import { doctorList } from '@/api/special'
export default {
  components: {
    DoctorDesc,
    NoSearchResult
  },
  data () {
    return {
      doctor: [],
      loaded: false
    }
  },
  computed: {
    deptCode () {
      return this.$route.params.secondDeptCode
    }
  },
  mounted () {
    this.getDoctorList()
  },
  methods: {
    getDoctorList () {
      doctorList(this.deptCode).then(res => {
        this.doctor = res
        this.loaded = true
      })
    },
    toDoctorIndex (id) {
      this.$router.push(`doctorIndex/${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.expert{
  .doctor-desc:last-child{
    border: none;
  }
}
</style>
