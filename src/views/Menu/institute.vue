<template>
  <div class="cooperation">
    <div
      class="box"
      :style="classObj"
    >
      <header>
        <img
          class="header-img"
          :src="imgUrl+'/img/10.png'"
        >
      </header>

      <div class="banner">
        <p class="banner-top">
          我们要找的
        </p>
        <p class="banner-bottom">
          就是你
        </p>
      </div>

      <div class="content">
        <div class="content-img-box">
          <img
            class="content-img"
            :src="imgUrl+'/img/01.png'"
          >
          <img
            class="content-man"
            :src="imgUrl+'/img/02.png'"
          >
          <span class="star">
            <p>穿戴设备</p>
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/08.png'">
          </span>
          <span class="star">
            <p>健康电商</p>
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/09.png'">
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/05.png'">
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/07.png'">
          </span>
          <span class="star">
            <p>健康体检</p>
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/03.png'">
          </span>
          <span class="star">
            <p>国际医疗</p>
          </span>
          <span class="star">
            <p>母婴护理</p>
          </span>
          <span class="star">
            <p>导诊问诊</p>
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/04.png'">
          </span>
          <span class="star">
            <img :src="imgUrl+'/img/06.png'">
          </span>
        </div>
      </div>
    </div>

    <div class="main">
      <p>我们希望有更多的医疗行业及互联网合作伙伴,为中国医疗信息化产业的发展做出贡献,与你一起通过专业、敬业、职业的工作走在智慧医疗行业的前沿,做好推动智慧医疗、移动医疗中国发展的先行者!</p>
    </div>

    <footer>
      <p>关于合作事宜,您可以发送邮件到yewuhezuo@sina.cn,邮件中请注明联系人,联系电话,所属公司及合作意向,我们将尽快与您联系。</p>
    </footer>
  </div>
</template>
<script>
import { STATIC_URL } from '@/config'
export default {
  data () {
    return {}
  },
  computed: {
    imgUrl () {
      return STATIC_URL
    },
    classObj () {
      return {
        'background': `url(${this.imgUrl}/img/11.png) no-repeat left top`,
        'background-size': '100% 100%'
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const star = document.querySelectorAll('.star')
      const starLength = star.length
      let index = 0
      const tip = []
      let num = 0
      let originalName = ''
      const timer = setInterval(function () {
        index = Math.floor(Math.random() * starLength)
        while (tip[index] === index) {
          index = Math.floor(Math.random() * starLength)
        }
        star[index].style.opacity = 1
        tip[index] = index
        num++
        if (num >= starLength) {
          clearInterval(timer)
          return false
        }
      }, 800)
      const time = 800 * (starLength + 2)
      setTimeout(function () {
        for (let i = 0; i < starLength; i++) {
          originalName = star[i].className
          star[i].className = originalName + ' active-blink-' + i
        }
      }, time)
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@/assests/styles/needyou.less';
@media screen and (max-width:321px){
  .m-navlist{font-size:15px}
}

@media screen and (min-width:321px) and (max-width:400px){
  .m-navlist{font-size:16px}
}

@media screen and (min-width:400px){
  .m-navlist{font-size:18px}
}
footer p{
  padding: 0 30px;
}
</style>
