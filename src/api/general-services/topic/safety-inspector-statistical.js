import request from '@/utils/request'

/**
 * 检查人员数据-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/safety-inspector-statistical/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 检查人员数据-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/safety-inspector-statistical/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 检查人员数据-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/general-services/v1/safety-inspector-statistical/data-statistics',
    method: 'get',
    params
  })
}
