import request from '@/utils/request'

/**
 * 港行机关信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/mechanism/list`,
    method: 'get',
    params
  })
}

/**
 * 港行机关信息详情信息
 * @param {*} params
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/mechanism/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增港行机关信息
 * @param {*} params
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/mechanism/add`,
    method: 'post',
    data
  })
}

/**
 * 修改港行机关信息
 * @param {*} params
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/mechanism/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除港行机关信息
 * @param {*} params
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/mechanism/remove/${id}`,
    method: 'DELETE',
  })
}
