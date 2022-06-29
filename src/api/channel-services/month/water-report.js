import request from '@/utils/request'

/**
 * 审核电讯月报
 * @param {*} data
 */
export function auditInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/water-report/audit-info',
    method: 'put',
    data
  })
}

/**
 * 分页查询-电讯月报列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/water-report/page-list',
    method: 'get',
    params
  })
}

/**
 * 查询电讯月报详情
 * @param {*} params
 */
export function getInfo(params) {
  return request({
    url: '/wyx-channel-services/v1/water-report/query-info',
    method: 'get',
    params
  })
}

/**
 * 查询电讯月报新建格式
 * @param {*} params
 */
export function queryJSON(params) {
  return request({
    url: '/wyx-channel-services/v1/water-report/query-json',
    method: 'get',
    params
  })
}

/**
 * 水运月报汇总
 * @param {*} params
 */
export function querySummary(params) {
  return request({
    url: '/wyx-channel-services/v1/water-report/query-summary',
    method: 'get',
    params
  })
}

/**
 * 水运月报汇总-动力变更情况表
 * @param {*} params
 */
export function querySummaryChange(params) {
  return request({
    url: '/wyx-channel-services/v1/water-report/query-summary-change-data',
    method: 'get',
    params
  })
}

/**
 * 新建指标电讯月报
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/water-report/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改指标电讯月报
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/water-report/update-info',
    method: 'put',
    data
  })
}

/**
 * 删除指标电讯月报
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/water-report/delete-info/${params.id}`,
    method: 'delete',
    params
  })
}
