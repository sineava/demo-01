import request from '@/utils/request'

/**
 * 安全检查类型数据-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/safety-item-statistical/page-statistics',
    method: 'get',
    params
  })
}

/**
 * 安全检查类型数据-批量导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/safety-item-statistical/export-statistics',
    method: 'get',
    params
  })
}

/**
 * 安全检查类型数据-统计数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/general-services/v1/safety-item-statistical/data-statistics',
    method: 'get',
    params
  })
}
