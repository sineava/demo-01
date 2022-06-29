import request from '@/utils/request'

/**
 * 派遣专家
 * @param {*} data
 */
export function dispatchExpert(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/dispatch-expert',
    method: 'post',
    data
  })
}

/**
 * 派遣应急物资
 * @param {*} data
 */
export function dispatchMaterial(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/dispatch-material',
    method: 'post',
    data
  })
}

/**
 * 派遣应急队伍
 * @param {*} data
 */
export function dispatchTeam(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/dispatch-team',
    method: 'post',
    data
  })
}

/**
 * 分页查询专家资料信息
 * @param {*} params
 */
export function pageExpertList(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/page-expert-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询应急物资列表
 * @param {*} params
 */
export function pageMaterial(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/page-material',
    method: 'get',
    params
  })
}

/**
 * 分页查询已派遣专家列表
 * @param {*} params
 */
export function pageResponseExpert(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/page-response-expert',
    method: 'get',
    params
  })
}

/**
 * 分页查询已派遣应急物资列表
 * @param {*} params
 */
export function pageResponseMaterial(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/page-response-material',
    method: 'get',
    params
  })
}

/**
 * 分页查询已派遣应急队伍列表
 * @param {*} params
 */
export function pageResponseTeam(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/page-response-team',
    method: 'get',
    params
  })
}

/**
 * 分页查询应急队伍列表
 * @param {*} params
 */
export function pageTeamList(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/page-team-list',
    method: 'get',
    params
  })
}

/**
 * 查询应急处置-响应人员列表
 * @param {*} params
 */
export function personsFromDisposal(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/persons-from-disposal',
    method: 'get',
    params
  })
}

/**
 * 查询应急预案人员列表
 * @param {*} params
 */
export function personsFromResponse(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/persons-from-response',
    method: 'get',
    params
  })
}

/**
 * 专家详情
 * @param {*} params
 */
export function queryExpert(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/query-expert',
    method: 'get',
    params
  })
}

/**
 * 保存响应人员
 * @param {*} data
 */
export function reloadPersons(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/reload-persons',
    method: 'post',
    data
  })
}

/**
 * 选择事故类型/等级 带出应急预案
 * @param {*} params
 */
export function typeSelection(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/type-selection',
    method: 'get',
    params
  })
}

/**
 * 撤销专家
 * @param {*} params
 */
export function withdrawExpert(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/withdraw-expert',
    method: 'put',
    params
  })
}

/**
 * 撤销应急物资
 * @param {*} data
 */
export function withdrawMaterial(data) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/withdraw-material',
    method: 'put',
    data
  })
}

/**
 * 撤销应急队伍
 * @param {*} params
 */
export function withdrawTeam(params) {
  return request({
    url: '/wyx-emergency-services/v1/disposal-response/withdraw-team',
    method: 'put',
    params
  })
}
