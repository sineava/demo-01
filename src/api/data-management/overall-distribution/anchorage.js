import request from '@/utils/request'

/**
 * 新增锚地信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/anchorage/add`,
    method: 'post',
    data
  })
}

/**
 * 锚地信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/anchorage/info/${id}`,
    method: 'get'
  })
}

/**
 * 锚地信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/data-management/v1/anchorage/list',
    method: 'get',
    params
  })
}

/**
 * 删除锚地信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/anchorage/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 修改锚地信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/data-management/v1/anchorage/update',
    method: 'put',
    data
  })
}
