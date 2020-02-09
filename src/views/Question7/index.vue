<template>
  <div>
    <main-container type="small">
      <template slot="title">
        发热后有没有吃退热药？
      </template>
      <div class="answer-wrapper">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="answer"
          :class="{
            mt50: index > 0,
            selected: selectedAnswer === item.value,
            around: selectedAnswer === item.value
          }"
          @click="handleItemClick(item, index)"
        >
          <span class="answer-text">{{ item.text }}</span>
          <v-icon
            v-show="selectedAnswer === item.value"
            class="icon"
            name="checked"
          />
        </div>
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
import { mapGetters } from 'vuex'
import MainContainer from '@/components/MainContainer'
import VIcon from '@/components/VIcon'
import { Session } from '@/utils/storage'

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
          text: '有吃退热药'
        },
        {
          value: 'B',
          text: '没有吃退热药'
        }
      ]),
      selectedAnswer: null,
      state: {
        toNext: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentIndex', 'queue', 'answer'])
  },
  mounted () {
    const qNo = this.queue[this.currentIndex]
    this.selectedAnswer = this.answer[qNo] || null
    this.changeNextBtnStatus()
  },
  methods: {
    handleItemClick (data) {
      const { value } = data
      this.selectedAnswer = value
      this.changeNextBtnStatus()
    },
    changeNextBtnStatus () {
      this.state.toNext = this.selectedAnswer !== null
    },
    handleToNext () {
      if (!this.selectedAnswer) {
        return
      }
      this.$store.commit('SET_ANSWER', this.selectedAnswer)
      this.$store.commit('SET_QUEUE', Session.get('__queue'))
      const { queue } = this
      // 选B 跳过第8题
      if (this.selectedAnswer === 'B') {
        queue.splice(this.currentIndex + 1, 1)
      }
      const index = this.currentIndex + 1
      if (index === queue.length) {
        // GOTO Result
      } else {
        this.$router.replace({ name: `q${queue[index]}` })
        this.$store.commit('SET_INDEX', index)
      }
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
    padding-top: 80px;
    .answer {
      width: 565px;
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
  .right {
    float: right;
  }
}
</style>
