<template>
  <!-- 加上滑动的动画 -->
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      // 对应 store 的 getter
      'singer'
    ])
  },
  created() {
    console.log(this.singer)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .singer-detail
    position: fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background

  .slide-enter-active, .slide-leave-active
    transition: all, 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
