import request from '@/utils/request'

/**
 * 航道建筑物信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/channel-building/list`,
    method: 'get',
    params
  })
}

/**
 * 航道建筑物详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/channel-building/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增航道建筑物信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/channel-building/add`,
    method: 'post',
    data
  })
}

/**
 * 修改航道建筑物信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/channel-building/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除航道建筑物信息
 * @param {*} id
 */
export function removeData(id) {
  return request({
    url: `/data-management/v1/channel-building/remove/${id}`,
    method: 'DELETE'
  })
}
