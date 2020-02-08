<template>
  <div class="hospital-list-top">
    <div
      class="hos-top-left"
      @click="address"
    >
      <m-icon
        :icon-liftshow="false"
        class="hos-address"
        name="open"
        :desc="addResult"
      />
    </div>
    <div class="hos-top-right">
      <div
        :class="classLeve"
        @click="clickLevel"
      >
        <m-icon
          v-if="!showAdress"
          :icon-liftshow="false"
          name="level"
          desc="按等级"
        />
      </div>
      <div
        :class="classPosition"
        @click="clickDistance"
      >
        <m-icon
          v-if="!showAdress"
          :icon-liftshow="false"
          name="distance"
          desc="按距离"
        />
      </div>
    </div>
    <div
      v-if="showAdress"
      class="hos-address-tc"
      @touchmove.prevent
    >
      <div class="hos-address-box">
        <ul>
          <li
            v-for="(item,index) in addlsit"
            :key="index"
            :class=" tabIndex == index? 'active' : ''"
            @click="activeEvent(index,item.key,item.value)"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
      <div
        class="bg"
        @click="closeAdress"
      />
    </div>
  </div>
</template>

<script>
import mIcon from '@/components/MIcon'
import { fetchCommonEnum } from '@/api/common.js'
export default {
  name: 'HomeCenterSelect',
  components: {
    mIcon
  },
  props: {
    value: {
      type: String,
      default: 'LEVEL'
    }
  },
  data () {
    return {
      showAdress: false,
      tabIndex: 0,
      addResult: '按区域',
      addlsit: []
    }
  },
  computed: {
    classLeve () {
      return {
        'hos-top-samll': true,
        'hos-top-active': this.value === 'LEVEL'
      }
    },
    classPosition () {
      return {
        'hos-top-samll': true,
        'hos-top-active': this.value === 'POSITION'
      }
    }
  },
  mounted () {
    this.getCommonEnum()
  },
  methods: {
    address () {
      this.showAdress = !this.showAdress
    },
    closeAdress () {
      this.showAdress = false
    },
    activeEvent (index, id, name) {
      // document.getElementsByClassName('content-container')[0].scrollTop = 0 // 返回顶部
      this.tabIndex = index
      this.showAdress = false
      this.addResult = name
      this.$emit('areaId', id)
    },
    clickLevel () { // 点击按等级排序
      // document.getElementsByClassName('content-container')[0].scrollTop = 0 // 返回顶部
      this.currerActive = 'LEVEL'
      this.$emit('input', this.currerActive)
    },
    clickDistance () { // 点击按距离排序
      // document.getElementsByClassName('content-container')[0].scrollTop = 0 // 返回顶部
      this.currerActive = 'POSITION'
      this.$emit('input', this.currerActive)
    },
    getCommonEnum () {
      fetchCommonEnum('HOS_AREA').then((res) => {
        this.addlsit = res.enums.HOS_AREA
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.hospital-list-top {
  position: relative;
  .hos-top-left {
    float: left;
  }
}
.hos-address-tc {
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  min-height: 1640px;
  height:100%;
  .hos-address-box {
    z-index: 11;
    width: 100%;
    background: @backgroundColorWhiter;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 20px;
    border-top-left-radius:0;
    border-top-right-radius:0;
    ul {
      padding-left: 10px;
      padding-top: 30px;
      padding-bottom: 20px;
      overflow: hidden;
      li {
        width: 150px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        float: left;
        border-radius: 10px;
        border:1PX solid #eee;
        margin-left: 23px;
        margin-bottom: 20px;
        font-size: 24px;
      }
      li.active {
        float: left;
        border-radius: 10px;
        border:1PX solid @borderCorlorBlue;
        color: @fontColorBlue;
        background: @backgroundColorBluer;
      }
    }
  }
  .bg {
    z-index: 10;
    background-color: @backgroundColorBlack;
    position: absolute;
    left: 0;
    top: 0;
    opacity:0.4;
    width: 100%;
    height: 100%;
  }
}

/deep/ .hos-address {
  float: left;
  padding-left: 30px;
  span {
    color: #ccc;
    font-size: 20px;
    margin-left: 10px;
  }
  span:first-child {
    color: #666;
    font-size: 28px;
    display: inline-block;
  }
}
/deep/ .hos-top-right {
  padding-top: 5px;
  float: right;
  .hos-top-samll {
    float: left;
    margin-right: 30px;
    font-size: 24px;
  }
  .hos-top-active {
    .m-icon{
      color: #333;
    }
  }
}
</style>
