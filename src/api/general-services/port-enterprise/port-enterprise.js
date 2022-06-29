import request from '@/utils/request'

/**
 * 修改港口企业地理位置信息
 * @param {*} data
 */
export function updateAddress(data) {
  return request({
    url: '/general-services/v1/port-enterprise/alter',
    method: 'put',
    data
  })
}

/**
 * 通过企业ID 查询口企业详细信息
 * @param {*} params
 */
export function getInfo(enterpriseId) {
  return request({
    url: `/general-services/v1/port-enterprise/find/${enterpriseId}`,
    method: 'get'
  })
}

/**
 * 行业端 分页查询港口企业列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/general-services/v1/port-enterprise/port-en-list',
    method: 'get',
    params
  })
}
