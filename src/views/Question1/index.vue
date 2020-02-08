<template>
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
          selected: selectedAnswer[index],
          around: selectedAnswer[index]
        }"
        @click="handleItemClick(item, index)"
      >
        <span class="answer-text">{{ item.text }}</span>
        <v-icon
          v-show="selectedAnswer[index]"
          class="icon"
          name="checked"
        />
      </div>
    </div>
    <div
      class="no-one"
      @click="handleNoOneClick"
    >
      以上均无
    </div>
  </main-container>
</template>

<script>
import MainContainer from '@/components/MainContainer'
import VIcon from '@/components/VIcon'

export default {
  components: {
    MainContainer,
    VIcon
  },
  data () {
    return {
      list: Object.freeze([
        {
          text: '发热'
        },
        {
          text: '咽喉痛'
        },
        {
          text: '咳嗽'
        },
        {
          text: '鼻塞'
        },
        {
          text: '流鼻涕'
        },
        {
          text: '胸闷'
        },
        {
          text: '气急'
        },
        {
          text: '呼吸困难'
        },
        {
          text: '全身酸痛'
        },
        {
          text: '乏力'
        },
        {
          text: '腹泻'
        }
      ]),
      selectedAnswer: {}
    }
  },
  methods: {
    handleItemClick (data, index) {
      if (this.selectedAnswer[index]) {
        this.$delete(this.selectedAnswer, index)
      } else {
        this.$set(this.selectedAnswer, index, data)
      }
    },
    handleNoOneClick () {
      this.selectedAnswer = {}
    }
  }
}
</script>

<style lang="less" scoped>
  .answer-wrapper {
    display: flex;
    flex-wrap: wrap;
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

    .ml50 {
      margin-left: 50px;
    }

    .mt18 {
      margin-top: 18px;
    }
  }
  .no-one {
    margin-top: 50px;
    font-size: 30px;
    font-weight: 400px;
    color: #999;
    text-align: center;
  }
</style>
