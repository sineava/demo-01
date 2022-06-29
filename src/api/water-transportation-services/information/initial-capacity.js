import request from '@/utils/request'

/**
 * 行业端 查询初始运力信息
 * @param {*} id
 */
export function getHyCapacityInfo(id) {
  return request({
    url: `/water-transportation-services/v1/initial-capacity/get-hy-capacity-info/${id}`,
    method: 'get'
  })
}

/**
 * 企业端 查询初始运力信息
 * @param {*} params
 */
export function getEnCapacityInfo(params) {
  return request({
    url: `/water-transportation-services/v1/initial-capacity/get-en-capacity-info`,
    method: 'get',
    params
  })
}

/**
 * 修改初始运力信息
 * @param {*} params
 */
export function updateCapacity(data) {
  return request({
    url: '/water-transportation-services/v1/initial-capacity/update-info',
    method: 'PUT',
    data
  })
}
