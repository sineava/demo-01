import request from '@/utils/request'

/**
 * （企业端）查询风险事件列表（风险评估用 开始评估页面 前端需要分组）风险值 风险等级默认
 * @param {*} params
 */
export function incidentList(params) {
  return request({
    url: `/port-services/v1/risk-assess/incident-list`,
    method: 'GET',
    params
  })
}

/**
 * (企业端）查询风险评估结果信息（id 是添加或者重新评估返回的ID 风险评估项进入详情需要对应到详情结果里面去 不新增接口）
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/risk-assess/get/${id}`,
    method: 'GET'
  })
}

/**
 * （企业端）添加企业风险评估信息信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/port-services/v1/risk-assess/add`,
    method: 'POST',
    data
  })
}

/**
 * （企业端）修改风险评估信息
 * @param {*} data
 */
export function updateAssessTermInfo(data) {
  return request({
    url: `/port-services/v1/risk-assess/update-assess-term-info`,
    method: 'PUT',
    data
  })
}

/**
 * （企业端）完成评估
 * @param {*} id
 */
export function confirmAssess(id) {
  return request({
    url: `/port-services/v1/risk-assess/confirm-assess/${id}`,
    method: 'PUT'
  })
}

/**
 * （企业端）重新评估
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/port-services/v1/risk-assess/update`,
    method: 'PUT',
    data
  })
}
