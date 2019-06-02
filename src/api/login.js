import request from '@/utils/request'
import myHttp from '@/utils/request2'

export function loginByUsername(userInfo) {
  const data = {
    username: userInfo.username,
    password: userInfo.password
  }
  return myHttp.postRequest(userInfo.url, data)
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

