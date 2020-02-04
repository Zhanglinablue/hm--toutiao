export default {
  install (Vue) {
    // 插件
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
  }
}
