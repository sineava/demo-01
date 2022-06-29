import request from '@/utils/request'

/**
 * 船舶营运信息数据-专题统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/water-transportation-services/v1/license-info/project-statistics-page',
    method: 'get',
    params
  })
}

/**
 * 船舶营运信息数据-专题统计-导出
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/water-transportation-services/v1/license-info/project-statistics-list',
    method: 'get',
    params
  })
}

/**
 * 船舶营运信息数据-专题统计
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: `/water-transportation-services/v1/license-info/project-statistics`,
    method: 'get',
    params
  })
}
