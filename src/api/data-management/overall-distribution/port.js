import request from '@/utils/request'

/**
 * 港行机关信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/port-services/v1/port/list`,
    method: 'get',
    params
  })
}

/**
 * 港口信息详情信息
 * @param {*} params
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/port/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增港口信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/port/add`,
    method: 'POST',
    data
  })
}

/**
 * 修改港口信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/port/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除港口信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/port-services/v1/port/remove/${id}`,
    method: 'DELETE'
  })
}
