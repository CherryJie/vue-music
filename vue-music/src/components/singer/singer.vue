<template>
  <div class="singer">
    <list-view :data="singers"></list-view>
  </div>
</template>
<script>
import ListView from 'base/listview/listview'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
const HOT_NAME = '热门'
const HOT_SINGER_LENGTH = 10

export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
  },
  // 这里的数据请求需要将相同字母的聚合起来，并且取前十条作为热门的数据
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 为了得到有序的列表，我们需要处理 map
      let hot = []
      let ret = []
      for (let k in map) {
        let val = map[k]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        // 按照 title 的 charCode 来排序，升序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 得到一维数组
      return hot.concat(ret)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .singer
    position fixed
    top 88px
    bottom 0
    width 100%
</style>
