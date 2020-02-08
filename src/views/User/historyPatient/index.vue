<template>
  <v-page
    class="home history"
    :show-header="false"
  >
    <div class="history-patient-wrap">
      <div class="head-tip-wrap">
        <div class="tip-title">
          历史就诊人
        </div>
        <div class="little-tip">
          历史就诊人可操作“恢复”，恢复后可使用该就诊人进行挂号
        </div>
      </div>
      <div
        v-if="historyList.length>0"
        class="card-list"
      >
        <history-card
          v-for="item in historyList"
          :key="item.cardNo"
          :obj="item"
          @delSuccess="onDelSuccess"
        />
      </div>
    </div>
  </v-page>
</template>

<script>
import HistoryCard from './HistoryCard'
import { historyPatientList } from '@/api/user'
export default {
  components: {
    HistoryCard
  },
  data () {
    return {
      historyList: []

    }
  },
  created () {
    this.getHistory()
  },
  methods: {
    onDelSuccess () { // 删除一个历史就诊人成功事件监听
      this.getHistory()
    },
    getHistory () {
      historyPatientList().then(data => {
        const vm = this
        if (data.list.length === 0) { // 若没有历史就诊人就回到就诊人列表页
          vm.$toast({
            message: '您没有历史就诊人',
            onClose () {
              vm.$router.replace({
                name: 'patient'
              })
            }
          })
        } else {
          this.historyList = data.list
        }
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .history.v-page {
    background-color: #F6F6F6;
  }
  .history-patient-wrap {
    margin: 0 30px;
    .head-tip-wrap {
      margin-top: 30px;
      .tip-title {
        color: #666666;
        font-size: 28px;
      }
      .little-tip {
        color: #999999;
        font-size: 22px;
        margin-top: 4px;
      }
    }
  }
</style>
