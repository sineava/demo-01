import request from '@/utils/request'

/**
 * 删除记录
 * @param {*} params
 */
export function deleteExercise(params) {
  return request({
    url: `/wyx-emergency-services/v1/hydrological/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 判断该日期是否存在记录
 * @param {*} params
 */
export function isExist(params) {
  return request({
    url: `/wyx-emergency-services/v1/hydrological/is-exist-info`,
    method: 'get',
    params
  })
}

/**
 * 分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/page-list',
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
    url: '/wyx-emergency-services/v1/hydrological/query-info',
    method: 'get',
    params
  })
}

/**
 * 获取指定日期的水文信息
 * @param {*} params
 */
export function queryInfoByTime(params) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/query-info-by-time',
    method: 'get',
    params
  })
}

/**
 * 新增记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/save-info',
    method: 'post',
    data
  })
}

/**
 * 首页水文信息列表
 * @param {*} params
 */
export function selectLastList(params) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/select-last-list',
    method: 'get',
    params
  })
}

/**
 * 获取主要航电基础信息
 * @param {*} params
 */
export function selectNavigationList(params) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/select-navigation-list',
    method: 'get',
    params
  })
}

/**
 * 获取水文基础信息
 * @param {*} params
 */
export function selectWatersList(params) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/select-waters-list',
    method: 'get',
    params
  })
}

/**
 * 修改记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/update-info',
    method: 'put',
    data
  })
}

/**
 * 修改水文站基础信息
 * @param {*} data
 */
export function updateSite(data) {
  return request({
    url: '/wyx-emergency-services/v1/hydrological/update-basic-info',
    method: 'put',
    data
  })
}

