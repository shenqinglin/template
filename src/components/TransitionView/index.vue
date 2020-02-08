<template>
  <!-- <transition name="van-fade"> -->
  <!-- <keep-alive :include="includePage"> -->
  <router-view
    class="router-view"
  />
  <!-- </keep-alive> -->
  <!-- </transition> -->
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('savePosition', [
      'includePage'
    ])
  },
  mounted () {
    // console.log(this.includePage, 11)
  }
}
</script>

<style>
.page-move-enter,
.page-move-leave-active {
  transform: translate(100%, 0);
}

.page-move-enter-active,
.page-move-leave-active {
  transition: transform 0.3s;
}
</style>
