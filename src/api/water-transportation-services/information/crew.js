import request from '@/utils/request'

/**
 * 专题统计 船员信息统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: `/water-transportation-services/v1/crew/crew-statistics`,
    method: 'get',
    params
  })
}

/**
 * 专题统计 导出船员信息
 * @param {*} params
 */
 export function exportTopicList(params) {
  return request({
    url: `/water-transportation-services/v1/crew/export-crew`,
    method: 'get',
    params
  })
}

/**
 * 专题统计 分页查询船员列表
 * @param {*} params
 */
 export function getTopicList(params) {
  return request({
    url: `/water-transportation-services/v1/crew/page-list`,
    method: 'get',
    params
  })
}