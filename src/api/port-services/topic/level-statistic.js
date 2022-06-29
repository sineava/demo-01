import request from '@/utils/request'

/**
 * 风险等级数据-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/port-services/v1/level-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 风险等级数据-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/port-services/v1/level-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 风险等级数据-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/port-services/v1/level-statistics/page-statistics',
    method: 'get',
    params
  })
}
