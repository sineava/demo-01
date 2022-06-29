import request from '@/utils/request'

/**
 * 做业区信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/port-services/v1/business-area/list`,
    method: 'get',
    params
  })
}

/**
 * 做业区信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/business-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增做业区信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/business-area/add`,
    method: 'post',
    data
  })
}

/**
 * 修改做业区信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/business-area/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除做业区信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/port-services/v1/business-area/remove/${id}`,
    method: 'DELETE'
  })
}
