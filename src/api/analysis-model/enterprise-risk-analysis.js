import request from '@/utils/request'

/**
 * 安全形式分析-完成评估-重点监管企业
 * @param {*} id
 */
export function completeData(id) {
  return request({
    url: `/analysis-model/v1/enterprise-risk-analysis/current-status/${id}`,
    method: 'put'
  })
}

/**
 * 安全形式分析-各区划风险-重点监管企业
 */
export function riskData() {
  return request({
    url: '/analysis-model/v1/enterprise-risk-analysis/each-division',
    method: 'get'
  })
}

/**
 * 安全形式分析-详情-重点监管企业
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/enterprise-risk-analysis/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-初始数据-重点监管企业
 */
export function initData() {
  return request({
    url: '/analysis-model/v1/enterprise-risk-analysis/init',
    method: 'get'
  })
}

/**
 * 安全形式分析-分页列表-重点监管企业
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/enterprise-risk-analysis/page-list',
    method: 'get',
    params
  })
}
/**
 * 删除重点监管企业
 * @param {*} params
 */
export function del(id) {
  return request({
    url: `/analysis-model/v1/enterprise-risk-analysis/del//${id}`,
    method: 'DELETE'
  })
}
/**
 * 查询企业详情
 * @param {*} params
 */
export function areaInfo(id) {
  return request({
    url: `/analysis-model/v1/enterprise-risk-analysis/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-当前风险形式趋势-重点监管企业
 * @param {*} id
 */
export function currentData(id) {
  return request({
    url: `/analysis-model/v1/enterprise-risk-analysis/present/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-提交评估-重点监管企业
 * @param {*} data
 */
export function assessData(data) {
  return request({
    url: '/analysis-model/v1/enterprise-risk-analysis/submit-assess',
    method: 'post',
    data
  })
}

/**
 * 安全形式分析-趋势-重点监管企业
 * @param {*} id
 */
export function trendData(id) {
  return request({
    url: `/analysis-model/v1/enterprise-risk-analysis/tendency-list/${id}`,
    method: 'get',
    id
  })
}
