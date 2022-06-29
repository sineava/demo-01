import request from '@/utils/request'

/**
 * 添加危险货物设备信息
 * @param {*} data
 */
export function addEquipment(data) {
  return request({
    url: '/port-services/v1/stock-equipment/add',
    method: 'post',
    data
  })
}

/**
 * 删除危险货物设备信息
 * @param {*} params
 */
export function deleteEquipment(params) {
  return request({
    url: `/port-services/v1/stock-equipment/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 危险货物存量设备信息详情（通用）
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/stock-equipment/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 查询企业危险货物设备是否存在 添加用
 * @param {*} params
 */
export function getExists(params) {
  return request({
    url: '/port-services/v1/stock-equipment/name-exits',
    method: 'get',
    params
  })
}

/**
 * 企业端 危险货物存量设备信息列表
 * @param {*} params
 */
export function getEnList(params) {
  return request({
    url: '/port-services/v1/stock-equipment/page-en-list',
    method: 'get',
    params
  })
}

/**
 * 行业端 危险货物存量设备信息列表
 * @param {*} params
 */
export function getHyList(params) {
  return request({
    url: '/port-services/v1/stock-equipment/page-hy-list',
    method: 'get',
    params
  })
}

/**
 * 行业端 修改危险货物设备信息
 * @param {*} data
 */
export function updateEquipment(data) {
  return request({
    url: '/port-services/v1/stock-equipment/update',
    method: 'post',
    data
  })
}

/**
 * 综合查询-危险货物存量设备信息列表
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/stock-equipment/integrated-query-page',
    method: 'get',
    params
  })
}
