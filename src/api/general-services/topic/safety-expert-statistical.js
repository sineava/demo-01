import request from '@/utils/request'

/**
 * 邀请专家数据-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/safety-expert-statistical/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 邀请专家数据-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/safety-expert-statistical/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 邀请专家数据-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/general-services/v1/safety-expert-statistical/data-statistics',
    method: 'get',
    params
  })
}
