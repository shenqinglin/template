<template>
  <div
    class="name-point-wrap border-bottom"
    :class="ifUserNameFocus?'add-padding':''"
  >
    <div class="input-wrap">
      <div class="label">
        {{ label }}
      </div>
      <div class="field-wrap">
        <input
          ref="input"
          v-model.trim="val"
          type="text"
          class="input-file"
          :placeholder="placeholder"
          @input="onInput"
          @focus="onUserNameFocus"
          @blur="onUserNameBlur"
        >
        <v-icon
          v-if="showClearIcon"
          name="clear"
          class="clear-icon"
          @touchend.native="onIconClear"
        />
      </div>
    </div>
    <add-point
      v-show="ifUserNameFocus"
      @click="onAddPoint"
    />
    <!-- <one-pixel /> -->
  </div>
</template>

<script>
import AddPoint from './AddPoint'
// import OnePixel from '@/components/OnePixel'
export default {
  components: {
    AddPoint // OnePixel
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入姓名'
    }
  },
  data () {
    return {
      val: '', // 双向绑定值
      ifUserNameFocus: false
    }
  },
  computed: {
    showClearIcon () {
      const { val, ifUserNameFocus } = this
      return !!(val && ifUserNameFocus)
    }
  },
  watch: {
    val (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    onInput () {
      this.$refs.input.focus()
    },
    onAddPoint () {
      const { val } = this
      if (val.charAt(val.length - 1) === '·' || val.length === 0) {
        return
      }
      this.val = val + '·'
    },
    onUserNameFocus () { // 获得焦点
      this.ifUserNameFocus = true
    },
    onUserNameBlur () { // 失去焦点
      this.ifUserNameFocus = false
    },
    onIconClear (ev) {
      this.val = ''
      ev.preventDefault()
      ev.stopPropagation()
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
  .name-point-wrap {
    /* .border-1px(#eee); */
    /* .border-bottom; */
    position: relative;
    &.add-padding {
      padding-bottom: 20px;
    }
    .input-wrap {
      display: flex;
      align-items:center;
      box-sizing:border-box;
      position: relative;
      height: 98px;
      &.no-border {
        border: none;
        &:after {
          content: '';
          border: none;
        }
      }
      .label {
        color: #999999;
        font-size: 26px;
        width: 250px;
      }
      .field-wrap {
        flex:1;
        .input-file {
          border: none;
          color:#333;
          font-size: 26px;

          width: 100%;
        }
      }
      input::-webkit-input-placeholder {
        color: #dddddd;
      }
    }
  }
</style>
