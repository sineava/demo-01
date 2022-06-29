import request from '@/utils/request'

/**
 * 安全形式分析-完成评估-辖区水上交通
 * @param {*} id
 */
export function completeData(id) {
  return request({
    url: `/analysis-model/v1/safe-mode-appraisal-area/current-status/${id}`,
    method: 'put'
  })
}

/**
 * 安全形式分析-各区划风险-辖区水上交通
 */
export function riskData() {
  return request({
    url: '/analysis-model/v1/safe-mode-appraisal-area/each-division',
    method: 'get'
  })
}

/**
 * 安全形式分析-详情-辖区水上交通
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/safe-mode-appraisal-area/info/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-初始数据-辖区水上交通
 */
export function initData() {
  return request({
    url: '/analysis-model/v1/safe-mode-appraisal-area/init',
    method: 'get'
  })
}

/**
 * 安全形式分析-分页列表-辖区水上交通
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/analysis-model/v1/safe-mode-appraisal-area/page-list',
    method: 'get',
    params
  })
}

/**
 * 安全形式分析-当前风险形式趋势-辖区水上交通
 * @param {*} id
 */
export function currentData(id) {
  return request({
    url: `/analysis-model/v1/safe-mode-appraisal-area/present/${id}`,
    method: 'get'
  })
}

/**
 * 安全形式分析-提交评估-辖区水上交通
 * @param {*} data
 */
export function assessData(data) {
  return request({
    url: '/analysis-model/v1/safe-mode-appraisal-area/submit-assess',
    method: 'post',
    data
  })
}

/**
 * 安全形式分析-详情
 * @param {*} id
 */
export function areaInfo(id) {
  return request({
    url: `/analysis-model/v1/safe-mode-appraisal-area/info/${id}`,
    method: 'get',
    id
  })
}

/**
 * 安全形式分析-趋势-辖区水上交通
 * @param {*} id
 */
export function trendData(id) {
  return request({
    url: `/analysis-model/v1/safe-mode-appraisal-area/tendency-list/${id}`,
    method: 'get',
    id
  })
}

/**
 * 安全形式分析-删除评估内容
 * @param {*} id
 */
export function delAppraisalArea(id) {
  return request({
    url: `/analysis-model/v1/safe-mode-appraisal-area/del/${id}`,
    method: 'delete',
    id
  })
}
