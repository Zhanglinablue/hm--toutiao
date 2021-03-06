import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import store from './store'
import plugin from '@/utils/plugin'
// import 'vant/lib/index.css'
import 'vant/lib/index.less' // vant 样式文件 换成less
import 'vant/lib/index.css' // vant 样式文件
import '@/styles/index.less' // 引入全局的自定义样式  因为要覆盖vant的样式
import Vant from 'vant'
import 'amfe-flexible'
Vue.use(Vant)
Vue.use(plugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
