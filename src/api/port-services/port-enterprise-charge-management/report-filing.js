import request from '@/utils/request'

/**
 * 添加/重新提交 安全现状评价报告备案
 * @param {*} data
 */
export function addReportFiling(data) {
  return request({
    url: '/port-services/v1/report-filing/add',
    method: 'post',
    data
  })
}

/**
 * 安全现状评价报告备案详情（通用）
 * @param {*} data
 */
export function findById(params) {
  return request({
    url: `/port-services/v1/report-filing/find-by-id/${params.id}`,
    method: 'post',
    params
  })
}

/**
 * 企业端 安全现状评价报告备案列表
 * @param {*} params
 */
export function getPageEnList(params) {
  return request({
    url: '/port-services/v1/report-filing/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 行业端 安全现状评价报告备案列表
 * @param {*} params
 */
export function getPageHyList(params) {
  return request({
    url: '/port-services/v1/report-filing/page-hy-list',
    method: 'get',
    params
  })
}

/**
 * 安全现状评价报告备案:备案受理
 * @param {*} data
 */
export function recordAcceptance(data) {
  return request({
    url: '/port-services/v1/report-filing/record-acceptance',
    method: 'put',
    data
  })
}

/**
 * 安全现状评价报告备案:备案审核
 * @param {*} data
 */
export function recordReview(data) {
  return request({
    url: '/port-services/v1/report-filing/record-review',
    method: 'put',
    data
  })
}
