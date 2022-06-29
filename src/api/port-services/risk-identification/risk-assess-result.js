import request from '@/utils/request'

/**
 * 行业端 分页查询风险评估结果列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/risk-assess-result/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 企业端 分页查询风险评估结果列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/risk-assess-result/page-en-list`,
    method: 'GET',
    params
  })
}
