/**
 * Created by qianggao on  2018/11/19
 */
import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
import i from './i'
import { J_API, MOCK_API } from '../../config/dev.env'
import qs from 'qs'

// request interceptor
axios.interceptors.request.use(config => {
  // Do something before request is sent
  // if (store.getters.token) {
  //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  //   config.headers['X-Token'] = getToken()
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
axios.interceptors.response.use(
  response => {
    return response.data
  },
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 20000) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //       // 请自行在引入 MessageBox
  //       // import { Message, MessageBox } from 'element-ui'
  //       MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //         confirmButtonText: '重新登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         store.dispatch('FedLogOut').then(() => {
  //           location.reload() // 为了重新实例化vue-router对象 避免bug
  //         })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const myHttp = {
  postRequest: function(url, param) {
    param = param && typeof param === 'object' ? param : {}
    if (i[url].isMock || i[url].isMock === undefined) {
      console.info('使用mock假数据')
      url = MOCK_API + i[url].url
    } else {
      console.info('使用real真数据')
      url = J_API + i[url].url
    }
    const config = {
      url: url,
      method: 'post',
      transformRequest: [function(param) {
        return qs.stringify(param)
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        // 'X-Requested-With': 'XMLHttpRequest'
      }
    }
    // post请求时需要设定Content-Type
    config.data = param
    console.info(config)
    return axios(config)
  },
  getRequest: function(url, param) {
    param = param && typeof param === 'object' ? param : {}
    if (i[url].isMock || i[url].isMock === undefined) {
      console.info('使用mock假数据')
      url = MOCK_API + i[url].url
    } else {
      console.info('使用real真数据')
      url = J_API + i[url].url
    }

    const config = {
      url: url,
      method: 'get',
      transformRequest: [function(param) {
        return qs.stringify(param)
      }]
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest'
      // }
    }
    config.params = param
    return axios(config)
  }
}

export default myHttp
