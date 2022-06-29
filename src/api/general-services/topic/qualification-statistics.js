import request from '@/utils/request'

/**
 * 港口企业资质数据-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/qualification-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 港口企业资质数据-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/qualification-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 港口企业资质数据-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/general-services/v1/qualification-statistics/data-statistics',
    method: 'get',
    params
  })
}
