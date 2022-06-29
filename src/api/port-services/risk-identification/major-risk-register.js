import request from '@/utils/request'

/**
 * 行业端 分页查询风险评估结果列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/major-risk-register/page-hy-register-list`,
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
    url: `/port-services/v1/major-risk-register/page-en-register-list`,
    method: 'GET',
    params
  })
}

/**
 * 重大风险登记详情(通用 企业端填写)
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/port-services/v1/major-risk-register/get/${id}`,
    method: 'GET'
  })
}

/**
 * 填写重大风险登记信息（企业端填写）
 * @param {*} data
 */
export function editRegister(data) {
  return request({
    url: `/port-services/v1/major-risk-register/edit-register`,
    method: 'PUT',
    data
  })
}
