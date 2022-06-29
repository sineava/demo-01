import request from '@/utils/request'

/**
 * 消防设施信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/fire-fighting/list`,
    method: 'get',
    params
  })
}

/**
 * 消防设施详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/fire-fighting/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增消防设施信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/fire-fighting/add`,
    method: 'post',
    data
  })
}

/**
 * 修改消防设施信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/fire-fighting/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除消防设施信息
 * @param {*} id
 */
export function removeData(id) {
  return request({
    url: `/data-management/v1/fire-fighting/remove/${id}`,
    method: 'DELETE'
  })
}
