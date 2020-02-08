<template>
  <div class="cards-wrap border-bottom">
    <div class="label">
      {{ label }}
    </div>
    <van-action-sheet
      v-model="isShow"
      :actions="selectActions"
      @select="onSelect"
    />
    <div
      class="select-wrap"
      @click="showMenu"
    >
      <span
        v-show="isPlaceholder"
        class="dir-span placeholder"
      >
        {{ placeholder }}
      </span>
      <span
        v-show="!isPlaceholder"
        class="dir-span selected-text"
      >
        {{ selectedText }}
      </span>
    </div>
    <v-icon
      class="arrow-icon"
      name="right"
    />
  </div>
</template>

<script>
/* 选项对象参数必须为对象数组，每一项的name为显示的option，
  其它值可自定义。父组件里双项绑定的键通过绑定valueKey prop设定，
  默认回传选项对象数组里项的value值.父组件里监听select事件接收参数为当前选中对象 */
export default {
  model: {
    prop: 'optionVal',
    event: 'onOption'
  },
  props: {
    selectActions: { // 下拉选项
      type: Array,
      default: _ => []
    },
    valueKey: { // 双向绑定选项的哪个键
      type: String,
      default: ''
    },
    label: { // 左侧的label
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      selectedText: '请选择证件类型',
      selectedVal: '',
      isShow: false, // 向上弹出层
      isPlaceholder: true // 是否显示placeholder
    }
  },
  methods: {
    onCardClick (card) {
      this.selected = card.text
      this.$emit('select', card)
    },
    onSelect (item) {
      const valueKey = this.valueKey || 'value'
      this.selectedText = item.name
      this.optionVal = item.value
      this.isShow = false
      this.$emit('onOption', item[valueKey])
      this.$emit('selecting', item)
      this.isPlaceholder = item.value === -1
    },
    showMenu () {
      this.isShow = true
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  @import '~@/assests/styles/common.less';
  .van-cell {
    padding: 0;
  }
  .cards-wrap {
    box-sizing: border-box;
    height: 98px;
    .border-1px(#eee);
    display: flex;
    align-items: center;
    position: relative;
    .label {
      font-size: 26px;
      color: #999999;
      width: 250px;
      line-height: 98px;
    }
    .arrow-icon {
      position:absolute;
      right: 30px;
      top: 50%;
      transform: translate(0,-50%);
      color: #999999;
      font-size: 26px;
    }
    .select-wrap {
      flex:1;
      .dir-span {
        color: #DDDDDD;
        font-size: 26px;

        &.selected-text {
          color: #333333;
          width: 410px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    /deep/.van-popup--bottom.van-popup--round {
      .van-action-sheet__item {
        height: 80px;
        color:#666;
        font-size: 30px;
      }
    }
  }
</style>
