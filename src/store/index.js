import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  // 放置数据，初始化的时候直接将用户给的信息放置在公共状态
  state: {
    user: auth.getUser()
  },
  // 修改数据
  mutations: {
    upDateUser (state, payload) {
      state.user = payload.user // 更新数据
      auth.setUser(payload.user) // 将数据同步设置到本地存储中
    },
    clearUser (state) {
      state.user = {}
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
