<template>
  <div class="model">
    <div class="head">
      {{ questionList.title }}
    </div>
    <main-container
      :type="currentQs.height"
    >
      <template slot="title">
        {{ currentQs.question }}
      </template>
      <div
        v-if="currentQs.type==='select'"
        :class="currentQs.answer.length>3?'answer-wrapper more':'answer-wrapper'"
      >
        <div
          v-for="(item, index) in currentQs.answer"
          :key="index"
          class="answer"
          :class="{
            mt50: index > 0,
            selected: selectedAnswer[item.value],
            around: selectedAnswer[item.value]
          }"
          @click="handleItemClick(item, index)"
        >
          <span class="answer-text">{{ item.text }}</span>
          <v-icon
            v-show="selectedAnswer[item.value]"
            class="icon"
            name="checked"
          />
        </div>
      </div>
      <div
        v-if="currentQs.type==='slider'"
        class="answer-wrapper"
      >
        <div class="answer_show">
          {{ temp }}
        </div>
        <van-slider
          v-model="temp"
          :min="currentQs.min"
          :max="currentQs.max"
          :step="currentQs.step"
          active-color="#53B9F5"
          inactive-color="#eee"
          bar-height="0.08rem"
          button-size="0.45333rem"
        />
        <div class="desc-wrapper">
          <div>{{ currentQs.min }}</div>
          <div>{{ currentQs.max }}</div>
        </div>
      </div>
    </main-container>
    <div class="operate-wrapper">
      <div
        class="opeator"
        :class="{
          disabled: !state.toPrev
        }"
        @click="handleToPrev"
      >
        <v-icon
          class="icon rotate"
          name="arrow"
        />
      </div>
      <div
        v-if="!showSubmitBtn"
        class="opeator"
        :class="{
          disabled: !state.toNext || Object.keys(selectedAnswer).length === 0
        }"
        @click="handleToNext"
      >
        <v-icon
          class="icon"
          name="arrow"
        />
      </div>
      <div
        v-else
        class="btn"
        :class="{
          disabled: !state.canSubmit || Object.keys(selectedAnswer).length === 0
        }"
        @click="handleSubmit"
      >
        提交
      </div>
    </div>
  </div>
