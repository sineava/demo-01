import request from '@/utils/request'

/**
 * 行业端 港口服务企业信息备案信息列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: `/port-services/v1/service-en-filing/page-hy-list`,
    method: 'GET',
    params
  })
}

/**
 * 港口服务企业信息备案信息详情（通用）
 * @param {*} id
 */
export function findById(id) {
  return request({
    url: `/port-services/v1/service-en-filing/find-by-id/${id}`,
    method: 'GET'
  })
}

/**
 * 企业端 港口服务企业信息备案信息列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: `/port-services/v1/service-en-filing/page-en-list`,
    method: 'GET',
    params
  })
}

/**
 * 添加 港口服务企业信息备案信息（初次备案 变更备案 撤销备案 ）通用
 * @param {*} data
 */
export function add(data) {
  return request({
    url: `/port-services/v1/service-en-filing/add`,
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
    url: `/port-services/v1/service-en-filing/update`,
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
    url: `/port-services/v1/service-en-filing/record-acceptance`,
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
    url: `/port-services/v1/service-en-filing/record-review`,
    method: 'PUT',
    data
  })
}
