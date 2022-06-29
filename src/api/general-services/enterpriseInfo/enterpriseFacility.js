import request from '@/utils/request'

/**
 * (企业端)分页查询设施设备列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/enterprise-facility/pageEnList',
    method: 'get',
    params
  })
}

/**
 * (企业端)删除企业设施设备信息
 * @param {*} id
 */
export function deleteFacility(id) {
  return request({
    url: `/general-services/v1/enterprise-facility/delete/${id}`,
    method: 'delete'
  })
}

/**
 * (企业端)添加企业设施设备信息
 * @param {*} params
 */
export function addFacility(data) {
  return request({
    url: '/general-services/v1/enterprise-facility/add',
    method: 'post',
    data
  })
}

/**
 * (企业端)修改企业设施设备信息
 * @param {*} params
 */
export function updateFacility(data) {
  return request({
    url: '/general-services/v1/enterprise-facility/update',
    method: 'PUT',
    data
  })
}

/**
 * 查询设施设备详情（所有通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/general-services/v1/enterprise-facility/findById/${id}`,
    method: 'get'
  })
}

/**
 * 行业端 分页查询设施设备列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: '/general-services/v1/enterprise-facility/pageHyList',
    method: 'get',
    params
  })
}


/**
 * 综合查询-设施设备
 * @param {*} params
 */
 export function integratedQueryPage(params) {
  return request({
    url: '/general-services/v1/enterprise-facility/integrated-query-page',
    method: 'get',
    params
  })
}