<template>
  <v-up-select
    :label="label"
    :placeholder="placeholder"
    :show-placeholder="showPlaceholder"
    @onMiddleClick="onMiddleClick"
  >
    <div
      slot="middle-content"
      class="middle-content"
    >
      <span class="selected-content">{{ nationality }}</span>
    </div>
    <div slot="component">
      <van-popup
        v-model="isShow"
        position="bottom"
      >
        <van-picker
          class="select-picker"
          show-toolbar
          :columns="list"
          value-key="value"
          :visible-item-count="4"
          @cancel="isShow = false"
          @confirm="onSelect"
        />
      </van-popup>
    </div>
  </v-up-select>
</template>

<script>
import VUpSelect from '@/components/VUpSelect'
import { fetchCommonEnum } from '@/api/common'
export default {
  components: {
    VUpSelect
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    enumKey: {
      type: String,
      default: ''
    },
    outRender: { // 是否选用外部数组渲染（当一个页面多次用到该组件时，或者多次用到同一个枚举值时，第二次请求可能被cancel）
      type: Boolean,
      default: false
    },
    renderArr: {
      type: Array,
      default: _ => ([])
    }
  },
  data () {
    return {
      showPlaceholder: true,
      isShow: false, // 是否展示弹出菜单
      nationality: '', // 中国||外国
      list: []
    }
  },
  watch: {
    renderArr: {
      deep: true,
      handler (val) {
        if (this.outRender === true) {
          this.list = val
        }
      }
    }
  },
  created () {
    this.renderPicker()
  },
  methods: {
    renderPicker () {
      const { outRender, enumKey } = this
      if (outRender === true) {
        return // 选用外部数组渲染
      }
      if (!enumKey) {
        this.$toast('枚举key null error')
        return
      }
      fetchCommonEnum([enumKey]).then(data => {
        this.list = data.enums[enumKey]
      })
    },
    onMiddleClick () { // 监听到中间内容点击时
      this.isShow = true
    },
    onSelect (val) {
      this.nationality = val.value
      this.showPlaceholder = false
      this.$emit('input', val.key)
      this.$emit('onOptionTouch', val)
      this.isShow = false
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .middle-content {
    &>span {
      display: inline-block;
      line-height:initial;
      margin-right: 25px;
      &:last-child {
        margin-right: 0;
      }
    }
    .selected-content {
      width: 410px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  /deep/.van-popup--bottom.van-popup--round {
    .van-action-sheet__cancel, .van-action-sheet__item {
      height: 80px;
      line-height: 80px;
      font-size: 28px;
    }
  }
  /*解决ios渐变不生效*/
  /deep/.van-hairline-unset--top-bottom:after {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    border: 1PX solid #ebedf0;
    -webkit-transform: scale(.5);
    transform: scale(.5);
  }
  /deep/.van-picker {
    .van-picker-column__item {
      color: #999;
    }
    .van-picker-column__item.van-picker-column__item--selected {
      color:#000;
    }
  }
</style>
