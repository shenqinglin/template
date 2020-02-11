<template>
  <div class="model">
    <div class="head">
      {{ questionList.title }}
    </div>
    <main-container
      type="small"
    >
      <template slot="title">
        {{ currentQs.question }}
      </template>
      <div
        v-if="currentQs.type==='select'"
        class="answer-wrapper"
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
import MainContainer from '@/components/MainContainer'
import VIcon from '@/components/VIcon'
import { qsJson } from '@/config/question'
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

  },
  methods: {
    handleItemClick (data) {
      const { value } = data
      if (this.currentQs.method === 'Multiple') {
        if (this.selectedAnswer[value]) {
          this.$delete(this.selectedAnswer, value)
        } else {
          this.$set(this.selectedAnswer, value, value)
        }
      } else if (this.currentQs.method === 'Single') {
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
    handleToPrev () {
      this.currentIndex--
      delete this.result[this.currentIndex + 2]
      if (this.currentIndex <= 0) {
        this.state.toPrev = false
        this.currentIndex = 0
        this.defaultSelect()
        return
      }
      this.state.toNext = true
      this.defaultSelect()
    },
    handleToNext () {
      this.result[this.currentIndex + 1] = this.selectedAnswer
      this.currentIndex++
      this.state.toPrev = true
      this.defaultSelect()
    },
    handleSubmit () {
      if (Object.keys(this.selectedAnswer).length === 0) {
        return
      }
      Request.post('/wx/selfTest/submit', {
        data: {
          content: JSON.stringify({ ...this.answer }),
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
