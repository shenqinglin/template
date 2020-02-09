<template>
  <div id="home">
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['queue', 'currentIndex'])
  },
  mounted () {
    this.toQuestionPage()
  },
  methods: {
    async toQuestionPage () {
      await this.$store.dispatch('generateDefaultQuestionQueue')
    }
  }
}
</script>
<style lang="less" scoped>
#home {
  padding: 160px 50px 0px;
  background: #53B9F5;
  background: url('~@/assests/img/bg.png') no-repeat left top;
  background-size: contain;
}

</style>
