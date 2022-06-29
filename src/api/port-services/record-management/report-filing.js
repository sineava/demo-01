import request from '@/utils/request'

/**
 * 行业端 安全现状评价报告备案列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/report-filing/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 安全现状评价报告备案详情（通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/port-services/v1/report-filing/find-by-id/${id}`,
    method: 'GET'
  })
}

/**
 * 企业端 安全现状评价报告备案列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/report-filing/page-en-list`,
    method: 'GET',
    params
  })
}

/**
 * 添加 安全现状评价报告备案
 * @param {*} data
 */
export function add(data) {
  return request({
    url: `/port-services/v1/report-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 重新提交
 * @param {*} data
 */
export function update(data) {
  return request({
    url: `/port-services/v1/report-filing/update`,
    method: 'PUT',
    data
  })
}

/**
 * 备案受理
 * @param {*} data
 */
export function recordAcceptance(data) {
  return request({
    url: `/port-services/v1/report-filing/record-acceptance`,
    method: 'PUT',
    data
  })
}

/**
 * 备案审核
 * @param {*} data
 */
export function recordReview(data) {
  return request({
    url: `/port-services/v1/report-filing/record-review`,
    method: 'PUT',
    data
  })
}
