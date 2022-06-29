import request from '@/utils/request'

/**
 * 新增回旋水域信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: '/data-management/v1/whirling-waters/add',
    method: 'post',
    data
  })
}

/**
 * 回旋水域信息详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/whirling-waters/info/${id}`,
    method: 'get'
  })
}

/**
 * 回旋水域信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/data-management/v1/whirling-waters/list',
    method: 'get',
    params
  })
}

/**
 * 删除回旋水域信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/data-management/v1/whirling-waters/remove/${id}`,
    method: 'delete'
  })
}

/**
 * 修改回旋水域信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/data-management/v1/whirling-waters/update',
    method: 'put',
    data
  })
}
