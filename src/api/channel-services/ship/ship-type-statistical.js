import request from '@/utils/request'

/**
 * 上下行明细
 * @param {*} params
 */
export function queryList(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type-statistical/detailed-query-statistical-list',
    method: 'get',
    params
  })
}

/**
 * 过闸船舶货物分类统计
 * @param {*} params
 */
export function queryGoodsList(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type-statistical/goods-type-statistical-list',
    method: 'get',
    params
  })
}

/**
 * 船舶核载吨位统计
 * @param {*} params
 */
export function getTonnageList(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type-statistical/ship-tonnage-statistical-list',
    method: 'get',
    params
  })
}

/**
 * 过闸船舶分类统计
 * @param {*} params
 */
export function queryStatisticalList(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type-statistical/ship-type-statistical-list',
    method: 'get',
    params
  })
}

/**
 * 上下行统计
 * @param {*} params
 */
export function queryUpDownList(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type-statistical/up-down-statistical-list',
    method: 'get',
    params
  })
}
