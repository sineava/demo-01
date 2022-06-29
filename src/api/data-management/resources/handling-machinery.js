import request from '@/utils/request'

/**
 * 装卸设备信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/data-management/v1/handling-machinery/list`,
    method: 'get',
    params
  })
}

/**
 * 装卸设备详情信息
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/data-management/v1/handling-machinery/info/${id}`,
    method: 'get'
  })
}

/**
 * 新增装卸设备信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/data-management/v1/handling-machinery/add`,
    method: 'post',
    data
  })
}

/**
 * 修改装卸设备信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/data-management/v1/handling-machinery/update`,
    method: 'PUT',
    data
  })
}

/**
 * 删除装卸设备信息
 * @param {*} id
 */
export function removeData(id) {
  return request({
    url: `/data-management/v1/handling-machinery/remove/${id}`,
    method: 'DELETE'
  })
}
