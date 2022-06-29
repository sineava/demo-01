import request from '@/utils/request'

/**
 * 通航水域-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/water-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 通航水域-专题统计-导出
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/water-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 通航水域-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/wyx-emergency-services/v1/water-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 通航水域-分页
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/wyx-emergency-services/v1/water-statistics/pages-statistics',
    method: 'get',
    params
  })
}