import request from '@/utils/request'

/**
 * 添加指标
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: '/analysis-model/v1/indicator/add',
    method: 'post',
    data
  })
}

/**
 * 修改指标
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/analysis-model/v1/indicator/alert',
    method: 'put',
    data
  })
}

/**
 * 采集频率选择列表
 */
export function getFrequencyList() {
  return request({
    url: '/analysis-model/v1/indicator/collection-frequency-list',
    method: 'get'
  })
}

/**
 * 删除指标
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/analysis-model/v1/indicator/del/${id}`,
    method: 'put'
  })
}

/**
 * 指标详情
 * @param {*} id
 */
export function getData(id) {
  return request({
    url: `/analysis-model/v1/indicator/info/${id}`,
    method: 'get'
  })
}

/**
 * 指标列表
 * @param {*} type
 */
export function getList(type) {
  return request({
    url: `/analysis-model/v1/indicator/list/${type}`,
    method: 'get'
  })
}

/**
 * 开始评估（通用）
 * @param {*} type
 */
export function startAssess(type) {
  return request({
    url: `/analysis-model/v1/indicator/begin-assess/${type}`,
    method: 'get'
  })
}
