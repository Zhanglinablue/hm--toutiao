// 封装request ? 因为 要在拦截器里处理  token统一注入, 响应数据的统一处理返回 处理大数字
import axios from 'axios'// 引入axios
import JSONBig from 'json-bigint'// 处理大数字插件
import store from '@/store'// 引入vuex中的store实例
import router from '@/router'
// 创建一个新的 插件实例
const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  transformResponse: [function (data) {
    //  当后台 响应的字符串 回到axios请求时 就会触发
    //  data是一个字符串  把字符串转化成 对象并且返回 默认的是JSON.parse()
    // 如果data是一个空字符串  直接转化就会报错
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
  }]
})
// 请求拦截器  注入token
instance.interceptors.request.use(function (config) {
  if (store.state.user.token) {
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器   处理返回函数
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data
  }
//   错误的时候token容易失效
}, async function (error) {
  if (error.response && error.response.status === 401) {
    let toPath = { path: '/login', query: { redirectUrl: router.currentRoute.path } }
    if (store.state.user.refresh_token) {
      try {
        let result = await axios({
          medthod: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        store.commit('updateUser', {
          user: {
            token: result.data.data.token,
            refresh_token: store.state.user.refresh_token
          }
        })
        return instance(error.config)
      } catch (error) {
        store.commit('clearUser')
        router.push(toPath)
      }
    } else {
      router.push(toPath)
    }
  }
  return Promise.reject(error)
})
export default instance
