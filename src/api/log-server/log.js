import request from '@/utils/request'

/**
 * 分页查询用户登录日志
 * @param {*} params
 */
export function getLoginInfo(params) {
  return request({
    url: '/log-server/v1/log/page-login-info',
    method: 'get',
    params
  })
}

/**
 * 分页查询用户操作日志
 * @param {*} params
 */
export function getOperateInfo(params) {
  return request({
    url: '/log-server/v1/log/page-operation-info',
    method: 'get',
    params
  })
}
