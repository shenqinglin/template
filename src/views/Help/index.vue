<template>
  <v-page
    :show-header="false"
    class="notice"
  >
    <help-list
      v-for="(item,index) in helpTotalList"
      :key="index"
      :title="item.title"
      :help-list="item.list"
    />
  </v-page>
</template>
<script>
import HelpList from './components/HelpList'
import { encrypt } from '@/utils'
export default {
  components: {
    HelpList
  },
  data () {
    return {
      helpTotalList: [
        {
          title: '常见问题',
          list: [
            { title: '常见问题', path: '/help/helpContent/' + encrypt('FAQ') }
          ]
        },
        {
          title: '账号指南',
          list: [
            { title: '如何注册', path: '/help/helpContent/' + encrypt('register') },
            { title: '如何登录', path: '/help/helpContent/' + encrypt('login') },
            { title: '账号管理', path: '/help/helpContent/' + encrypt('accountManagement') }
          ]
        },
        {
          title: '预约指南',
          list: [
            { title: '预约挂号须知总则', path: '/help/helpContent/' + encrypt('registerInstruction') },
            { title: '预约挂号流程', path: '/help/helpContent/' + encrypt('registerProcedure') },
            { title: '如何查询/取消预约', path: '/help/helpContent/' + encrypt('inquiries-cancel') }
          ]
        },
        {
          title: '账号申诉',
          list: [
            { title: '账号申诉', path: '/help/helpContent/' + encrypt('accountAppeal') }
          ]
        }
      ]
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.notice{
  background: #F6F6F6;
}
</style>
