import request from '@/utils/request'

/**
 * 获取用户菜单
 * @param {*} params
 */
export function funcMenuAccount(params) {
  return request({
    url: '/v1/user-info/func-menu-account',
    method: 'get',
    params
  })
}

/**
 * 用户登录
 * @param {*} params
 */
export function login(params) {
  return request({
    url: '/v1/user-info/login',
    method: 'post',
    params
  })
}

/**
 * 修改用户密码
 * @returns {*} params
 */
export function modifyPwd(params) {
  return request({
    url: '/v1/user-info/modify-pwd',
    method: 'post',
    params
  })
}

/**
 * 获取部门菜单列表
 * @param {*} params
 */
export function getOrgTree(params) {
  return request({
    url: '/v1/user-info/org-tree',
    method: 'post',
    params
  })
}

/**
 * 根据部门名称查询部门信息
 * @param {*} params
 */
export function queryDeptName(params) {
  return request({
    url: '/v1/user-info/query-dept-name',
    method: 'get',
    params
  })
}

/**
 * 新增内网栏目获取栏目菜单
 * @param {*} params
 */
export function queryFuncNwMenu(params) {
  return request({
    url: '/v1/user-info/query-func-nw-menu',
    method: 'get',
    params
  })
}

/**
 * 新增外网网栏目获取栏目菜单
 * @param {*} params
 */
export function queryFuncWwMenu(params) {
  return request({
    url: '/v1/user-info/query-func-ww-menu',
    method: 'get',
    params
  })
}

/**
 * 获取用户信息
 * @param {*} params
 */
export function getInfo(params) {
  return request({
    url: '/v1/user-info/user-info',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
