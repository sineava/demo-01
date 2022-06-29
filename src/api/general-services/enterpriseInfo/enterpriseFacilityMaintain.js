import request from '@/utils/request'

/**
 * 分页查询设施设备维护信息列表（通用）
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-facility-maintain/pageEnList',
    method: 'get',
    params
  })
}

/**
 * (企业端)删除设施设备维护信息
 * @param {*} id
 */
export function deleteMaintain(id) {
  return request({
    url: `/general-services/v1/enterprise-facility-maintain/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 查询设施设备维护信息详情（所有通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/enterprise-facility-maintain/findById/${id}`,
    method: 'get'
  })
}

/**
 * (企业端)添加设施设备维护信息
 * @param {*} data
 */
export function addMaintain(data) {
  return request({
    url: '/general-services/v1/enterprise-facility-maintain/add',
    method: 'post',
    data
  })
}

/**
 * (企业端)修改设施设备维护信息
 * @param {*} data
 */
export function updateMaintain(data) {
  return request({
    url: '/general-services/v1/enterprise-facility-maintain/update',
    method: 'PUT',
    data
  })
}
