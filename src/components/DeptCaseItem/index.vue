<template>
  <div
    class="dept-case-item"
  >
    <div class="content">
      <h3>{{ title }}</h3>
      <p class="border-bottom">
        {{ content }}
      </p>
      <div
        v-if="docList.length!==0"
        class="doctorList"
      >
        <s-grid>
          <s-grid-item
            v-for="(item,index) in docList"
            :key="index"
            img-height="40px"
            :img-url="item.photo"
            :name="item.name"
            :title="item.title"
            :doctor-id="item.doctorId"
          />
        </s-grid>
      </div>
    </div>
  </div>
</template>
<script>
import SGrid from '@/components/SGrid'
import SGridItem from '@/components/SGrid/item'
export default {
  components: {
    SGrid,
    SGridItem
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    docList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
.dept-case-item{
  padding: 20px 30px 0;
  margin-bottom: 20px;
  h3{
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    color: #333;
    font-weight: bold;
    font-size: 24px;
  }
  p{
    line-height:33px;
    padding: 20px 0 10px;
    font-size: 24px;
    color: #666;
  }
  .doctorList{
    padding-top: 20px;
    span{
      display: block;
      padding: 20px 0;
      color: #999;
      font-size: 22px;
    }
    .s-grid-item{
      width: 25%;
    }
  }
}
</style>
