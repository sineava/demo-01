import request from '@/utils/request'

/**
 * 行业端 分页查询水路运输企业专职管理人员列表
 * @param {*} params
 */
export function pageWaterTransportHyList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/page-water-transport-hy-list',
    method: 'get',
    params
  })
}

/**
 * 新增专职人员信息
 * @param {*} params
 */
export function savePersonnel(data) {
  return request({
    url: '/water-transportation-services/v1/manage-person/save-info',
    method: 'post',
    data
  })
}
/**
 * 修改专职人员信息
 * @param {*} params
 */
export function updatePersonnel(data) {
  return request({
    url: '/water-transportation-services/v1/manage-person/update-info',
    method: 'PUT',
    data
  })
}

/**
 * 删除专职人员信息
 * @param {*} id
 */
export function deletePersonnel(id) {
  return request({
    url: `/water-transportation-services/v1/manage-person/delete-info/${id}`,
    method: 'delete'
  })
}

/**
 * 企业端 分页查询水路运输企业专职管理人员列表
 * @param {*} params
 */
export function pageWaterTransportEnList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/page-water-transport-en-list',
    method: 'get',
    params
  })
}

/**
 * 行业端 分页查询船舶管理企业专职管理人员列表
 * @param {*} params
 */
export function pageShipHyList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/page-ship-hy-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询船舶管理企业专职管理人员列表
 * @param {*} params
 */
export function pageShipEnList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/page-ship-en-list',
    method: 'get',
    params
  })
}

/**
 * 专职管理人员详情-所有通用
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/manage-person/get/${id}`,
    method: 'get'
  })
}

/**
 * 专职管理人员备案 下拉
 * @param {*} params
 */
export function managePersonList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/manage-person-list',
    method: 'get',
    params
  })
}

/**
 * 专题统计 船员统计信息
 * @param {*} params
 */
export function getTopicStat(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/crew-statistics',
    method: 'get',
    params
  })
}

/**
 * 专题统计 导出船员统计信息
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/export-crew-list',
    method: 'get',
    params
  })
}

/**
 * 专题统计 分页查询船员列表
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/water-transportation-services/v1/manage-person/page-statistics-list',
    method: 'get',
    params
  })
}
