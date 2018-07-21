<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>

      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :class="{ active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll';
import { addClass } from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    },
  },
  mounted() {
    // 保证 DOM 完全渲染
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if(this.autoPlay) {
        this._play();
      }
    }, 20);
    window.addEventListener('resize', () => {
      // 如果 slider 还没初始化
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    // 计算并且设置宽度
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        // 添加类名
        addClass(child, 'slider-item');
        // 设置每个 item 的宽度是父容器的宽度
        child.style.width = sliderWidth + 'px';
        // group 的总宽度需要累加
        width += sliderWidth;
      };
      // 当循环切换的时候，会克隆两个 dom 来保证循环切换
      // 加上 resize 这个标识，是为了防止当 resize 之后，这个宽度会多加 2 倍
      if(this.loop && !isResize) {
        // 所以是两倍
        width += 2 * sliderWidth;
      };
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    // 初始化 slider
    _initSlider() {
      this.children = this.$refs.sliderGroup.children;
      // 在使用 better-scroll 的时候，为了无缝滚动会克隆最后一张和第一张，所以在获取有几个节点的时候，一定要在 better-scroll 之前进行
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400,
        },
        click: true,
      });
      // 组件提供的事件回调
      this.slider.on('scrollEnd', () => {
        this.currentPageIndex = this.slider.getCurrentPage().pageX;
        // 如果不清除这个定时器，就会发生到自动滚动一次就不动了，并且是为了防止手动拖动又回去了。
        if(this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      this.timer = setTimeout(() => {
        // better-scroll 接口
        this.slider.next();
      }, this.interval);
    },
    destroyed() {
      clearTimeout(this.timer);
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

.slider
  min-height: 1px
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slider-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
