<template>
  <div class="doctor-desc border-bottom">
    <div class="doc_photo">
      <img
        :src="photo"
        alt=""
        :onerror="defaultImg"
      >
    </div>
    <div class="detail">
      <div class="title">
        <span :class="showFullTitle ? 'more' : ''">{{ title }}</span>
        <span>{{ name }}</span>
        <span v-if="duty">{{ duty }}</span>
      </div>
      <p
        v-if="specialty"
        :class="showMore ? 'showMore' : ''"
      >
        {{ specialty }}
      </p>
    </div>
    <v-icon
      :style="classObj"
      name="right"
    />
  </div>
</template>
<script>
import { STATIC_URL } from '@/config'
export default {
  props: {
    showTitle: {
      type: Boolean,
      default: false
    },
    photo: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    duty: {
      type: String,
      default: ''
    },
    specialty: {
      type: String,
      default: ''
    },
    showRight: {
      type: Boolean,
      default: false
    },
    showMore: {
      type: Boolean,
      default: false
    },
    showFullTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    classObj () {
      return {
        'visibility': this.showRight ? 'inherit' : 'hidden'
      }
    },
    defaultImg () {
      const url = `${STATIC_URL}/img/docDefault.png`
      return 'this.src="' + url + '"'
    }
  }
}
</script>
<style lang="less" scoped>
.doctor-desc{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 30px 30px 0;
  margin-left: 30px;
  .doc_photo{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
  }
  img{
    width: 100%;
  }
  .detail{
    width: 500px;
    .title{
      display: flex;
      align-items: center;
      span:nth-child(1){
        font-size: 28px;
        color: #333;
        max-width: 200px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-right: 20px;
        &.more{
          max-width: inherit;
        }
      }
      span:nth-child(2){
        font-size: 24px;
        color: #999;
        border-left: 1PX solid #ddd;
        padding: 0 20px;
      }
      span:nth-child(3){
        display: inline-block;
        width:120px;
        height:36px;
        line-height: 36px;
        text-align: center;
        font-size: 22px;
        border-radius:10px 0px 10px 0px;
        background: #AFCCFF;
        color: #fff;
      }
    }
    p{
      margin-top: 10px;
      font-size: 24px;
      color: #999;
      &.showMore{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      -webkit-line-clamp: inherit;
    }
  }
  .v-icon{
    color: #ddd;
  }
}
</style>
