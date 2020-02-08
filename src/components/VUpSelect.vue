<template>
  <div class="city-select-wrap border-bottom">
    <div class="label">
      {{ label }}
    </div>
    <div
      class="area-wrap"
      @click="onMiddleClick"
    >
      <div
        v-if="!showPlaceholder"
        class="selected-name"
      >
        <template>
          <slot name="middle-content" />
        </template>
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
    <slot name="component" />
    <!-- <one-pixel /> -->
  </div>
</template>

<script>
// 父级组件监听onAddress事件
// 所有左右结构，右侧带箭头icon的下拉选择均可套用此组件，中间功能区域的交互通过具名slot完成
// slot:middle-content/component 需要两个具名slot，填充中间的内容区域和弹出怎样的弹层来选取数据
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
    },
    showPlaceholder: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // showPlaceholder: true
    }
  },
  methods: {
    // changeStatus (val) { // 传值则赋值否则切换状态
    //   if (val !== undefined) {
    //     this.showPlaceholder = val
    //   } else {
    //     this.showPlaceholder = !this.showPlaceholder
    //   }
    // },
    onMiddleClick () { // 中间内容点击时触发父组件的监听事件做相应处理
      this.$emit('onMiddleClick')
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  @import '~@/assests/styles/common.less';
  .city-select-wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 98px;
    line-height: 98px;
    font-size: 26px;
    /* .border-bottom; */
    /* .border-1px(#eee); */

    .area-wrap {
      flex: 1;
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
  }

</style>
