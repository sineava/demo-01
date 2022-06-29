import request from '@/utils/request'

/**
 * 安全风险研判-完成评估-水上交通
 * @param {*} id
 */
export function completeData(id) {
  return request({
    url: `/analysis-model/v1/risk-analysis-area/current-status/${id}`,
    method: 'put'
  })
}

/**
 * 水上交通安全风险研判-详情
 * @param {*} id
 */
export function areaInfo(id) {
  return request({
    url: `/analysis-model/v1/risk-analysis-area/info/${id}`,
    method: 'get',
    id
  })
}

/**
 * 安全风险研判-各区划风险-水上交通
 */
export function riskData() {
  return request({
    url: '/analysis-model/v1/risk-analysis-area/each-division',
    method: 'get'
  })
}

/**
 * 安全风险研判-详情-水上交通
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/risk-analysis-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全风险研判-初始数据-水上交通
 */
export function initData() {
  return request({
    url: '/analysis-model/v1/risk-analysis-area/init',
    method: 'get'
  })
}

/**
 * 安全风险研判-分页列表-水上交通
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/risk-analysis-area/page-list',
    method: 'get',
    params
  })
}
/**
 * 安全风险研判-当前风险形式趋势-水上交通
 * @param {*} id
 */
export function del(id) {
  return request({
    url: `/analysis-model/v1/risk-analysis-area/del/${id}`,
    method: 'DELETE'
  })
}

/**
 * 安全风险研判-当前风险形式趋势-水上交通
 * @param {*} id
 */
export function currentData(id) {
  return request({
    url: `/analysis-model/v1/risk-analysis-area/present/${id}`,
    method: 'get'
  })
}

/**
 * 安全风险研判-提交评估-水上交通
 * @param {*} data
 */
export function assessData(data) {
  return request({
    url: '/analysis-model/v1/risk-analysis-area/submit-assess',
    method: 'post',
    data
  })
}

/**
 * 安全风险研判-趋势-水上交通
 * @param {*} id
 */
export function trendData(id) {
  return request({
    url: `/analysis-model/v1/risk-analysis-area/tendency-list/${id}`,
    method: 'get',
    id
  })
}
