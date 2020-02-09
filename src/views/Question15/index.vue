<template>
  <div>
    <main-container multiple>
      <template slot="title">
        近14天有没有以下情况？
      </template>
      <div class="answer-wrapper">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="answer"
          :class="{
            mt20: index > 0,
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
          selected: selectedAnswer['E']
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
        class="btn"
        :class="{
          disabled: !state.canSubmit
        }"
        @click="handleSubmit"
      >
        提交
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MainContainer from '@/components/MainContainer'
import VIcon from '@/components/VIcon'
import Request from '@/utils/request'

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
          text: '有武汉（湖北）等疫区旅游史或居住史'
        },
        {
          value: 'B',
          text: '有接触过武汉（湖北）等疫区的人员'
        },
        {
          value: 'C',
          text: '有接触过疑似或确诊新型冠状病毒感染者'
        },
        {
          value: 'D',
          text: '身边有多人出现发热、乏力、咳嗽、咽痛等'
        }
      ]),
      selectedAnswer: {},
      state: {
        canSubmit: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentIndex', 'queue', 'answer'])
  },
  mounted () {
    this.selectedAnswer = this.answer[this.currentIndex + 1] || {}
    this.changeNextBtnStatus()
  },
  methods: {
    handleItemClick (data) {
      // 删除以上均无
      this.$delete(this.selectedAnswer, 'E')
      const { value } = data
      if (this.selectedAnswer[value]) {
        this.$delete(this.selectedAnswer, value)
      } else {
        this.$set(this.selectedAnswer, value, value)
      }
      this.changeNextBtnStatus()
    },
    handleNoOneClick () {
      this.selectedAnswer = { E: 'E' }
      this.changeNextBtnStatus()
    },
    changeNextBtnStatus () {
      if (Object.keys(this.selectedAnswer).length === 0) {
        this.state.canSubmit = false
        return
      }
      this.state.canSubmit = true
    },
    handleSubmit () {
      this.$store.commit('SET_ANSWER', this.selectedAnswer)
      const result = this.calcResult()

      Request.post('/wx/selfTest/submit', {
        data: {
          content: JSON.stringify({ ...this.answer }),
          result: result
        }
      })

      this.$router.replace({ name: 'result', query: { result }})
      this.$store.commit('RESET')
    },
    calcResult () {
      let result = -1
      const q3 = Object.keys(this.answer[3])
      const q15 = Object.keys(this.answer[15])
      if (q3.indexOf('L') === -1) {
        if (q15.indexOf('E') === -1) {
          result = 1
        } else {
          result = 2
        }
      } else {
        if (q15.indexOf('E') === -1) {
          result = 3
        } else {
          result = 4
        }
      }
      return result
    },
    handleToLast () {
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
    transition: all 0.2s ease;
    padding-top: 0;
    .answer {
      width: 565px;
      height: 126px;
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
        width: 420px;
        margin-top: 21px;
        margin-left: 40px;
      }

      .icon {
        color: #53B9F5;
        float: right;
        margin-right: 26px;
        margin-top: 47px;
      }
    }

    .mt20 {
      margin-top: 20px;
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
  .right {
    float: right;
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
</style>
