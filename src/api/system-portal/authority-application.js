import request from '@/utils/request'

/**
 * 新增用户权限申请
 * @param {*} data
 */
export function addAuthority(data) {
  return request({
    url: '/v1/authority-application/add',
    method: 'post',
    data
  })
}

/**
 * 权限管理 -- 权限申请管理列表
 * @param {*} params
 */
export function getAuthorityList(params) {
  return request({
    url: '/v1/authority-application/authority-application-list',
    method: 'get',
    params
  })
}

/**
 * 删除权限信息
 * @param {*} params
 */
export function deleteAuthority(params) {
  return request({
    url: `/v1/authority-application/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 权限审核
 * @param {*} data
 */
export function examineAuthority(data) {
  return request({
    url: '/v1/authority-application/examine',
    method: 'post',
    data
  })
}

/**
 * 权限申请详情 通用
 * @param {*} params
 */
export function getAuthorityDetail(params) {
  return request({
    url: `/v1/authority-application/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 修改用户权限申请
 * @param {*} data
 */
export function updateAuthority(data) {
  return request({
    url: '/v1/authority-application/update',
    method: 'put',
    data
  })
}

/**
 * 个人中心 获取用户申请权限列表
 * @param {*} params
 */
export function getUserAuthorityList(params) {
  return request({
    url: '/v1/authority-application/user-authority-application-list',
    method: 'get',
    params
  })
}
