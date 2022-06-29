import request from '@/utils/request'

/**
 * 航段信息数据-专题统计-分页查询
 * @param {*} params
 */
export function getFlightTopicList(params) {
  return request({
    url: '/data-management/v1/channel-building/leg-project-statistics-page',
    method: 'get',
    params
  })
}

/**
 * 航段信息数据-专题统计-导出
 * @param {*} params
 */
export function exportFlightTopicList(params) {
  return request({
    url: '/data-management/v1/channel-building/leg-project-statistics-list',
    method: 'get',
    params
  })
}

/**
 * 航段信息数据-专题统计
 * @param {*} params
 */
export function getFlightTopicStat(params) {
  return request({
    url: `/data-management/v1/channel-building/leg-project-statistics`,
    method: 'get',
    params
  })
}

/**
 * 过江建筑物数据-专题统计-分页查询
 * @param {*} params
 */
export function getBuildingTopicList(params) {
  return request({
    url: '/data-management/v1/channel-building/building-project-statistics-page',
    method: 'get',
    params
  })
}

/**
 * 过江建筑物数据-专题统计-导出
 * @param {*} params
 */
export function exportBuildingTopicList(params) {
  return request({
    url: '/data-management/v1/channel-building/building-project-statistics-list',
    method: 'get',
    params
  })
}

/**
 * 过江建筑物数据-专题统计
 * @param {*} params
 */
export function getBuildingTopicStat(params) {
  return request({
    url: `/data-management/v1/channel-building/building-project-statistics`,
    method: 'get',
    params
  })
}
