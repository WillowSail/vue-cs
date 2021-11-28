import axios from 'axios'

export function service(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 2000
  })

  // 请求拦截 任何请求都会经过这一步,可以在发送请求之前做些什么
  instance.interceptors.request.use(config => {
    config.headers.token = ''// 设置请求头
    // 这里一定要return,否则配置不成功
    return config
  }, err => {
    // 对请求错误做点什么
    console.log(err)
  })

  // 响应拦截 在接收响应做些什么
  instance.interceptors.response.use((res) => {
    var data = res.data
    return data
  }, err => {
    // 对响应错误做点什么
    console.log(err)
  })

  return instance(config)
}
