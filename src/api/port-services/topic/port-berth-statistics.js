import request from '@/utils/request'

/**
 * 码头泊位类型-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/port-services/v1/port-berth-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 码头泊位类型-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/port-services/v1/port-berth-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 码头泊位类型-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/port-services/v1/port-berth-statistics/page-statistics',
    method: 'get',
    params
  })
}
