import request from '@/utils/request'

/**
 * 安全形式分析-完成评估-效能督察
 * @param {*} id
 */
export function completeData(id) {
  return request({
    url: `/analysis-model/v1/statistic-analysis/current-status/${id}`,
    method: 'put'
  })
}

/**
 * 安全形式分析-各区划风险-效能督察
 */
export function riskData() {
  return request({
    url: '/analysis-model/v1/statistic-analysis/each-division',
    method: 'get'
  })
}

/**
 * 安全形式分析-详情-效能督察
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/statistic-analysis/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-初始数据-效能督察
 */
export function initData() {
  return request({
    url: '/analysis-model/v1/statistic-analysis/init',
    method: 'get'
  })
}

/**
 * 安全形式分析-分页列表-效能督察
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/statistic-analysis/page-list',
    method: 'get',
    params
  })
}

/**
 * 效能督察统计分析-详情
 * @param {*} id
 */
export function areaInfo(id) {
  return request({
    url: `/analysis-model/v1/statistic-analysis/info/${id}`,
    method: 'get',
    id
  })
}

/**
 * 效能督察统计分析-删除评估内容
 * @param {*} params
 */
export function del(id) {
  return request({
    url: `/analysis-model/v1/statistic-analysis/del/${id}`,
    method: 'DELETE'
  })
}

/**
 * 安全形式分析-当前风险形式趋势-效能督察
 */
export function currentData() {
  return request({
    url: `/analysis-model/v1/statistic-analysis/present`,
    method: 'get'
  })
}

/**
 * 安全形式分析-提交评估-效能督察
 * @param {*} data
 */
export function assessData(data) {
  return request({
    url: '/analysis-model/v1/statistic-analysis/submit-assess',
    method: 'post',
    data
  })
}

/**
 * 安全形式分析-趋势-效能督察
 */
export function trendData() {
  return request({
    url: `/analysis-model/v1/statistic-analysis/tendency-list`,
    method: 'get'
  })
}
