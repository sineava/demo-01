import request from '@/utils/request'

/**
 * 删除港口信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/port/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 分页查询港口信息
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/port/page-list',
    method: 'get',
    params
  })
}

/**
 * 查询港口列表
 * @param {*} params
 */
export function getPortList(params) {
  return request({
    url: '/wyx-channel-services/v1/port/port-list',
    method: 'get',
    params
  })
}

/**
 * 新增港口信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/port/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改港口信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/port/update-info',
    method: 'put',
    data
  })
}
