import request from '@/utils/request'

/**
 * 行业端 查询风险事件与作业单元列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/risk-incident/page-hy-risk-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业端 查询风险事件与作业单元列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/risk-incident/page-en-risk-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业风险事件信息 详情
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/risk-incident/get/${id}`,
    method: 'GET'
  })
}

/**
 * 分页查询风险单元下 风险事件列表
 * @param {*} params
 */
export function pageIncidentList(params) {
  return request({
    url: `/port-services/v1/risk-incident/page-incident-list`,
    method: 'GET',
    params
  })
}

/**
 * 添加 企业风险事件信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/risk-incident/add`,
    method: 'POST',
    data
  })
}

/**
 * 删除 企业风险事件信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/port-services/v1/risk-incident/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 修改 企业风险事件信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/risk-incident/update`,
    method: 'PUT',
    data
  })
}
