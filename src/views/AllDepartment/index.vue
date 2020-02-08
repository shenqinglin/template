<template>
  <v-page
    :show-header="false"
    :show-blue-head="false"
    class="fixed"
  >
    <div class="all-department">
      <department-search
        class="top-search"
        :show-action="true"
        search-content="dep"
        @listClick="listClick"
      />
      <dept-list
        :dept-list="deptmentList"
        type="all"
      />
    </div>
  </v-page>
</template>
<script>
import { getAllDeptList } from '@/api/common'
import DepartmentSearch from '@/components/Search'
import DeptList from '@/components/DeptList'
export default {
  components: {
    DepartmentSearch,
    DeptList
  },
  data () {
    return {
      getList: [],
      deptmentList: [],
      height: 0
    }
  },
  mounted () {
    this.getDepart()
  },
  methods: {
    getDepart () {
      getAllDeptList().then((res) => {
        this.deptmentList = res.list
      })
    },
    listClick (val) {
      if (val !== '0' && val !== 0) {
        this.$router.push({
          path: '/depsearch',
          query: {
            departmentId: val
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.all-department{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.fixed{
  position: fixed;
}
</style>
