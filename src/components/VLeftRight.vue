<template>
  <div
    class="left-right-wrap border-bottom"
    :class="classObj"
  >
    <div class="left">
      {{ label }}
    </div>
    <div class="right">
      <span
        v-if="!type"
        class=" default-value right-child"
      >{{ val }}</span>
      <phone-separate
        v-if="type==='phoneSeparate'"
        :tel="val"
      />
      <input
        v-if="type==='input'||type==='phoneInput'"
        ref="valFile"
        v-model="textVal"
        class="input-val"
        type="text"
        :placeholder="newPlaceholder"
        :maxlength="newMaxlength"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
      >
      <v-icon
        v-if="showClearIcon"
        name="clear"
        class="clear-icon"
        @touchend.native="onIconClear"
      />
      <div
        v-if="type==='radio'"
        class="radio-wp"
      >
        <div
          v-for="(radio,index) in radios"
          :key="index"
          class="radio-item"
          :class="radio.value===currentRadioVal?'current-radio':''"
          @click="onRadioClick(radio)"
        >
          {{ radio.value }}
        </div>
      </div>
    </div>
    <slot />
    <!-- <one-pixel /> -->
  </div>
</template>

<script>
/*  1、添加class：no-border控制无边框、null-val控制val字段灰色
  2、props：label:左侧label文案;val:右侧文案；maxlength:val最大长度；placeholder：空值提示
    type:见4
  3、可实现与父级组件的双向绑定，即支持父组件v-model
  4、prop type：空时只展示左右文案;input时可进行输入;phoneInput时只能输入11位数字 */
import PhoneSeparate from '@/components/PhoneSeparate'
// import OnePixel from '@/components/OnePixel'
export default {
  components: {
    PhoneSeparate // OnePixel
  },
  model: {
    prop: 'inputVal',
    event: 'notice'
  },
  props: {
    inputVal: {
      type: [String, Boolean],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    val: {
      type: String,
      default: ''
    },
    type: { // 如果需要展示输入框，需要传入此prop
      type: String,
      default: '' // input|select|radio
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    maxlength: {
      type: Number,
      default: 1000
    },
    radios: {
      type: Array,
      default: _ => []
    },
    autoFocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newMaxlength: 1000,
      textVal: this.inputVal,
      currentRadioVal: '', // 当前选中的radio的value
      defaultKey: true
    }
  },
  computed: {
    newPlaceholder () {
      return this.placeholder
    },
    showClearIcon () {
      const { type, textVal, defaultKey } = this
      return (type === 'input' || type === 'phoneInput') && textVal && defaultKey
    },
    classObj () {
      const { type } = this
      return {
        'high-default-wrap': type === 'phone-separate' || type === '',
        'input-wrap': type === 'input' || type === 'phoneInput' || type === 'radio'
      }
    }
  },
  watch: {
    inputVal (val) {
      this.textVal = val
    },
    autoFocus (val) { // 自动获得焦点
      if (val === true) {
        // console.log(JSON.parse(JSON.stringify(this.$refs)))
        this.$nextTick(_ => {
          this.$refs.valFile.focus()
        })
      }
    }
  },
  created () {
    this.newMaxlength = this.type === 'phoneInput' ? 11 : this.maxlength
  },
  methods: {
    onInput () {
      if (this.type === 'phoneInput') {
        this.validatePhone()
      }
      this.passParentVal()
    },
    passParentVal () { // 触发父级的数据变化&事件
      this.$emit('notice', this.textVal)
      this.$emit('input', this.textVal)
    },
    validatePhone () {
      this.textVal = this.textVal.replace(/\D/g, '')
    },
    onRadioClick (item) { // 单选按钮点击，触发父组件的绑定值更新，触发click监听函数
      this.currentRadioVal = item.value
      this.$emit('notice', item.key)
      this.$emit('click', item)
    },
    onIconClear (ev) { // 清除icon点击时
      this.textVal = ''
      // console.log(ev)
      this.passParentVal()
      ev.preventDefault()
      ev.stopPropagation()
      return false
    },
    onBlur () {
      setTimeout(_ => {
        this.defaultKey = false
      }, 30)
    },
    onFocus () {
      this.defaultKey = true
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  @import '~@/assests/styles/common.less';
  .clear-icon {
    font-size: 30px;
    color: #EEEEEE;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
  }
  .left-right-wrap {
    /* .border-1px(#eee); */
    /* .border-bottom; */
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    font-size: 26px;
    &.no-border {
      border-bottom: 0;
      /deep/.one-pixel {
        height: 0;
      }
    }
    &.no-border:after {
      content:none;
    }
    &.no-border:before {
      content:none;
    }
    &.input-wrap,&.high-default-wrap { /*输入框和实名认证页的结构军师98高*/
      height: 98px;
      line-height: 98px;
    }
    &.default-wrap { /*解决就诊人详情页联系人信息样式*/
      height: 37px;
      line-height: 37px;
      margin-top: 20px;
    }
    &.null-val {
      .right .right-child {
        color: #dddddd;
      }
    }
    .left {
      width: 250px;
      color:#999;
    }
    .right {
      color: #333;
      height: 100%;
      flex:1;
      padding-right: 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      overflow: hidden;
      .right-child {
        display: inline-block;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      .input-val {
        border: none;
        width: 100%;
        line-height: normal;
      }
    }
    .radio-wp {
      display: flex;
      height: 100%;
      align-items: center;
      .radio-item {
        width: 160px;
        height: 60px;
        box-sizing: border-box;
        line-height: 58px;
        background-color: #fff;
        text-align:center;
        border:1px solid #eee;
        border-radius:62px;
        color:#DDD;
        font-size: 26px;
        margin-right: 40px;
        &.current-radio {
          border-color: #5386FF;
          color:#5386FF;
        }
      }
    }
    input::-webkit-input-placeholder {
      color: #dddddd;
    }
  }
</style>
