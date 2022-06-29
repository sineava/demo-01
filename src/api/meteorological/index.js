import request from '@/utils/request'

/**
 * 天气信息列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/wyx-emergency-services/v1/weather/page-list`,
    method: 'get',
    params
  })
}

/**
 * 城市列表
 * @param {*} params
 */
export function getCityList(params) {
  return request({
    url: `/wyx-emergency-services/v1/weather/area-list`,
    method: 'get',
    params
  })
}

/**
 * 天气信息详情
 * @param {*} singlePawnId
 */
export function getInfo(params) {
  return request({
    url: `/wyx-emergency-services/v1/weather/query-info/${params}`,
    method: 'get'
  })
}

/**
 * 预警信息列表
 * @param {*} params
 */
export function getEarlytList(params) {
  return request({
    url: `/wyx-emergency-services/v1/early-warning/page-info`,
    method: 'get',
    params
  })
}

/**
 * 预警信息添加
 * @param {*} params
 */
export function saveEarlytList(data) {
  return request({
    url: `/wyx-emergency-services/v1/early-warning/save-info`,
    method: 'POST',
    data
  })
}

/**
 * 预警信息修改
 * @param {*} params
 */
export function putEarlytList(data) {
  return request({
    url: `/wyx-emergency-services/v1/early-warning/update-info`,
    method: 'PUT',
    data
  })
}

/**
 * 预警信息删除
 * @param {*} params
 */
export function deleteEarlytList(id) {
  return request({
    url: `/wyx-emergency-services/v1/early-warning/delete/${id}`,
    method: 'DELETE',
    params:{id}
  })
}
