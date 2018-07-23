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
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disabled() {
      this.scroll && this.scroll.disabled()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
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
