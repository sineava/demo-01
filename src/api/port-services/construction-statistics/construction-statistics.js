import request from '@/utils/request'

/**
 * 危货建设项目基础情况信息
 * @param {*} params
 */
export function getInProject(params) {
  return request({
    url: '/port-services/v1/construction-statistics/integrated-query-project',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查数据
 * @param {*} params
 */
export function getInCondition(params) {
  return request({
    url: '/port-services/v1/construction-statistics/integrated-query-condition',
    method: 'get',
    params
  })
}

/**
 * 安全设施设计审查信息
 * @param {*} params
 */
export function getInDesign(params) {
  return request({
    url: '/port-services/v1/construction-statistics/integrated-query-design',
    method: 'get',
    params
  })
}

/**
 * 专项验收信息
 * @param {*} params
 */
export function getInAcceptance(params) {
  return request({
    url: '/port-services/v1/construction-statistics/integrated-query-acceptance',
    method: 'get',
    params
  })
}
