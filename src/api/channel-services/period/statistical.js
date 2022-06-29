import request from '@/utils/request'

/**
 * 节假日上报同比统计
 * @param {*} params
 */
export function getCompareList(params) {
  return request({
    url: '/wyx-channel-services/v1/statistical/select-compared-list',
    method: 'get',
    params
  })
}

/**
 * 节假日上报统计
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/wyx-channel-services/v1/statistical/select-list',
    method: 'get',
    params
  })
}

/**
 * 重要时段上报统计（全部）
 * @param {*} params
 */
export function getAllList(params) {
  return request({
    url: '/wyx-channel-services/v1/statistical/select-all',
    method: 'get',
    params
  })
}

