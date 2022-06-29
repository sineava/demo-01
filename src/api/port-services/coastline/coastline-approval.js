import request from '@/utils/request'

/**
 * 分页查询岸线审批列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/coastline-approval/page-list',
    method: 'get',
    params
  })
}

/**
 * 综合查询-岸线审批列表
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/coastline-approval/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 岸线审批信息详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/coastline-approval/get/${params.id}`,
    method: 'get',
    params
  })
}
