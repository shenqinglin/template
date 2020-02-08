<template>
  <div>
    <div class="content-container">
      <div class="title-wrapper">
        <div class="title">
          <slot name="title" />
        </div>
        <div
          v-if="multiple"
          class="desc"
        >
          多选
        </div>
      </div>
      <div class="line" />

      <slot />
    </div>
    <div
      v-if="operate"
      class="operate-wrapper"
    >
      <div
        class="opeator"
        @click="toLast"
      >
        <v-icon
          class="icon rotate"
          name="arrow"
        />
      </div>
      <div
        class="opeator"
        :class="{
          disabled: goToNext
        }"
        @click="handleToNext"
      >
        <v-icon
          class="icon"
          name="arrow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VIcon from '@/components/VIcon'

export default {
  components: {
    VIcon
  },
  props: {
    goToNext: {
      type: Boolean,
      default: true
    },
    last: {
      type: String,
      default: ''
    },
    next: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleToNext () {
      this.$router.replace({ name: this.next })
    }
  }
}
</script>

<style lang="less" scoped>
.content-container {
  height: 870px;
  background: rgba(255,255,255,1);
  box-shadow: 0px 2px 30px 0px rgba(0,0,0,0.2),0px 1px 10px 0px rgba(159,217,255,1);
  border-radius: 20px;
  padding: 44px 50px 0px;

  .title-wrapper {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 36px;
    font-weight: 500;
    color:rgba(51,51,51,1);
  }

  .desc {
    margin-left: 13px;
    font-size: 24px;
    font-weight:400;
    color:rgba(204,204,204,1);
  }

  .line {
    width: 100px;
    height: 2px;
    background:rgba(83,185,245,1);
    border-radius:4px;
    opacity:0.4;
    margin-top: 20px;
    margin-bottom: 30px;
  }
}

.operate-wrapper {
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
  .opeator {
    height: 84px;
    width: 84px;
    border-radius: 42px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      color: #53B9F5;
      &.rotate{
        transform: rotate(180deg);
      }
    }

    &.disabled {
      opacity: 0.3;
    }
  }
}

</style>
