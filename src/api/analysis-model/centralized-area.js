import request from '@/utils/request'

/**
 * 安全风险研判-完成评估-集中区域
 * @param {*} id
 */
export function completeData(id) {
  return request({
    url: `/analysis-model/v1/centralized-area/current-status/${id}`,
    method: 'put'
  })
}
/**
 * 港口危险货物集中区域风险分析-详情
 * @param {*} id
 */
export function areaInfo(id) {
  return request({
    url: `/analysis-model//v1/centralized-area/info/${id}`,
    method: 'get',
    id
  })
}

/**
 * 安全风险研判-各区划风险-集中区域
 */
export function riskData() {
  return request({
    url: '/analysis-model/v1/centralized-area/each-division',
    method: 'get'
  })
}

/**
 * 安全风险研判-详情-集中区域
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/centralized-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全风险研判-初始数据-集中区域
 */
export function initData() {
  return request({
    url: '/analysis-model/v1/centralized-area/init',
    method: 'get'
  })
}

/**
 * 安全风险研判-分页列表-集中区域
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/centralized-area/page-list',
    method: 'get',
    params
  })
}

/**
 * 安全风险研判-当前风险形式趋势-集中区域
 * @param {*} id
 */
export function del(id) {
  return request({
    url: `/analysis-model//v1/centralized-area/del/${id}`,
    method: 'DELETE'
  })
}

/**
 * 安全风险研判-当前风险形式趋势-集中区域
 * @param {*} id
 */
export function currentData(id) {
  return request({
    url: `/analysis-model/v1/centralized-area/present/${id}`,
    method: 'get'
  })
}

/**
 * 安全风险研判-提交评估-集中区域
 * @param {*} data
 */
export function assessData(data) {
  return request({
    url: '/analysis-model/v1/centralized-area/submit-assess',
    method: 'post',
    data
  })
}

/**
 * 安全风险研判-趋势-集中区域
 * @param {*} id
 */
export function trendData(id) {
  return request({
    url: `/analysis-model/v1/centralized-area/tendency-list/${id}`,
    method: 'get',
    id
  })
}
