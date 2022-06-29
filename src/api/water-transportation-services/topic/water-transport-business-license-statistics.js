import request from '@/utils/request'

/**
 * 经营许可证-分页数据
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-business-license-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 经营许可证-分页数据
 * @param {*} params
 */
 export function getPageList(params) {
  return request({
    url: '/water-transportation-services/v1/water-transport-business-license-statistics/page-statistics',
    method: 'get',
    params
  })
}
