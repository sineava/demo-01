import request from '@/utils/request'

/**
 * 删除信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/port-services/v1/port-safety-facility-design-review/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 安全设施设计审查业务办理
 * @param {*} data
 */
export function handleReview(data) {
  return request({
    url: '/port-services/v1/port-safety-facility-design-review/handling',
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
    url: '/port-services/v1/port-safety-facility-design-review/pageList',
    method: 'get',
    params
  })
}

/**
 * 分页查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/port-safety-facility-design-review/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 查询详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/port-services/v1/port-safety-facility-design-review/query',
    method: 'get',
    params
  })
}

/**
 * 受理安全设施设计审查信息
 * @param {*} data
 */
export function saveReview(data) {
  return request({
    url: '/port-services/v1/port-safety-facility-design-review/save',
    method: 'post',
    data
  })
}

/**
 * 安全设施设计审查-分页查询-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/port-services/v1/port-safety-facility-design-review/statistical-page',
    method: 'get',
    params
  })
}

/**
 * 安全设施设计审查-导出-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/port-services/v1/port-safety-facility-design-review/export-list',
    method: 'get',
    params
  })
}
