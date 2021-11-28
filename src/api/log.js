import { service } from '../utils/request'

export function login() {
  return service({
    url: '/login',
    method: 'get'
  })
}
