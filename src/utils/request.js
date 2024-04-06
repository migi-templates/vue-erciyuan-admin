import axios from 'axios'

import { ElMessage } from 'element-plus'
import { mainStore } from '@/store/index'

// 1. 创建axios实例
const request = axios.create({
  // 接口
  baseURL: '/api',
  // 超时时间
  timeout: 50000,
})
// 2.请求拦截
request.interceptors.request.use(
  (config) => {
    const store = mainStore()
    if (store.token) {
      config.headers['token'] = store.token
    }
    return config
  },
  (error) => {
    //  请求发生错误，抛出异常
    Promise.reject(error)
  }
)

// 3.响应拦截
request.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    if (error && error.response) {
      const status = error.response.status
      if (status) {
        ElMessage.error('请求失败')
      }
    } else {
      if (JSON.stringify(error).includes('timeout')) {
        ElMessage.error('服务器响应超时，请刷新页面')
      }
      ElMessage.error('连接服务器失败')
    }
    return Promise.reject(error)
  }
)
// 4.导出 axios 实例
export default request
