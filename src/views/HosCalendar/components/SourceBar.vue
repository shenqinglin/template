<template>
  <div
    v-if="listIndex <= showIndexPosition"
    :class="listIndex===showIndexPosition?'source-bar borderNone':'source-bar'"
  >
    <div
      v-if="doctorInfo.photo"
      class="doc_photo"
    >
      <img
        :src="doctorInfo.photo"
        alt=""
        :onerror="defaultImg"
      >
    </div>
    <div class="list_left">
      <div class="list_parent">
        <span class="doc_name">{{ doctorInfo.doctorTitleName }}</span><span
          v-if="doctorInfo.doctorName"
          class="doc_tit_common"
        >{{ doctorInfo.doctorName }}</span>
        <div
          :class="defaultClass"
          @click="defaultClass='doc_des allDes'"
        >
          <span>{{ doctorInfo.doctorSkill || doctorInfo.skill }}</span>
        </div>
        <!-- <v-icon name="open" /> -->
      </div>
    </div>
    <div
      :class="doctorInfo.wnumber % 2 !== 0?'list_center hosCode':doctorInfo.znumber % 2 !== 0?'list_center phone':'list_center fullFee'"
    >
      ￥<magic-number
        :url="dutyImgUrl"
        :value="doctorInfo.fcode"
      />
    </div>
    <div
      :class="doctorInfo.wnumber % 2 !== 0?'list_right hasCode':doctorInfo.znumber % 2 !== 0?'list_right phone':'list_right Datefull'"
    >
      <div
        v-if="doctorInfo.wnumber % 2 === 0 && doctorInfo.znumber % 2 === 0"
        class="surplus"
      >
        <p class="full">
          约满
        </p>
      </div>
      <div
        v-if="doctorInfo.wnumber % 2 !== 0"
        class="surplus"
        @click="doctorInfo.period.length > 0 ? showPart(doctorInfo.period) : toConfirm(doctorInfo)"
      >
        <span>剩余</span>
        <magic-number
          :url="dutyImgUrl"
          :value="doctorInfo.ncode | formatNCode"
        />
      </div>
      <div
        v-if="doctorInfo.wnumber % 2 === 0 && doctorInfo.znumber % 2 !== 0"
        class="surplus surplued"
      >
        <a href="tel:010114">
          <span>电话</span>
          <span class="num">挂号</span>
        </a>
      </div>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
    >
      <v-icon
        class="closeBtn"
        name="close"
        @click.native="closeBtn"
      />
      <time-part
        :time-part-list="partList"
        :duty-img-url="dutyImgUrl"
      />
    </van-popup>
  </div>
  <div
    v-else-if="showIndexPosition+1 === listIndex"
    class="showAll"
    @click="showMoreAll"
  >
    查看全部
  </div>
</template>
<script>
import TimePart from './TimePart'
import MagicNumber from '@/components/MagicNumber'
import { checkAuthStatus } from '@/api/common'
import { STATIC_URL } from '@/config'
import { mapState } from 'vuex'
export default {
  components: {
    TimePart,
    MagicNumber
  },
  filters: {
    formatNCode (val) {
      return val.indexOf('-') > -1 ? '1' : val
    }
  },
  props: {
    showIndexPosition: {
      type: Number,
      default: 100
    },
    listIndex: {
      type: Number,
      default: 100
    },
    showAll: {
      type: Function,
      default: () => {}
    },
    doctorInfo: {
      type: Object,
      default: () => {}
    },
    dutyImgUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false,
      partList: [],
      defaultClass: 'doc_des'
    }
  },
  computed: {
    ...mapState('source', ['sIndex', 'sourceList', 'selectDate']),
    defaultImg () {
      const url = `${STATIC_URL}/img/docDefault.png`
      return 'this.src="' + url + '"'
    }
  },
  watch: {
    sIndex (val) {
      this.defaultClass = 'doc_des'
    }
  },
  mounted () {
    // this.$dialog.alert({
    //   message: '弹窗内容'
    // })
  },
  methods: {
    showMoreAll () {
      this.$emit('showAll')
    },
    showPart (detail) {
      this.partList = detail
      this.show = true
    },
    toConfirm (detail) {
      checkAuthStatus().then(res => {
        if (res.authStatus === 'OK') {
          const { hosCode, firstDeptCode, secondDeptCode } = this.$route.params
          this.$router.push(`/confirm/${hosCode}/${firstDeptCode}/${secondDeptCode}/${this.selectDate}/${detail.uniqProductKey}/0`)
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
      })
    },
    closeBtn () {
      this.show = false
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
.source-bar{
  position: relative;
  overflow: hidden;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px 30px 10px 0px;
  margin-left: 30px;
  background-color: #fff;
  .border-bottom;
  /* .border-1px(#eee); */
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  &.borderNone:after{
    border: none;
  }
  &:last-child:after{
    border: none;
  }
  &:last-child:before {
    content: none;
  }
  .doc_photo{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 20px;
    overflow: hidden;
    img{
      width: 100px;
    }
  }
  .list_left{
    width: 350px;
    flex-grow: 1;
    .list_parent{
      position: relative;
      .doc_name{
        padding-right: 20px;
        font-size: 28px;
        font-weight: 600;
        color: #333333;
      }
      .doc_tit_common{
        padding: 0 0 0 20px;
        font-size: 24px;
        color: #666666;
        border-left: 1px solid #D8D8D8;
      }
      .doc_des{
        margin-top: 4px;
        font-size: 24px;
        color: #999;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        &.allDes{
          -webkit-line-clamp: inherit;
        }
      }
    }
  }
  .list_center{
    width: 108px;
    height: 120px;
    padding-left: 20px;
    line-height: 120px;
    text-align: center;
    margin: 0 10px;
    color: #5386FF;
    font-weight: 600;
    font-size: 28px;
    &.fullFee{
      color: #ddd;
    }
    &.phone{
      color: #52CC53;
    }
    &.hosCode{
      color: #5386FF;
    }
  }
  .list_right{
    width: 80px;
    height: 80px;
    background-color: #5386FF;
    border-radius: 6px;
    font-size: 24px;
    color: #fff;
    &.phone{
      background: #52CC53;
    }
    span{
      display: block;
      text-align: center;
      line-height: 32px;
      color: #fff;
    }
    &.Datefull{
      background: #ddd;
    }
    .surplus{
      color: #4dc3e9;
      span:nth-child(1){
        height: 40px;
        line-height: 50px;
      }
      span:nth-child(2){
        height: 40px;
        line-height: 30px;
      }
      .full{
        display: block;
        height: 80px;
        line-height: 80px;
        color: #fff;
        text-align: center;
      }
      &.surplued{
        span:nth-child(1){
          height: 40px;
          line-height: 45px;
        }
        span:nth-child(2){
          height: 40px;
          line-height: 35px;
        }
      }
    }
  }
}
.showAll{
  height: 80px;
  line-height: 48px;
  color: #5386FF;
  font-size: 24px;
  text-align: center;
}
</style>
