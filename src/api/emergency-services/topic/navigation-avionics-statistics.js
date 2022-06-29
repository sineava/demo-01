import request from '@/utils/request'

/**
 * 航电枢纽-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/navigation-avionics-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 航电枢纽-专题统计-导出
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/navigation-avionics-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 航电枢纽-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: `/wyx-emergency-services/v1/navigation-avionics-statistics/data-statistics`,
    method: 'get',
    params
  })
}
