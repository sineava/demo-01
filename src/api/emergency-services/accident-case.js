import request from '@/utils/request'

/**
 * 通用-删除事故案例记录
 * @param {*} params
 */
export function deleteAccident(params) {
  return request({
    url: `/wyx-emergency-services/v1/accident-case/delete/${params.id}`,
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
    url: '/wyx-emergency-services/v1/accident-case/page-enterprise-list',
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
    url: '/wyx-emergency-services/v1/accident-case/page-list',
    method: 'get',
    params
  })
}

/**
 * 综合查询-应急预案-分页查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/accident-case/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 通用-事故案例详情查询
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/accident-case/query-info',
    method: 'get',
    params
  })
}

/**
 * 通用-新增事故案例记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/accident-case/save-info',
    method: 'post',
    data
  })
}

/**
 * 通用-修改事故案例记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/accident-case/update-info',
    method: 'put',
    data
  })
}
