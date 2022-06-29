import request from '@/utils/request'

/**
 * 港行机构信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/organization/list`,
    method: 'get',
    params
  })
}

/**
 * 港行机构信息详情信息
 * @param {*} params
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/organization/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增港行机构信息
 * @param {*} params
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/organization/add`,
    method: 'POST',
    data
  })
}

/**
 * 修改港行机构信息
 * @param {*} params
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/organization/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除港行机构信息
 * @param {*} params
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/organization/remove/${id}`,
    method: 'DELETE'
  })
}
