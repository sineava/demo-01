import request from '@/utils/request'

/**
 * 企业端新增危货作业情况反馈信息
 * @param {*} data
 */
export function addFeedback(data) {
  return request({
    url: '/port-services/v1/dangerous-declare/add-feedback-info',
    method: 'post',
    data
  })
}

/**
 * 查询当前企业的泊位列表
 * @param {*} params
 */
export function getBerthList(params) {
  return request({
    url: '/port-services/v1/dangerous-declare/berth-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 港口危险货物作业信息/港口危险货物作业情况列表（通用）
 * @param {*} params
 */
export function getEnList(params) {
  return request({
    url: '/port-services/v1/dangerous-declare/en-list',
    method: 'get',
    params
  })
}

/**
 * 港口危险货物作业信息详情（通用 包含作业情况详情）
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/dangerous-declare/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 行业端 港口危险货物作业信息
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/port-services/v1/dangerous-declare/list',
    method: 'get',
    params
  })
}

/**
 * 综合查询-港口危险货物作业信息
 * @param {*} params
 */
export function getInList(params) {
  return request({
    url: '/port-services/v1/dangerous-declare/integrated-query-page',
    method: 'get',
    params
  })
}
