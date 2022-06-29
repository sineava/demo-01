import request from '@/utils/request'

/**
 * 港区信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/port-services/v1/port-area/list`,
    method: 'get',
    params
  })
}

/**
 * 港区信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/port-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增港区信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/port-area/add`,
    method: 'POST',
    data
  })
}

/**
 * 修改港区信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/port-area/update`,
    method: 'PUT',
    data
  })
}

/**
 * 修改港区信息
 * @param {*} data
 */
export function deleteData(id) {
  return request({
    url: `/port-services/v1/port-area/remove/${id}`,
    method: 'DELETE',
  })
}

/**
 * 查询所有港口列表（添加港区用）
 * @param {*} params
 */
export function getPortList(params) {
  return request({
    url: `/port-services/v1/port/all-list`,
    method: 'get',
    params
  })
}

/**
 * 通过港口Id 查询港区列表(添加港区用)
 * @param {*} id
 */
export function getPortArea(id) {
  return request({
    url: `/port-services/v1/port-area/find-by-port-id/${id}`,
    method: 'get'
  })
}