</template>
<script>
/*
* 1、目前只支持单选、多选、滑动
* 2、答题顺序逻辑：目标实现方式（原题库1-7，现答题顺序1、5、6、7），var newObj = 原题库.slice
* 3、答案数量较多，现在设置的是大于3个，展示分左右两块，添加类名more
* 4、答题结果页自定义(用的时候按需求做)
* 5、上一题下一题逻辑按照分页逻辑处理
* 6、缺少以上均无选项
*/
import MainContainer from '@/components/MainContainer'
import VIcon from '@/components/VIcon'
import { qsJson, sliceQsJson } from '@/config/question'
import Request from '@/utils/request'
export default {
  components: {
    MainContainer,
    VIcon
  },
  data () {
    return {
      questionList: Object.freeze(qsJson), // 答卷json
      list: [], // 答案列表
      title: '', // 题目的title
      currentIndex: 0, // 当前题目的index
      state: {
        toPrev: false, // 后退按钮是否可点
        toNext: true, // 前进按钮是否可点
        canSubmit: true
      },
      result: {}, // 选择结果集
      selectedAnswer: {}, // 当前题目选中的值
      temp: 1 // 用来临时存储滑动模块
    }
  },
  computed: {
    currentQs () {
      // 获取当前展示题目
      return this.questionList.questions[this.currentIndex]
    },
    showSubmitBtn () {
      // 当前题目index等于总题目长度时，即最后一题，展示提交按钮
      return this.currentIndex === this.questionList.questions.length - 1
    }
  },
  watch: {
    temp (val) {
      this.$set(this.selectedAnswer, val, val)
      this.result[this.currentIndex + 1] = val
    }
  },
  mounted () {
    // 默认答题顺序
    const defaultQs = [1, 2, 3, 4]
    this.questionList = sliceQsJson(defaultQs)
  },
  methods: {
    handleItemClick (data) {
      const { value } = data
      // 多选题
      if (this.currentQs.method === 'Multiple') {
        if (this.selectedAnswer[value]) {
          // 已选择，再次点击为清除操作
          this.$delete(this.selectedAnswer, value)
        } else {
          this.$set(this.selectedAnswer, value, value)
        }
      } else if (this.currentQs.method === 'Single') {
        // 单选题，先重置当前答案为空，再设置
        this.selectedAnswer = {}
        this.$set(this.selectedAnswer, value, value)
      }
    },
    defaultSelect () {
      // 当前题目的答案
      const currentAnswer = this.result[this.currentIndex + 1]
      if (currentAnswer) {
        this.selectedAnswer = currentAnswer
      } else {
        this.selectedAnswer = {}
      }
    },
    handleToPrev () { // 上一题
      // 题目-1
      this.currentIndex--
      // 删除上一题的答案
      delete this.result[this.currentIndex + 2]
      // 当前题目是第一题
      if (this.currentIndex <= 0) {
        // 上一题按钮置灰
        this.state.toPrev = false
        // 当前index = 0
        this.currentIndex = 0
        // 当前题目默认选中已选值
        this.defaultSelect()
        return
      }
      this.state.toNext = true
      this.defaultSelect()
    },
    handleToNext () { // 下一题
      // 如果state.toNext为false且当前问题没有选择答案，不可点击下一步
      if (!this.state.toNext || Object.keys(this.selectedAnswer).length === 0) {
        return
      }
      // 记录当前index的答案
      this.result[this.currentIndex + 1] = this.selectedAnswer
      // 题目+1
      this.currentIndex++
      // 上一题按钮可点
      this.state.toPrev = true
      // 重置当前题目答案位初始值
      this.defaultSelect()
    },
    handleSubmit () {
      // 最后一题提交时，验证当前题目是否已选择
      if (Object.keys(this.selectedAnswer).length === 0) {
        return
      }
      Request.post('/wx/selfTest/submit', {
        data: {
          result: this.result
        }
      })
      this.$router.replace({ name: 'result', query: { result: this.result }})
    }
  }
}
</script>
<style lang="less" scoped>
.model{
  padding: 0 50px 0px;
  .head{
    height: 160px;
    line-height: 180px;
    color: #fff;
    font-size: 44px;
  }
  .answer-wrapper {
    transition: all 0.2s ease;
    padding-top: 60px;
    .desc-wrapper {
      display: flex;
      justify-content: space-between;
      margin-top: 24px;
      font-size: 24px;
      font-weight: 400;
      color: #333;
    }
    .answer_show{
      height: 84px;
      font-size: 40px;
      text-align: center;
      margin: 20px auto 80px;
      color: #333;
    }
    .answer {
      width: 550px;
      height: 84px;
      background: rgba(83,185,245,0.04);
      border-radius: 10px;
      font-size:30px;
      font-weight:400;
      justify-content: space-around;
      color:rgba(51,51,51,1);
      &.selected {
        background: rgba(83,185,245,0.14);
        color: #333;
        font-weight: 500;
      }
      .answer-text {
        float: left;
        margin-top: 21px;
        margin-left: 40px;
      }
      .icon {
        color: #53B9F5;
        float: right;
        margin-right: 26px;
        margin-top: 26px;
      }
    }
    .mt50 {
      margin-top: 50px;
    }
    &.more{
      padding-top: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .answer {
        width: 240px;
        margin-bottom: 20px;
      }
      .mt50{
        margin-top: 0;
      }
    }
  }
  .no-one {
    margin-top: 50px;
    font-size: 30px;
    font-weight: 400px;
    color: #999;
    text-align: center;

    &.selected {
      color: #53B9F5;
    }
  }
  .operate-wrapper {
    padding-top: 50px;
    display: flex;
    justify-content: space-between;
    .opeator {
      height: 84px;
      width: 84px;
      border-radius: 42px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        color: #53B9F5;
        &.rotate {
          transform: rotate(180deg);
        }
      }
      &.disabled {
        opacity: 0.3;
      }
    }
    .btn {
      width:230px;
      height:84px;
      background:rgba(255,255,255,1);
      border-radius:42px;
      font-size:30px;
      font-weight: 600;
      color: #53B9F5;
      display: flex;
      justify-content: center;
      align-items: center;
      float: right;
      &.disabled {
        opacity: 0.3;
      }
    }
    .right {
      float: right;
    }
  }
}
</style>
