import request from '@/utils/request'

/**
 * 行业端 企业重大风险报备信息列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/major-risk-reporting/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业端 企业重大风险报备信息列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/major-risk-reporting/page-en-list`,
    method: 'GET',
    params
  })
}

/**
 * 查询企业重大风险报备信息（通用）
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/major-risk-reporting/get/${id}`,
    method: 'GET'
  })
}

/**
 * 查询企业风险单元列表
 * @param {*} params
 */
export function findList(params) {
  return request({
    url: `/port-services/v1/major-risk-reporting/find-list`,
    method: 'GET',
    params
  })
}

/**
 * 通过风险单元ID 查询风险单元下的事件列表
 * @param {*} params
 */
export function findIncidentList(params) {
  return request({
    url: `/port-services/v1/major-risk-reporting/find-incident-list`,
    method: 'GET',
    params
  })
}

/**
 * 添加 企业重大风险报备信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/major-risk-reporting/add`,
    method: 'POST',
    data
  })
}

/**
 * 删除 企业重大风险报备信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/port-services/v1/major-risk-reporting/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 修改 企业重大风险报备信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/major-risk-reporting/update`,
    method: 'PUT',
    data
  })
}
