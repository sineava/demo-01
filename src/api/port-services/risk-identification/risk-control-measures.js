import request from '@/utils/request'

/**
 * 行业端 分页查询风险评估结果列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/risk-control-measures/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业端 分页查询企业风险管控措施列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/risk-control-measures/page-en-list`,
    method: 'GET',
    params
  })
}

/**
 * 风险管控下风险管控措施记录列表（通用）
 * @param {*} params
 */
export function pageRecordList(params) {
  return request({
    url: `/port-services/v1/risk-control-measures/page-record-list`,
    method: 'GET',
    params
  })
}

/**
 * 险管控措施记录详情（通用） 企业端可以编辑 行业端只能查看详情
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/risk-control-measures/get/${id}`,
    method: 'GET'
  })
}

/**
 * 填写风险管控措施记录信息（企业端填写）
 * @param {*} data
 */
export function editRecord(data) {
  return request({
    url: `/port-services/v1/risk-control-measures/edit-record`,
    method: 'PUT',
    data
  })
}
