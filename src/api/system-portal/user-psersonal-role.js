import request from '@/utils/request'

/**
 * 权限管理 -- 权限申请管理列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/v1/authority-application/authority-application-list',
    method: 'get',
    params
  })
}
