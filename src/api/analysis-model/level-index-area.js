import request from '@/utils/request'

/**
 * 安全形式分析-完成评估-行业安全发展水平
 * @param {*} id
 */
export function completeData(id) {
  return request({
    url: `/analysis-model/v1/level-index-area/current-status/${id}`,
    method: 'put'
  })
}

/**
 * 行业安全发展水平指标体系-详情
 * @param {*} id
 */
export function areaInfo(id) {
  return request({
    url: `/analysis-model/v1/level-index-area/info/${id}`,
    method: 'get',
    id
  })
}

/**
 * 安全形式分析-各区划风险-行业安全发展水平
 */
export function riskData() {
  return request({
    url: '/analysis-model/v1/level-index-area/each-division',
    method: 'get'
  })
}

/**
 * 安全形式分析-详情-行业安全发展水平
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/level-index-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-初始数据-行业安全发展水平
 */
export function initData() {
  return request({
    url: '/analysis-model/v1/level-index-area/init',
    method: 'get'
  })
}

/**
 * 安全形式分析-分页列表-行业安全发展水平
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/level-index-area/page-list',
    method: 'get',
    params
  })
}

/**
 * 行业安全发展水平指标体系-删除评估内容
 * @param {*} params
 */
export function del(id) {
  return request({
    url: `/analysis-model/v1/level-index-area/del/${id}`,
    method: 'DELETE',
  })
}

/**
 * 安全形式分析-当前风险形式趋势-行业安全发展水平
 * @param {*} id
 */
export function currentData(id) {
  return request({
    url: `/analysis-model/v1/level-index-area/present/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-提交评估-行业安全发展水平
 * @param {*} data
 */
export function assessData(data) {
  return request({
    url: '/analysis-model/v1/level-index-area/submit-assess',
    method: 'post',
    data
  })
}

/**
 * 安全形式分析-趋势-行业安全发展水平
 * @param {*} id
 */
export function trendData(id) {
  return request({
    url: `/analysis-model/v1/level-index-area/tendency-list/${id}`,
    method: 'get',
    id
  })
}
