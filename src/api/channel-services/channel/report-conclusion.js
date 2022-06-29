import request from '@/utils/request'

/**
 * 审核信息
 * @param {*} data
 */
export function auditInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/audit-info',
    method: 'put',
    data
  })
}

/**
 * 航道养护月报上报
 * @param {*} data
 */
export function reportMonth(data) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/data-month-reported',
    method: 'post',
    data
  })
}

/**
 * 航道养护年报上报
 * @param {*} data
 */
export function reportYear(data) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/data-year-reported',
    method: 'post',
    data
  })
}

/**
 * 分页查询-月度航道养护情况上报
 * @param {*} params
 */
export function getMonthList(params) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/page-month-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询-年度航道养护情况上报
 * @param {*} params
 */
export function getYearList(params) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/page-year-list',
    method: 'get',
    params
  })
}

/**
 * 航道月报-月报详情
 * @param {*} params
 */
export function getMonthDetail(params) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/query-month-info',
    method: 'get',
    params
  })
}

/**
 * 航道月报-年报详情
 * @param {*} params
 */
export function getYearDetail(params) {
  return request({
    url: '/wyx-channel-services/v1/channel-monthly-conclusion/query-year-info',
    method: 'get',
    params
  })
}
