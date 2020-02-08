<template>
  <v-page
    :show-header="false"
  >
    <div class="dept-case">
      <div
        v-if="deptMap.subjectDesc"
        class="dept-charac"
      >
        <head-tip text="科室特色" />
        <p>{{ deptMap.subjectDesc }}</p>
      </div>
      <div
        v-if="docList.length!==0"
        class="technology"
      >
        <head-tip text="技术案例" />
        <dept-case-item
          v-for="(item,index) in docList"
          :key="index"
          :title="item.advantage"
          :content="item.content"
          :doc-list="item.doctorList"
        />
      </div>
      <no-search-result v-if="docList.length===0&&loaded&&!deptMap.subjectDesc" />
    </div>
  </v-page>
</template>
<script>
import HeadTip from '@/components/HeadTip'
import DeptCaseItem from '@/components/DeptCaseItem'
import NoSearchResult from '@/components/NoSearchResult'
import { specDeptDoctorList } from '@/api/special'
export default {
  name: 'Department',
  components: {
    HeadTip,
    DeptCaseItem,
    NoSearchResult
  },
  data () {
    return {
      deptMap: {},
      docList: [],
      loaded: false
    }
  },
  computed: {
    deptCode () {
      return this.$route.params.secondDept
    }
  },
  mounted () {
    specDeptDoctorList(this.deptCode).then(res => {
      this.deptMap = res.specDeptDoctorList
      this.docList = res.specDeptDoctorList.advantageList
      this.loaded = true
    })
  }
}
</script>
<style lang="less" scoped>
.dept-case{
  .dept-charac{
    p{
      padding: 40px 30px;
      font-size: 24px;
      color: #666;
      line-height:33px;
    }
  }
  .technology{
    background: #F6F6F6;
    .dept-case-item{
      background: #fff;
    }
  }
}
</style>
