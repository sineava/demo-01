import request from '@/utils/request'

/**
 * 规划文件数据-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/port-services/v1/coastline-planning-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 规划文件数据-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/port-services/v1/coastline-planning-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 规划文件数据-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/port-services/v1/coastline-planning-statistics/data-statistics',
    method: 'get',
    params
  })
}
