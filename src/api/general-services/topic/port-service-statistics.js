import request from '@/utils/request'

/**
 * 港口企业人员数据-统计数据
 * @param {*} params
 */
export function getStatic(params) {
  return request({
    url: '/general-services/v1/port-service-statistics/data-statistics',
    method: 'get',
    params
  })
}

/**
 * 港口企业人员数据-分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/port-service-statistics/page-statistics',
    method: 'get',
    params
  })
}