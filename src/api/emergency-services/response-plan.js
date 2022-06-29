import request from '@/utils/request'

/**
 * 删除应急预案记录
 * @param {*} params
 */
export function deletePlan(params) {
  return request({
    url: `/wyx-emergency-services/v1/response-plan/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 应急预案管理-分页查询（企业端）
 * @param {*} params
 */
export function getEnPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/page-enterprise-list',
    method: 'get',
    params
  })
}

/**
 * 应急预案管理-分页查询（行业端）
 * @param {*} params
 */
export function getHyPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/page-industry-list',
    method: 'get',
    params
  })
}

/**
 * 应急预案管理-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/integrated-query-page-list',
    method: 'get',
    params
  })
}

/**
 * 根据预案编号查询预案详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/query-info',
    method: 'get',
    params
  })
}

/**
 * 发布应急预案记录
 * @param {*} params
 */
export function releasePlan(params) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/release',
    method: 'put',
    params
  })
}

/**
 * 新增应急预案记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改应急预案记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/response-plan/update-info',
    method: 'put',
    data
  })
}
