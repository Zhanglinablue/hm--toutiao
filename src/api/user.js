// 用户相关的请求模块
import request from '@/utils/request'
// 登录方法
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  })
}
// 得到promise对象
