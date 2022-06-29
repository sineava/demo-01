import request from '@/utils/request'

/**
 * 获取城市列表信息
 */
export function getAreaList() {
  return request({
    url: '/wyx-emergency-services/v1/weather/area-list',
    method: 'get'
  })
}

/**
 * 专题统计-导出天气气象信息列表
 * @param {*} params
 */
export function exportWeatherAreaList(params) {
  return request({
    url: '/wyx-emergency-services/v1/weather/export-weather-list',
    method: 'get',
    params
  })
}

/**
 * 分页气象信息列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/weather/page-list',
    method: 'get',
    params
  })
}

/**
 * 气象信息详情
 */
export function getInfo(id) {
  return request({
    url: `/wyx-emergency-services/v1/weather/query-info/${id}`,
    method: 'get'
  })
}

/**
 * 专题统计-分页查询天气信息统计列表
 * @param {*} params
 */
export function getStatPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/weather/statistics-page-list',
    method: 'get',
    params
  })
}

/**
 * 专题统计-统计天气气象信息
 * @param {*} params
 */
export function getStatWeather(params) {
  return request({
    url: '/wyx-emergency-services/v1/weather/statistics-weather',
    method: 'get',
    params
  })
}

/**
 * 天气7天预报信息
 * @param {*} params
 */
export function getWeather(params) {
  return request({
    url: `/wyx-emergency-services/v1/weather/weather-7d-prediction`,
    method: 'get',
    params
  })
}
