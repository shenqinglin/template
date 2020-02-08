<template>
  <div class="hos-search-box">
    <form action="/">
      <van-search
        v-model="value"
        class="hos-search"
        :placeholder="placeholder"
        :show-action="showAction"
        :search-conternt="searchContent"
        @input="searchList"
        @search="onSearch"
        @cancel="onCancel"
        @clear="onSearchClear"
      />
    </form>
    <div
      v-if="boxVisible"
      class="hos-search-nr"
      @touchmove.prevent
    >
      <ul>
        <li
          v-for="(item,index) in resultList"
          :id="item.id"
          :key="index"
          @click="handleItemClick(item.name,item.code)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchSearchHospital, fetchSearchDepartment } from '@/api/common'
import { fetchSearchDisease } from '@/api/special'
import { Local } from '@/utils/storage'
import { debounce } from '@/utils/index'
export default {
  name: 'Search',
  props: {
    type: {
      type: String,
      default: ''
    },
    showAction: {
      type: Boolean,
      default: false
    },
    searchContent: {
      type: String,
      default: 'hos'
    },
    search: {
      type: Function,
      default: () => {}
    },
    searchClear: {
      type: Function,
      default: () => {}
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      placeholder: '',
      resultList: [],
      boxVisible: false,
      historyList: [],
      value: ''
    }
  },
  watch: {
    // 监听父组件传参变化重新赋值
    keyword (val) {
      this.value = val
    }
  },
  mounted () {
    if (this.searchContent === 'hos') { // 医院搜索
      this.placeholder = '请输入医院关键字'
    } else if (this.searchContent === 'dep') { // 科室搜索
      this.placeholder = '请输入科室关键字'
    } else if (this.searchContent === 'dise') { // 疾病搜索
      this.placeholder = '请输入疾病关键字'
    }
  },
  methods: {
    searchList: debounce(function (e) {
      const { value } = this
      /* 禁止输入空格 */
      const reg = /^\S+$/
      if (e) {
        if (new RegExp(reg).test(e) === false) {
          this.value = this.value.trim()
          return false
        }
      }
      /* 禁止输入空格end */
      if (value === '') {
        this.resultList = []
        this.boxVisible = false
        return false
      }
      let loadFunc
      if (this.searchContent === 'hos') { // 医院搜索
        loadFunc = fetchSearchHospital
      } else if (this.searchContent === 'dep') { // 科室搜索
        loadFunc = fetchSearchDepartment
      } else if (this.searchContent === 'dise') { // 疾病搜索
        loadFunc = fetchSearchDisease
      }
      loadFunc(value).then((res) => {
        // let list
        // if (res.list.length === 0 && this.searchContent !== 'hos') { // 仅按科室和疾病搜索需要暂无搜索数据展示
        //   list = [{ code: '0', name: '暂无搜索数据' }]
        // } else {
        //   list = res.list
        // }
        const list = res.list || []
        this.boxVisible = list.length !== 0
        this.resultList = list
      })
    }, 200),
    handleItemClick (name, code) {
      // if (code !== '0' && code !== 0) {
      //   this.value = name
      //   this.boxVisible = false
      // }
      this.value = name
      this.boxVisible = false
      if (this.searchContent === 'hos') { // 医院搜索
        const cahedData = Local.get('SEARCH_HISTORY') || []
        let index = -1
        for (let i = 0; i < cahedData.length; i++) {
          // 判断key对象是否存在
          if ((cahedData[i].code).indexOf(code) > -1) {
            index = i
          }
        }
        index > -1 ? cahedData.splice(index, 1) : ''
        cahedData.unshift({
          code,
          name
        })
        Local.set('SEARCH_HISTORY', cahedData)
        this.$router.push({ path: '/department/' + code })
      }
      if (this.searchContent === 'dep' || this.searchContent === 'dise') { // 科室点击搜索下拉框||疾病点击搜索下拉框
        this.$emit('listClick', code)
      }
    },
    onCancel () {
      this.$router.go(-1)
    },
    onSearch () {
      if (this.searchContent === 'hos') {
        if (this.value !== '') {
          this.boxVisible = false
          this.$emit('search', this.value)
        }
      } else {
        if (this.value !== '' && this.resultList.length !== 0) {
          this.boxVisible = true
        }
      }
    },
    onSearchClear () {
      this.$emit('searchClear')
    }

  }
}
</script>

<style lang="less" scoped>
@import '~@/assests/styles/common.less';
@import '~@/assests/styles/layout.less';
.hos-search-box {
  margin:30px 0 30px;
  background: @backgroundColorWhiter;
  .hos-search{
    height: 60px;
    padding: 0 0 0 25px;
  }
  .hos-search-nr{
    background: @backgroundColorWhiter;
    z-index: 20;
    position: fixed;
    top: 100px;
    left: 0;
    width: 100%;
    height: 100%;
    ul{
      padding: 0 40px;
      li{
        margin-top: 30px;
        font-size: 28px;
      }
    }
  }
}
/deep/ .van-search {
  padding: 0;
}
/deep/ .van-search .van-cell {
  background: @backgroundColorWhiter;
  box-shadow:0px 0px 30px 0px rgba(0,0,0,0.06);
  border-radius: 33px;
  padding: 0;
}
/deep/ .van-search__content {
  background: @backgroundColorWhiter;
  height: 60px;
}
/deep/ .van-field__left-icon .van-icon, .van-field__right-icon .van-icon {
  font-size: 30px;
  color: #bbb;
  padding-top: 18.2px;
  margin-left: 30px;
}
/deep/ .van-field__control {
  margin-top: 10px;
  height: 40px;
  line-height:40px;
  font-size: 28px;
}
/deep/ .van-field__control::-webkit-input-placeholder{
  color: #bbb;
}/*webkit 内核浏览器*/
/deep/ .van-field__control::-moz-placeholder{
   color: #bbb;
}/*Mozilla Firefox 19+*/
/deep/ .van-field__control::-moz-placeholder{
   color: #bbb;
}/*Mozilla Firefox 4 to 18*/
/deep/ .van-field__control::-ms-input-placeholder{
   color: #bbb;
}/*Internet Explorer 10+*/
/deep/ .van-search__action {
  padding: 0 48px;
  font-size: 28px;
  height:60px;
  line-height:60px;
  color: #666;
}
/deep/ .van-field__clear {
  font-size: 30px;
  padding-top: 10px;
  padding-right:25px;
  color: #eee;
}
</style>

