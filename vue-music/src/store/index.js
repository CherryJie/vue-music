import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// 每次修改 state 在控制台打印 logger
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
// 开启 debug 检测是否是 通过 mutations 来修改
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
