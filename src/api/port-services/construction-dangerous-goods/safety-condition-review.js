import request from '@/utils/request'

/**
 * 安全条件审查分页查询
 * @param {*} params
 */
export function queryPageList(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/pageList',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查分页查询
 * @param {*} params
 */
export function queryInPageList(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/query',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查-分页查询-专题统计
 * @param {*} params
 */
export function queryTopicPageList(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/statistical-page',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查-分页查询-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/export-list',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查分页查询(3.0)
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/pageList',
    method: 'get',
    params
  })
}

/**
 * 安全条件审查详情(3.0)
 * @param {*} params
 */
export function getInfo(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/query',
    method: 'get',
    params
  })
}

/**
 * 综合查询-安全条件审查(3.0)
 * @param {*} params
 */
export function getQueryPage(params) {
  return request({
    url: '/port-services/v1/safety-condition-review/integrated-query-page',
    method: 'get',
    params
  })
}
