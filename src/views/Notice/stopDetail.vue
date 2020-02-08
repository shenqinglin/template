<template>
  <v-page
    :show-header="false"
  >
    <div class="detail">
      <h3>{{ detail.title }}</h3>
      <p class="border-bottom">
        自即日起，{{ detail.hospitalName }}{{ detail.departmentName }}因为特殊原因停诊，给您带来的不便敬请谅解。
      </p>
      <div class="content">
        <label-line
          v-for="(items,index) in list"
          :key="index"
          :label="items.name"
          :info="items.value"
          :blod="items.blod"
        />
      </div>
      <div class="right">
        {{ detail.hospitalName }}
      </div>
      <div class="right">
        {{ detail.dutyDate | formatDate }}
      </div>
    </div>
  </v-page>
</template>
<script>
import { getDutyOffNotice } from '@/api/common'
import { dateToCN } from '@/utils/date'
import LabelLine from '@/components/LabelLine'
export default {
  components: {
    LabelLine
  },
  filters: {
    formatDate (val) {
      if (!val) {
        return
      }
      return dateToCN(val)
    }
  },
  data () {
    return {
      params: {
        orderType: 'NONE',
        id: ''
      },
      detail: {},
      list: []
    }
  },
  mounted () {
    this.params.id = this.$route.params.id
    this.getDetail()
  },
  methods: {
    getDetail () {
      getDutyOffNotice(this.params).then(res => {
        this.detail = res
        const list = [
          {
            name: '日期',
            value: res.dutyDate
          },
          {
            name: '星期',
            value: res.dutyWeekDay
          },
          {
            name: '时段',
            value: res.dutyCodeDesc
          },
          {
            name: '科室',
            value: res.departmentName
          },
          {
            name: '特长',
            value: res.doctorSkill
          },
          {
            name: '职称',
            value: res.doctorTitleName
          },
          {
            name: '医事服务费',
            value: res.totalFee / 100
          },
          {
            name: '状态',
            value: '停诊'
          },
          {
            name: '替换方式',
            value: res.replaceWay
          }
        ]
        this.list = list
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail{
  padding: 40px 30px 30px;
  h3{
    font-size: 28px;
    color: #333333;
    font-weight: bold;
    text-align: center;
  }
  p{
    margin: 40px 0 40px;
    padding-bottom: 40px;
    font-size: 28px;
    color: #999999;
  }
  .content{
    margin-bottom: 60px;
  }
  .right{
    color: #999999;
    margin-right: 10px;
    margin-bottom: 20px;
    font-size: 22px;
    text-align: right;
  }
}
</style>
