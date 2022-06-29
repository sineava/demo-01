import request from '@/utils/request'

/**
 * 新增公路信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: '/data-management/v1/highway/add',
    method: 'post',
    data
  })
}

/**
 * 公路信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/highway/info/${id}`,
    method: 'get'
  })
}

/**
 * 公路信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/data-management/v1/highway/list',
    method: 'get',
    params
  })
}

/**
 * 删除公路信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/highway/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 修改公路信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/data-management/v1/highway/update',
    method: 'put',
    data
  })
}
