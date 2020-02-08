<template>
  <div class="order-info">
    <head-tip text="挂号信息" />
    <source-info
      :soure-list="soureList"
      :is-border="true"
    />
    <m-icon
      name="tip"
      :desc="tipText"
    />
  </div>
</template>
<script>
import MIcon from '@/components/MIcon'
import HeadTip from '@/components/HeadTip'
import SourceInfo from '@/components/SourceInfo'
import { SOURCE_TIP } from '@/constants'
import { getHosConfirm } from '@/api/common'
import { mapMutations } from 'vuex'
export default {
  components: {
    MIcon,
    HeadTip,
    SourceInfo
  },
  props: {
    isPaySource: {
      type: Boolean,
      default: false
    },
    checkHosCard: {
      type: Function,
      default: () => ({})
    },
    hasLink: {
      type: Function,
      default: () => ({})
    },
    dutySourceId: {
      type: Function,
      default: () => ({})
    }
  },
  data () {
    return {
      soureList: [],
      sourceTip: Object.freeze(SOURCE_TIP),
      commonRegisterNotice: ''
    }
  },
  computed: {
    params () {
      return this.$route.params
    },
    tipText () {
      const status = this.isPaySource || this.commonRegisterNotice ? 'payTip' : 'noPayTip'
      return this.sourceTip[status]
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    ...mapMutations('confirm', ['SHOW_CARD_ITEM']),
    getInfo () {
      getHosConfirm({
        ...this.params
      }).then(res => {
        this.SHOW_CARD_ITEM(res.dataItem)
        this.soureList = [
          { name: '就诊日期', value: res.visitTime },
          { name: '就诊医院', value: res.hospitalName },
          { name: '就诊科室', value: res.departmentName },
          { name: '医生职称', value: res.doctorTitleName },
          { name: '医生专长', value: res.skill },
          { name: '医事服务费', value: res.totalFee + '元', dutyImgUrl: res.dutyImgUrl }
        ]
        // 如果needRemoteHospitalCard为true，表示需要获取医院就诊卡（即表示朝阳医院）
        if (res.needRemoteHospitalCard) {
          this.$emit('checkHosCard', res.needRemoteHospitalCard)
        }
        // 如果commonRegisterNotice有值，表示新医院，需要展示挂号预约须知
        if (res.commonRegisterNotice) {
          this.$emit('hasLink', res.commonRegisterNotice)
          this.commonRegisterNotice = res.commonRegisterNotice
        }
        this.$emit('dutySourceId', res.dutySourceId)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.order-info{
  .source-info{
    border: none;
  }
  .m-icon{
    display: block;
    padding-left: 30px;
    padding-bottom: 30px;
    font-size: 22px;
    color: #DDDDDD;
    .iconfont{
      font-size: 26px;
    }
  }
}
</style>
