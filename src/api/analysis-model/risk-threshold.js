import request from '@/utils/request'

/**
 * 修改阈值
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: '/analysis-model/v1/risk-threshold/alter',
    method: 'put',
    data
  })
}

/**
 * 阈值列表
 * @param {number} type
 */
export function getList(type) {
  return request({
    url: `/analysis-model/v1/risk-threshold/list/${type}`,
    method: 'get'
  })
}
