import request from '@/utils/request'

/**
 * 应急救援信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/emergency-rescue/list`,
    method: 'get',
    params
  })
}

/**
 * 应急救援详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/emergency-rescue/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增应急救援信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/emergency-rescue/add`,
    method: 'post',
    data
  })
}

/**
 * 修改应急救援信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/emergency-rescue/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除应急救援信息
 * @param {*} id
 */
export function removeData(id) {
  return request({
    url: `/data-management/v1/emergency-rescue/remove/${id}`,
    method: 'DELETE'
  })
}
