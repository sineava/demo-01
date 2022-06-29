import request from '@/utils/request'

/**
 * 企业删除标准类型
 * @param {*} params
 */
export function deleteEnterprise(params) {
  return request({
    url: `/port-services/v1/charge-enterprise/deleted/${params.id}`,
    method: 'post',
    params
  })
}

/**
 * 企业查询未制定的标准类型
 * @param {*} params
 */
export function queryDidNotMake(params) {
  return request({
    url: '/port-services/v1/charge-enterprise/query-did-not-make',
    method: 'get',
    params
  })
}

/**
 * 查看制定标准详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/port-services/v1/charge-enterprise/query-info',
    method: 'get',
    params
  })
}

/**
 * 查询企业端收费标准列表
 * @param {*} params
 */
export function queryTypes(params) {
  return request({
    url: '/port-services/v1/charge-enterprise/select-types',
    method: 'get',
    params
  })
}

/**
 * 企业端制定收费标准信息
 * @param {*} data
 */
export function addStandard(data) {
  return request({
    url: '/port-services/v1/charge-enterprise/standard',
    method: 'post',
    data
  })
}

/**
 * 企业修改自身收费标准
 * @param {*} data
 */
export function updateCharge(data) {
  return request({
    url: '/port-services/v1/charge-enterprise/update',
    method: 'put',
    data
  })
}

/**
 * 港口企业收费标准分析列表
 * @param {*} params
 */
export function queryEnterprisePage(params) {
  return request({
    url: '/port-services/v1/charge-enterprise/query-enterprise-analyse-page',
    method: 'get',
    params
  })
}
