import request from '@/utils/request'

/**
 * 船舶基本信息数据-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/water-transportation-services/v1/enterprise-ship-statistics/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 船舶基本信息数据-专题统计-导出
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/water-transportation-services/v1/enterprise-ship-statistics/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 船舶基本信息数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: `/water-transportation-services/v1/enterprise-ship-statistics/data-statistics`,
    method: 'get',
    params
  })
}
