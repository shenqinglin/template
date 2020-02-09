<template>
  <div>
    <main-container type="small">
      <template slot="title">
        到目前为止，最高体温是多少？
      </template>
      <div class="answer-wrapper">
        <div class="answer">
          {{ temp | number }}
        </div>
        <van-slider
          v-model="temp"
          :min="37.3"
          :max="42"
          :step="0.1"
          active-color="#53B9F5"
          inactive-color="#eee"
          bar-height="0.08rem"
          button-size="0.45333rem"
        />
        <div class="desc-wrapper">
          <div>37.3℃</div>
          <div>42℃</div>
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

export default {
  components: {
    MainContainer,
    VIcon
  },
  filters: {
    number (value) {
      return `${value.toFixed(1)}℃`
    }
  },
  data () {
    return {
      list: Object.freeze([
        {
          value: 'A',
          text: '<37.3℃'
        },
        {
          value: 'B',
          text: '≥37.3℃'
        }
      ]),
      temp: 37.3,
      state: {
        toNext: true
      }
    }
  },
  computed: {
    ...mapGetters(['currentIndex', 'queue', 'answer'])
  },
  mounted () {
    const qNo = this.queue[this.currentIndex]
    this.selectedAnswer = this.answer[qNo] || 37.3
  },
  methods: {
    handleToNext () {
      this.$store.commit('SET_ANSWER', this.temp)
      const index = this.currentIndex + 1

      this.$router.replace({ name: `q${this.queue[index]}` })
      this.$store.commit('SET_INDEX', index)
    },
    handleToLast () {
      this.$store.commit('SET_ANSWER', 37.3)
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
    padding-top: 60px;
    .answer {
      width: 250px;
      height: 84px;
      background: rgba(83,185,245,0.04);
      border-radius: 10px;
      font-size: 40px;
      font-weight: 500;
      justify-content: space-around;
      color:rgba(51,51,51,1);
      margin: 0 auto;
      line-height: 84px;
      text-align: center;
      margin-bottom: 100px;

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

.desc-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  font-size: 24px;
  font-weight: 400;
  color: #333;
}
</style>
