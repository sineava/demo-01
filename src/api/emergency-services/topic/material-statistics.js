import request from '@/utils/request'

/**
 * 应急物资-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 应急物资-专题统计-导出
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/wyx-emergency-services/v1/material-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 应急物资-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: `/wyx-emergency-services/v1/material-statistics/data-statistics`,
    method: 'get',
    params
  })
}
