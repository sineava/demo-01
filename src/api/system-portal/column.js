import request from '@/utils/request'

/**
 * 添加栏目信息
 * @param {*} data
 */
export function addColumn(data) {
  return request({
    url: '/v1/column/add',
    method: 'post',
    data
  })
}

/**
 * 综合门户首页 查询栏目列表
 * @param {*} params
 */
export function getColumnLists(params) {
  return request({
    url: '/v1/column/column-lists',
    method: 'get',
    params
  })
}

/**
 * 修改栏目信息
 * @param {*} data
 */
export function updateColumn(data) {
  return request({
    url: '/v1/column/update',
    method: 'PUT',
    data
  })
}

/**
 * 分页查询栏目列表
 * @param {*} params
 */
export function getColumnList(params) {
  return request({
    url: '/v1/column/list',
    method: 'get',
    params
  })
}

/**
 * 通过ID查询栏目详情
 * @param {*} id
 */
export function getColumnDetail(id) {
  return request({
    url: `/v1/column/get/${id}`,
    method: 'get'
  })
}

/**
 * 设置栏目信息状态
 */
export function startStopColumn(id, isEnable) {
  return request({
    url: `/v1/column/startStopColumn/${id}/${isEnable}`,
    method: 'PUT'
  })
}

/**
 * 删除栏目信息
 * @param {*} id
 */
export function deleteColumn(id) {
  return request({
    url: `/v1/column/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 查询栏目名称是否存在
 * @param {*} params
 */
export function columnNameEXist(params) {
  return request({
    url: '/v1/column/name-exist',
    method: 'get',
    params
  })
}
