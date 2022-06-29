import request from '@/utils/request'

/**
 * 安全检查计划-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/safety-planning-statistical/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 安全检查计划-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/safety-planning-statistical/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 安全检查计划-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/general-services/v1/safety-planning-statistical/data-statistics',
    method: 'get',
    params
  })
}
