<template>
  <div>
    <main-container multiple>
      <template slot="title">
        有没有以下症状
      </template>
      <div class="answer-wrapper">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="answer"
          :class="{
            ml50: index % 2 !== 0,
            mt18: index > 1,
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
        class="no-one"
        :class="{
          selected: selectedAnswer['L']
        }"
        @click="handleNoOneClick"
      >
        以上均无
      </div>
    </main-container>
    <div class="operate-wrapper">
      <div
        class="opeator"
        @click="handleToLast"
      >
        <v-icon
          class="icon rotate"
          name="arrow"
        />
      </div>
      <div
        class="opeator"
        :class="{
          disabled: !state.toNext
        }"
        @click="handleToNext"
      >
        <v-icon
          class="icon"
          name="arrow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import VIcon from '@/components/VIcon'
import { mapGetters } from 'vuex'

export default {
  components: {
    MainContainer,
    VIcon
  },
  data () {
    return {
      list: Object.freeze([
        {
          value: 'A',
          text: '发热'
        },
        {
          value: 'B',
          text: '咽喉痛'
        },
        {
          value: 'C',
          text: '咳嗽'
        },
        {
          value: 'D',
          text: '鼻塞'
        },
        {
          value: 'E',
          text: '流鼻涕'
        },
        {
          value: 'F',
          text: '胸闷'
        },
        {
          value: 'G',
          text: '气急'
        },
        {
          value: 'H',
          text: '呼吸困难'
        },
        {
          value: 'I',
          text: '全身酸痛'
        },
        {
          value: 'J',
          text: '乏力'
        },
        {
          value: 'K',
          text: '腹泻'
        }
      ]),
      selectedAnswer: {},
      state: {
        toNext: false
      }
    }
  },
  computed: {
    ...mapGetters(['answer', 'currentIndex', 'queue'])
  },
  mounted () {
    const qNo = this.queue[this.currentIndex]
    this.selectedAnswer = this.answer[qNo] || {}
    this.changeNextBtnStatus()
  },
  methods: {
    handleItemClick (data) {
      // 删除以上均无
      this.$delete(this.selectedAnswer, 'L')
      const { value } = data
      if (this.selectedAnswer[value]) {
        this.$delete(this.selectedAnswer, value)
      } else {
        this.$set(this.selectedAnswer, value, value)
      }
      this.changeNextBtnStatus()
    },
    handleNoOneClick () {
      this.selectedAnswer = { L: 'L' }
      this.changeNextBtnStatus()
    },
    changeNextBtnStatus () {
      console.log(this.selectedAnswer)
      if (Object.keys(this.selectedAnswer).length === 0) {
        this.state.toNext = false
        return
      }
      this.state.toNext = true
    },
    handleToNext () {
      if (Object.keys(this.selectedAnswer).length === 0) {
        return
      }
      this.$store.commit('SET_ANSWER', this.selectedAnswer)
      this.$store.dispatch('generateQuestionQueue', { ...this.selectedAnswer })
    },
    handleToLast () {
      // 清空当前题目答案
      this.$store.commit('SET_ANSWER', null)
      const index = this.currentIndex - 1
      this.$store.commit('SET_INDEX', index)
      if (index === -1) {
        this.$router.replace({ name: 'q1' })
      } else {
        this.$router.replace({ name: `q${this.queue[index]}` })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transition: all 0.2s ease;
    .answer {
      width: 250px;
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
    .mt18 {
      margin-top: 18px;
    }
  }
  .no-one {
    margin-top: 30px;
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
      &.rotate{
        transform: rotate(180deg);
      }
    }

    &.disabled {
      opacity: 0.3;
    }
  }
  .right {
    float: right;
  }
}
</style>
