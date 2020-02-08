<template>
  <div class="city-select-wrap border-bottom">
    <div class="label">
      {{ label }}
    </div>
    <div
      class="area-wrap"
      @click="onAddressClick"
    >
      <div
        v-if="!showPlaceholder"
        class="selected-name"
      >
        <span class="province area-name">
          {{ provinceName }}
        </span>
        <span class="city area-name">
          {{ cityName }}
        </span>
        <span class="area area-name">
          {{ areaName }}
        </span>
      </div>
      <div
        v-if="showPlaceholder"
        class="placeholder"
      >
        {{ placeholder }}
      </div>
    </div>
    <v-icon
      class="arrow-icon"
      name="right"
    />
    <!-- <one-pixel /> -->
    <van-popup
      v-model="showPopup"
      position="bottom"
    >
      <van-area
        v-if="areaVisible"
        ref="areaThree"
        :area-list="areaList"
        :value="selectedVal"
        @change="onAreaChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
/* eslint-disable camelcase */
// 父级组件监听onAddress事件
import { getProvinces, getCitys, getCountys } from '@/api/user'//
// import OnePixel from '@/components/OnePixel'
export default {
  components: {
    // OnePixel
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择户口所在地'
    }

  },
  data () {
    return {
      firstProvince: true,
      firstCity: true,
      selectedVal: '',
      showPopup: false, // 是否展示底部弹出层
      areaVisible: false, // 当第一层的数据全部渲染完成后再显示area组件
      provinceName: '',
      cityName: '',
      areaName: '',
      areaList: {
        province_list: {
        },
        city_list: {
        },
        county_list: {
        }
      }
    }
  },
  computed: {
    showPlaceholder () {
      const { provinceName, cityName, areaName } = this
      if (provinceName || cityName || areaName) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    showPopup (val) { // 点击地址，选择后关闭。再点开，随意选择了一个值（与之前不一样）,取消，再点开，保持当前已选中（qa）
      if (val === true) {
        const { areaThree } = this.$refs
        if (areaThree) {
          this.$refs.areaThree.reset(this.selectedVal)
        }
      }
    }
  },
  methods: {
    onAddressClick () { //  选择区域点击处理
      this.showPopup = true
      getProvinces().then(data => {
        data.forEach((obj) => {
          this.$set(this.areaList.province_list, [obj.code], obj.name)
          if (this.firstProvince === true) {
            this.renderCitys(data[0].code)
            this.firstProvince = false
          }
        })
      })
    },
    renderCitys (code) { // 渲染城市
      getCitys(code).then(data => {
        data.forEach(obj => {
          this.$set(this.areaList.city_list, [obj.code], obj.name)
        })
        this.renderCountry(data[0].code)
        if (this.firstCity === true) {
          this.renderCountry(data[0].code)
          this.firstCity = false
          this.areaVisible = true
        }
      })
    },
    renderCountry (code) { // 渲染地区
      getCountys(code).then(data => {
        data.forEach(obj => {
          this.$set(this.areaList.county_list, [obj.code], obj.name)
        })
      })
    },
    onAreaChange (picker, arr, index) { // 选项改变回调
      // console.log(arr, index)
      if (index === 0) {
        this.areaList.city_list = []
        this.areaList.county_list = []
        this.renderCitys(arr[index].code)
        // this.selectedVal = arr[index].code
      } else if (index === 1) {
        this.areaList.county_list = []
        this.renderCountry(arr[index].code)
      }
    },
    onConfirm (arr) { // 确认按钮点击
      // console.log(arr)
      const obj = {
        provinceCode: (arr[0] && arr[0].code) || -1,
        cityCode: (arr[1] && arr[1].code) || -1,
        areaCode: (arr[2] && arr[2].code) || -1
      }
      this.provinceName = arr[0] && arr[0].name
      this.cityName = arr[1] && arr[1].name
      this.areaName = arr[2] && arr[2].name
      this.selectedVal = arr[2].code
      this.closePopup()
      this.$emit('onAddress', obj)
    },
    onCancel (item) {
      // console.log(item)
      this.closePopup()
    },
    closePopup () { // 关闭弹出层
      this.showPopup = false
    }
  }
}
/* eslint-enable camelcase */
</script>

<style lang='less' scoped type='text/less'>
  .city-select-wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 98px;
    line-height: 98px;
    font-size: 26px;
    .area-wrap {
      height: 100%;
      flex:1;
      .placeholder {
        color:#DDDDDD;
        font-size: 26px;
      }
    }
    .label {
      width: 250px;
      color:#999999;
    }
    .arrow-icon {
      font-size: 26px;
      color:#999999;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 30px;
    }
    .area-name {
      margin-right: 6px;
    }
  }
  /deep/.van-popup--bottom {
    .van-picker-column__item {
      font-size: 26px;
    }
    .van-picker__toolbar {
      padding: 10px 0;
    }
    .van-picker__cancel, .van-picker__confirm {
      font-size: 28px;
    }
  }

</style>
