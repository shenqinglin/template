<template>
  <div class="tel-divide-wrap">
    <div class="tel-divide">
      {{ telLeft }}
    </div>
    <div class="tel-divide mid-depart">
      {{ telMiddle }}
    </div>
    <div class="tel-divide">
      {{ telRight }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tel: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    telLeft () {
      return this.tel.substr(0, 3)
    },
    telMiddle () {
      return this.tel.substr(3, 4)
    },
    telRight () {
      return this.tel.substr(7)
    }
  }
}
</script>

<style lang='less' scoped type='text/less'>
  .tel-divide-wrap {
    display: flex;
    align-items: center;
    font-size: 0;
    min-width: 188px;
    .tel-divide {
      font-size: 26px;
      color:#333333;
      &.mid-depart {
        margin: 0 10px;
      }
    }
  }
</style>
