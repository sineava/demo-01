import request from '@/utils/request'

/**
 * 水路运输经营者-统计数据
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/general-services/v1/waterway-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 水路运输经营者-统计数据
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/waterway-statistics/page-statistics',
    method: 'get',
    params
  })
}
