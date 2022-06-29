import request from '@/utils/request'

/**
 * (企业端)分页查询人员列表
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/enterprisePerson/pageEnList',
    method: 'get',
    params
  })
}

/**
 * (企业端)删除人员
 * @param {*} id
 */
export function deletePerson(id) {
  return request({
    url: `/general-services/v1/enterprisePerson/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 查询人员详细信息（所有通用）
 * @param {*} id
 */
export function getPersonInfo(id) {
  return request({
    url: `/general-services/v1/enterprisePerson/getPersonInfo/${id}`,
    method: 'get'
  })
}

/**
 * (企业端)添加人员信息
 * @param {*} data
 */
export function addEnterprisePerson(data) {
  return request({
    url: '/general-services/v1/enterprisePerson/add',
    method: 'post',
    data
  })
}

/**
 * (企业端)修改人员信息
 * @param {*} data
 */
export function updateEnterprisePerson(data) {
  return request({
    url: '/general-services/v1/enterprisePerson/update',
    method: 'PUT',
    data
  })
}

/**
 * (行业端)港口企业信息 企业详情 分页查询人员列表
 * @param {*} params
 */
export function pageHyList(params) {
  return request({
    url: '/general-services/v1/enterprisePerson/pageHyList',
    method: 'get',
    params
  })
}

/**
 * (行业端)港口企业信息 导出人员信息（通用）
 * @param {*} params
 */
export function exportHyPerson(params) {
  return request({
    url: '/general-services/v1/enterprisePerson/export-hy-person',
    method: 'get',
    params
  })
}

/**
 * 企业端 导出人员信息（通用）
 * @param {*} params
 */
export function exportEnPerson(params) {
  return request({
    url: '/general-services/v1/enterprisePerson/export-person',
    method: 'get',
    params
  })
}

/**
 * 企业端 批量导入管理人员
 * @param {*} data
 */
export function importGlPerson(data) {
  return request({
    url: '/general-services/v1/enterprisePerson/bulk-import-gl-person',
    method: 'post',
    data
  })
}


/**
 * 综合查询-港口从业人员
 * @param {*} params
 */
 export function integratedQueryPage(params) {
  return request({
    url: '/general-services/v1/enterprisePerson/integrated-query-page',
    method: 'get',
    params
  })
}