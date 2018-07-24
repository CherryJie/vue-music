<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 传入的props
        probeType: this.probeType,
        click: this.click
      })
      // 监听位置变化
      if (this.listenScroll) {
        // 保留 this
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disabled() {
      this.scroll && this.scroll.disabled()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // scrollTo 会接收一些参数，所以要将参数传进 scrollTo 中
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 保证数据的实时刷新
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>
