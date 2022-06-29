import request from '@/utils/request'

/**
 * 危险货物设施信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/dangerous-goods-facilities/list`,
    method: 'get',
    params
  })
}

/**
 * 危险货物设施详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/dangerous-goods-facilities/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增危险货物设备信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/dangerous-goods-facilities/add`,
    method: 'post',
    data
  })
}

/**
 * 修改危险货物设备信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/dangerous-goods-facilities/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除危险货物设备信息
 * @param {*} id
 */
export function removeData(id) {
  return request({
    url: `/data-management/v1/dangerous-goods-facilities/remove/${id}`,
    method: 'DELETE'
  })
}
