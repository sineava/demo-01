import request from '@/utils/request'

/**
 * 查看港口收费行业端制定标准详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/port-services/v1/charge-industry/query',
    method: 'get',
    params
  })
}

/**
 * 查看港口企业制定制定标准详情
 * @param {*} params
 */
export function queryEnterpriseDetail(params) {
  return request({
    url: '/port-services/v1/charge-industry/query-enterprise-analyse',
    method: 'get',
    params
  })
}

/**
 * 港口企业收费标准分析查询（所有企业）
 * @param {*} params
 */
export function queryEnterpriseAnalysePage(params) {
  return request({
    url: '/port-services/v1/charge-industry/query-enterprise-analyse-page',
    method: 'get',
    params
  })
}

/**
 * 企业港口收费标准信息查询（所有企业）(不公开)
 * @param {*} params
 */
export function queryEnterprisePage(params) {
  return request({
    url: '/port-services/v1/charge-industry/query-enterprise-page',
    method: 'get',
    params
  })
}

/**
 * 查询行业端收费标准列表信息
 * @param {*} params
 */
export function selectTypes(params) {
  return request({
    url: '/port-services/v1/charge-industry/select-types',
    method: 'get',
    params
  })
}

/**
 * 行业端制定收费标准信息
 * @param {*} data
 */
export function addStandard(data) {
  return request({
    url: '/port-services/v1/charge-industry/standard',
    method: 'post',
    data
  })
}

/**
 * 行业端修改收费标准信息
 * @param {*} data
 */
export function updateStandard(data) {
  return request({
    url: '/port-services/v1/charge-industry/update',
    method: 'put',
    data
  })
}
