import request from '@/utils/request'

/**
 * 行业端 水路船舶管理企业投资人信息列表
 * @param {*} params
 */
export function pageShipHyList(params) {
  return request({
    url: '/water-transportation-services/v1/investors/page-ship-hy-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 船舶管理企业投资人信息列表
 * @param {*} params
 */
export function pageShipEnList(params) {
  return request({
    url: '/water-transportation-services/v1/investors/page-ship-en-list',
    method: 'get',
    params
  })
}

/**
 * 行业端 水路运输企业投资人信息列表
 * @param {*} params
 */
export function pageWaterTransportHyList(params) {
  return request({
    url: '/water-transportation-services/v1/investors/page-water-transport-hy-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 水路运输企业投资人信息列表
 * @param {*} params
 */
export function pageWaterTransportEnList(params) {
  return request({
    url: '/water-transportation-services/v1/investors/page-water-transport-en-list',
    method: 'get',
    params
  })
}

/**
 * 投资人信息详情-所有通用
 * @param {*} id
 */
export function getInfo(id) {
  return request({
    url: `/water-transportation-services/v1/investors/get/${id}`,
    method: 'get'
  })
}

/**
 * 新增投资人信息
 * @param {*} params
 */
export function saveInvestors(data) {
  return request({
    url: '/water-transportation-services/v1/investors/save-info',
    method: 'post',
    data
  })
}
/**
 * 修改投资人信息
 * @param {*} params
 */
export function updateInvestors(data) {
  return request({
    url: '/water-transportation-services/v1/investors/update-info',
    method: 'PUT',
    data
  })
}

/**
 * 删除投资人信息
 * @param {*} id
 */
export function deleteInvestors(id) {
  return request({
    url: `/water-transportation-services/v1/investors/delete-info/${id}`,
    method: 'delete'
  })
}

/**
 * 企业端 水路运输基础信息备案 水路运输企业备案投资人列表
 * @param {*} params
 */
export function wtInvestorsList(params) {
  return request({
    url: '/water-transportation-services/v1/investors/wt-investors-list',
    method: 'get',
    params
  })
}

/**
 * 企业端 船舶管理企业基础信息备案 船舶管理企业备案投资人列表
 * @param {*} params
 */
export function shipInvestorsList(params) {
  return request({
    url: '/water-transportation-services/v1/investors/ship-investors-list',
    method: 'get',
    params
  })
}
