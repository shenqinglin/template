<template>
  <div class="time-part">
    <h3>请选择就诊时段挂号</h3>
    <ul>
      <li
        v-for="(item,index) in timePartList"
        :key="index"
        :class="item.remainAvailableNumber%2===0?'forbid':''"
        @click="toConfirm(item)"
      >
        <span>{{ item.dutyTimeView }}</span>
        <span class="surplusCode">
          剩余<magic-number
            :url="dutyImgUrl"
            :value="item.wcode | formatNCode"
          />
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import MagicNumber from '@/components/MagicNumber'
import { checkAuthStatus } from '@/api/common'
import { mapState } from 'vuex'
export default {
  components: {
    MagicNumber
  },
  filters: {
    formatNCode (val) {
      return val.indexOf('-') > -1 ? '1' : val
    }
  },
  props: {
    timePartList: {
      type: Array,
      default: () => []
    },
    dutyImgUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('source', ['selectDate']),
    hosCode () {
      return this.$route.params.hosCode
    },
    firstDeptCode () {
      return this.$route.params.firstDeptCode
    },
    secondDeptCode () {
      return this.$route.params.secondDeptCode
    }
  },
  methods: {
    toConfirm (val) {
      checkAuthStatus().then(res => {
        if (res.authStatus === 'OK') {
          this.$router.push(`/confirm/${this.hosCode}/${this.firstDeptCode}/${this.secondDeptCode}/${this.selectDate}/${val.uniqProductKey}/${val.dutyTime}`)
        } else {
          this.$dialog({
            message: res.message,
            confirmButtonText: '去实名',
            closeOnPopstate: true // 按返回按钮时弹出关闭
          }).then(() => {
            this.$router.push({
              name: 'auth',
              query: {
                redirect: this.$route.fullPath
              }
            })
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.time-part{
  min-height: 500px;
  padding: 0 30px 30px;
  background: #F6F6F6;
  h3{
    padding: 22px 0 36px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    color: #333;
  }
  ul{
    overflow: hidden;
    max-height: 700px;
    overflow-y: auto;
  }
  li{
    float: left;
    width:270px;
    height:78px;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 30px;
    line-height: 78px;
    background:fff;
    border-radius:20px;
    background: #fff;
    text-align: center;
    font-size: 28px;
    color: #666;
    &:nth-child(odd){
      margin-right: 30px;
    }
    span:nth-child(2){
      color: #DDDDDD;
      font-size: 22px;
      line-height: 72px;
    }
    .surplusCode>span{
      margin-left: 4px;
      color: #333333;
      font-size: 28px;
    }
    &.forbid{
      background: #EEEEEE;
      span{
        color: #ddd;
        b{
          color: #ddd;
        }
      }
    }
  }
}
</style>
