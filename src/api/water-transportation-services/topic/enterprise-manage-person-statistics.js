import request from '@/utils/request'

/**
 * 专职管理人员-分页数据
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/water-transportation-services/v1/enterprise-manage-person-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 专职管理人员-分页数据
 * @param {*} params
 */
 export function getPageList(params) {
  return request({
    url: '/water-transportation-services/v1/enterprise-manage-person-statistics/page-statistics',
    method: 'get',
    params
  })
}
