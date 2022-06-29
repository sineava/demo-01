import request from '@/utils/request'

/**
 * 删除信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/port-services/v1/safety-facility-acceptance/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 审核专项验收信息
 * @param {*} data
 */
export function handleInfo(data) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/handling',
    method: 'post',
    data
  })
}

/**
 * 分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/pageList',
    method: 'get',
    params
  })
}

/**
 * 分页查询-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 查询详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/query',
    method: 'get',
    params
  })
}

/**
 * 受理专项验收信息
 * @param {*} data
 */
export function saveAcceptance(data) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/save',
    method: 'post',
    data
  })
}

/**
 * 专项验收信息-分页-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/statistical-page',
    method: 'get',
    params
  })
}

/**
 * 专项验收信息-导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/port-services/v1/safety-facility-acceptance/export-list',
    method: 'get',
    params
  })
}
