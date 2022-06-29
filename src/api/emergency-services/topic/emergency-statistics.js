import request from '@/utils/request'

/**
 * 应急预案-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/emergency-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 应急预案-专题统计-导出
 * @param {*} params
 */
export function exportList(params) {
  return request({
    url: '/wyx-emergency-services/v1/emergency-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 应急预案-专题统计
 * @param {*} params
 */
export function getTopicPlan(params) {
  return request({
    url: `/wyx-emergency-services/v1/emergency-statistics/integrated-query-project`,
    method: 'get',
    params
  })
}
