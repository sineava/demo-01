import request from '@/utils/request'

/**
 * 复查验收数据-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/safety-review-record-statistical/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 复查验收数据-专题统计-导出
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/safety-review-record-statistical/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 复查验收数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: `/general-services/v1/safety-review-record-statistical/data-statistics`,
    method: 'get',
    params
  })
}
