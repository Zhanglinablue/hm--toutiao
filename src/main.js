import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'vant/lib/index.css'
import 'vant/lib/index.css' // vant 样式文件
import '@/styles/index.less' // 引入全局的自定义样式  因为要覆盖vant的样式
import Vant from 'vant'
import 'amfe-flexible'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
