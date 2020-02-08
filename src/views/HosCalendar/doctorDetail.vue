<template>
  <v-page
    :show-header="false"
  >
    <div class="doctor-detail">
      <doctor-desc
        :photo="doctorInfo.photo"
        :title="doctorInfo.title"
        :name="doctorInfo.name"
        :show-full-title="true"
      />
      <div
        class="content"
      >
        <div
          v-if="doctorInfo.title"
          class="detail_item"
        >
          <h5>职称职务</h5>
          <p>{{ doctorInfo.title }}</p>
        </div>
        <div
          v-if="doctorInfo.advantage"
          class="detail_item"
        >
          <h5>专业特长</h5>
          <p>{{ doctorInfo.advantage }}</p>
        </div>
        <div
          v-if="doctorInfo.academics"
          class="detail_item"
        >
          <h5>学术任职</h5>
          <p>{{ doctorInfo.academics }}</p>
        </div>
        <div
          v-if="doctorInfo.research"
          class="detail_item"
        >
          <h5>科学研究</h5>
          <p>{{ doctorInfo.research }}</p>
        </div>
        <div
          v-if="doctorInfo.award"
          class="detail_item"
        >
          <h5>表彰奖励</h5>
          <p>{{ doctorInfo.award }}</p>
        </div>
        <div
          v-if="doctorInfo.education"
          class="detail_item"
        >
          <h5>教育培训</h5>
          <p>{{ doctorInfo.education }}</p>
        </div>
      </div>
    </div>
  </v-page>
</template>
<script>
import DoctorDesc from '@/components/DoctorDesc'
import { doctorDetail } from '@/api/special'
export default {
  components: {
    DoctorDesc
  },
  data () {
    return {
      doctorInfo: {}
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    deptId () {
      return this.$route.params.deptId
    }
  },
  mounted () {
    this.getDoctorDetail()
  },
  methods: {
    getDoctorDetail () {
      doctorDetail(this.deptId, this.id).then(res => {
        this.doctorInfo = res
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  padding: 0 30px 60px;
  .detail_item{
    margin-top: 40px;
    font-size: 24px;
    h5{
      color: #999999;
      margin-bottom: 10px;
    }
    p{
      color: #333333;
      padding: 5px 0;
    }
  }
}
</style>
