import request from '@/utils/request'

/**
 * 新增铁路信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: '/data-management/v1/railway/add',
    method: 'post',
    data
  })
}

/**
 * 铁路信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/railway/info/${id}`,
    method: 'get'
  })
}

/**
 * 铁路信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/data-management/v1/railway/list',
    method: 'get',
    params
  })
}

/**
 * 删除铁路信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/railway/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 修改铁路信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/data-management/v1/railway/update',
    method: 'put',
    data
  })
}
