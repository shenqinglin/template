<template>
  <div
    class="s-grid-item"
    @click="goDoc"
  >
    <div
      class="photo"
      :style="classObj"
    >
      <img
        :src="imgUrl"
        alt=""
        :onerror="defaultImg"
      >
    </div>
    <span class="name">{{ name }}</span>
    <span>{{ rank }}</span>
    <span>{{ docTitle }}</span>
  </div>
</template>
<script>
import { STATIC_URL } from '@/config'
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    imgHeight: {
      type: [String, Number],
      default: '80px'
    },
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    doctorId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    classObj () {
      return {
        'height': typeof this.imgHeight === 'number' ? this.imgHeight + 'px' : this.imgHeight,
        'width': typeof this.imgHeight === 'number' ? this.imgHeight + 'px' : this.imgHeight,
        'borderRadius': '50%'
      }
    },
    rank () {
      const arr = this.title.split('（')
      return arr[0]
    },
    docTitle () {
      const arr = this.title.split('（')
      if (arr.length === 2) {
        return '（' + arr[1]
      }
      return ''
    },
    defaultImg () {
      const url = `${STATIC_URL}/img/docDefault.png`
      return 'this.src="' + url + '"'
    }
  },
  methods: {
    goDoc () {
      const { hosCode, firstDept, secondDept } = this.$route.params
      this.$router.push(`/calendar/${hosCode}/${firstDept}/${secondDept}/doctorIndex/${this.doctorId}`)
    }
  }
}
</script>
<style lang="less" scoped>
.s-grid-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  .photo{
    overflow: hidden;
    img{
      width: 100%;
    }
  }
  span{
    font-size: 22px;
    margin-top: 5px;
  }
  .name{
    font-size: 24px;
    color: #333;
    font-weight: bold;
  }
}
</style>
