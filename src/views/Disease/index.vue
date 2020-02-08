<template>
  <v-page
    :show-header="false"
    :show-blue-head="false"
  >
    <div class="all-department">
      <department-search
        class="top-search"
        :show-action="true"
        search-content="dise"
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
import { fetchBody } from '@/api/special'
import DepartmentSearch from '@/components/Search'
import DeptList from '@/components/DeptList/disease'
export default {
  components: {
    DepartmentSearch,
    DeptList
  },
  data () {
    return {
      getList: [],
      deptmentList: []
    }
  },
  mounted () {
    this.getDepart()
  },
  methods: {
    getDepart () {
      fetchBody().then((res) => {
        this.deptmentList = res
      })
    },
    listClick (val) {
      if (val !== '0' && val !== 0) {
        this.$router.push({ path: '/disResult/' + val })
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
</style>
