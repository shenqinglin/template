<template>
  <div class="hot-list-wrap">
    <div class="head-img">
      <img :src="headImg">
    </div>
    <div class="hot-table table-head">
      <div class="cell area">
        行政区域
      </div>
      <div class="cell hospital">
        医院
      </div>
      <div class="cell time">
        接诊时间
      </div>
    </div>
    <div class=" table-body-wrap">
      <div
        v-for="hot in hotList"
        :key="hot.area"
        class="table-body hot-table"
      >
        <div class="content">
          <div class="cell area">
            {{ hot.area }}
          </div>
          <div
            class="cell hospital"
          >
            <div
              v-for="hos in hot.list"
              :key="hos.name"
              class="hos-name-time"
            >
              <div class="hos-name">
                {{ hos.name }}
              </div>
              <div class="cell time">
                {{ hos.time }}
              </div>
            </div>
          </div>
        </div>
        <div class="line" />
      </div>
    </div>
    <footer-tip />
  </div>
</template>

<script>
const headImg = require('@/assests/img/hot-dept.png')
import hotList from '@/config/hot'
import FooterTip from '@/components/FooterTip'
export default {
  components: {
    FooterTip
  },
  data () {
    return {
      headImg: headImg,
      hotList: Object.freeze(hotList)
    }
  }
}
</script>

<style lang='less' scoped>
  /deep/#app {
    background-color: #fff;
  }
  .hot-list-wrap {
    background: #fff;
    padding-bottom: 48px;
    .head-img {
      font-size: 0;
      img {
        width: 100%;
      }
    }
    .line {
      height: 2px;
    }
    .table-head {
      height: 80px;
      line-height: 80px;
      box-shadow:0px 0px 30px 0px rgba(0,0,0,0.06);
    }
    .table-head {
      margin-top: -1PX;
      display: flex;
      background-color: #fff;
      width: 100%;

      .cell {
        font-size: 26px;
        color:#5F7EB5;
      }
      .area {
        width: 201px;
        padding-left: 40px;
      }
      .hospital {
        padding-left: 75px;
        width: 340px;
        box-sizing: border-box;
      }
      .time {
        width: auto;
        padding-right: 32px;
      }
    }
    .table-body-wrap {
      width: 710px;
      margin: 30px auto;
      border-radius: 20px;
      overflow: hidden;
      background:rgba(244,248,255,1);
      .table-body  {
        padding: 30px 21px 0 20px;
        .content {
          display: flex;
          font-size: 26px;
          color:#333;
          .area {
            width: 201px;
            /* padding-left: 20px; */
            color: #999;
            box-sizing: border-box;
          }
          .hospital {
            flex:1;
            color: #333;
            .hos-name-time {
              display: flex;
              .hos-name {
                width: 340px;
              }
              .time {
                /* padding-right: 21px; */
                text-align: center;
                flex: 1;
              }
            }

          }
        }
        .line {
          height: 2px;
          background-color:#fff;
          margin-top: 30px;
        }
      }
    }
  }
  /deep/.footer-tip {
    position: static;
    color: #ddd;
    /* color:#ddd; */
    font-size: 20px;
    margin-top: 50px;
    .center {
      background-color: #ddd;
    }
  }
</style>
