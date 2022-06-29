import request from '@/utils/request'

/**
 * 新增周边企业信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: '/data-management/v1/periphery-enterprises/add',
    method: 'post',
    data
  })
}

/**
 * 周边企业信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/periphery-enterprises/info/${id}`,
    method: 'get'
  })
}

/**
 * 周边企业信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/data-management/v1/periphery-enterprises/list',
    method: 'get',
    params
  })
}

/**
 * 删除周边企业信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/periphery-enterprises/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 修改周边企业信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/data-management/v1/periphery-enterprises/update',
    method: 'put',
    data
  })
}
