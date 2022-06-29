import request from '@/utils/request'

/**
 * 行业端 重大危险源备案信息
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/major-hazard-filing/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 应急预案备案信息详情（通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/port-services/v1/major-hazard-filing/find-by-id/${id}`,
    method: 'GET'
  })
}

/**
 * 企业端 重大危险源备案信息
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/major-hazard-filing/page-en-list`,
    method: 'GET',
    params
  })
}

/**
 * 添加 重大危险源备案信息
 * @param {*} data
 */
export function add(data) {
  return request({
    url: `/port-services/v1/major-hazard-filing/add`,
    method: 'POST',
    data
  })
}

/**
 * 重新提交 重大危险源备案信息
 * @param {*} data
 */
export function update(data) {
  return request({
    url: `/port-services/v1/major-hazard-filing/update`,
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
    url: `/port-services/v1/major-hazard-filing/record-acceptance`,
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
    url: `/port-services/v1/major-hazard-filing/record-review`,
    method: 'PUT',
    data
  })
}
