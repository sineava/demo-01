import request from '@/utils/request'

/**
 * 行业端 分页企业风险作业单元列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/risk-activity/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业端 分页企业风险作业单元列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/risk-activity/page-en-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业风险作业单元详情
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/risk-activity/get/${id}`,
    method: 'GET'
  })
}

/**
 * 查询风险范围列表
 * @param {*} params
 */
export function getScopeList(params) {
  return request({
    url: `/port-services/v1/risk-activity/scope-list`,
    method: 'GET',
    params
  })
}

/**
 * 通过风险范围查询风险单元列表
 * @param {*} params
 */
export function findActivityList(params) {
  return request({
    url: `/port-services/v1/risk-activity/find-activity-list`,
    method: 'GET',
    params
  })
}

/**
 * 添加企业风险作业单元
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/risk-activity/add`,
    method: 'POST',
    data
  })
}

/**
 * 删除企业风险作业单元
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/port-services/v1/risk-activity/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 修改企业风险作业单元
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/risk-activity/update`,
    method: 'PUT',
    data
  })
}

/**
 * 状态设置
 * @param {*} data
 */
export function stateSettings(data) {
  return request({
    url: `/port-services/v1/risk-activity/state-settings`,
    method: 'PUT',
    data
  })
}

/**
 * 获取当前用户关联的企业信息(风险辨识使用)
 * @param {*} params
 */
export function findEnByUserId(params) {
  return request({
    url: `/general-services/v1/enterprise-basic/findEnByUserId`,
    method: 'GET',
    params
  })
}
