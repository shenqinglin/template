<template>
  <div class="history-card-inner-wrap">
    <card-left
      class="history-left"
      :name="obj.patientName"
      :id-type="obj.patientIdTypeText"
      :id-no="obj.patientIdNoText"
    />
    <div class="cancel-reason">
      <div class="reason-text">
        {{ obj.unbindReasonMsg }}
      </div>
      <div class="handel-btn">
        <card-btn
          v-if="obj.status === 'OK' "
          text="恢复"
          @touchend.native="onRestore"
        />
        <card-btn
          class="del-btn"
          text="删除"
          @touchend.native="onDel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardLeft from '@/components/CardLeft'
import CardBtn from '@/components/CardBtn'
import { delPatient, activePatient } from '@/api/user'
export default {
  components: {
    CardLeft, CardBtn
  },
  props: {
    obj: {
      type: Object,
      default: _ => ({})
    }
  },
  data () {
    return {
    }
  },
  methods: {
    onRestore () { // 点击恢复
      // console.log(this.obj)
      const { patientIdNo, patientIdType } = this.obj
      activePatient({ idNo: patientIdNo, idType: patientIdType }).then(data => {
        const vm = this
        vm.$toast({
          message: '恢复成功',
          onClose () {
            // vm.$emit('delSuccess')
            vm.$toast({
              message: '恢复成功',
              onClose () {
                vm.$router.replace({
                  name: 'patient'
                })
              }
            })
          }
        })
      })
    },
    onDel () {
      this.$dialog.confirm({
        title: '',
        message: '确定删除此就诊人',
        closeOnPopstate: true // 按返回按钮时弹出关闭
      }).then(_ => {
        this.delPatient()
      }).catch(_ => {
        // this.$toast("已取消删除操作")
      })
    },
    delPatient () {
      const { patientIdType, patientIdNo } = this.obj
      delPatient({
        idNo: patientIdNo,
        idType: patientIdType,
        isHistory: true
      }).then(data => {
        const vm = this
        vm.$toast({
          message: '删除成功',
          onClose () {
            // vm.$emit('delSuccess')
            vm.$router.replace({
              name: 'patient'
            })
          }
        })
      })
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
@import '~@/assests/styles/common.less';
  .history-left {
    padding-bottom: 16px;
  }
  .history-card-inner-wrap {
    width: 690px;
    box-sizing: border-box;
    border-radius:25px;
    background-color: #fff;
    margin-top: 30px;
    padding: 26px 40px 17px;
    .cancel-reason {
      /* border-top: 1px solid #eeeeee; */
      .border-top(#eee);
      padding-top: 10px;
      color:#FF5F5F;
      font-size: 22px;
      .handel-btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 18px;
        .del-btn {
          margin-left: 30px;
        }
      }
    }
  }

</style>
