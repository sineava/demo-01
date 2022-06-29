import request from '@/utils/request'

/**
 * 地名搜索V2.0
 * @param {*} params
 */
export function getAddress(params) {
  return request({
    url: '/tianditu/search',
    method: 'get',
    params
  })
}

/**
 * 逆地理编码
 * @param {*} params
 */
export function geocoder(params) {
  return request({
    url: '/tianditu/geocoder',
    method: 'get',
    params
  })
}
