import request from '@/utils/request'

/**
 * 行政区划列表
 * @param {*} type
 */
export function getData(type) {
  return request({
    url: `/analysis-model/v1/administrative-division/list/${type}`,
    method: 'get'
  })
}
