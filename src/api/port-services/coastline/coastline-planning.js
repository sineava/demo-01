import request from '@/utils/request'

/**
 * 添加岸线规划信息
 * @param {*} data
 */
export function addLine(data) {
  return request({
    url: '/port-services/v1/coastline-planning/add',
    method: 'post',
    data
  })
}

/**
 * 删除岸线规划信息
 * @param {*} params
 */
export function deleteLine(params) {
  return request({
    url: `/port-services/v1/coastline-planning/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 查询岸线规划名称是否存在
 * @param {*} params
 */
export function queryExists(params) {
  return request({
    url: '/port-services/v1/coastline-planning/exist-name',
    method: 'get',
    params
  })
}

/**
 * 获取岸线规划详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/coastline-planning/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 分页查询岸线规划列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/coastline-planning/page-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询岸线规划列表-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/coastline-planning/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 查询所在区域列表
 * @param {*} params
 */
export function getPortArea(params) {
  return request({
    url: '/port-services/v1/coastline-planning/port-area-list',
    method: 'get',
    params
  })
}

/**
 * 修改岸线规划信息
 * @param {*} data
 */
export function updateCoastLine(data) {
  return request({
    url: '/port-services/v1/coastline-planning/update',
    method: 'post',
    data
  })
}

/**
 * 导出岸线规划列表
 * @param {*} params
 */
export function exportCoastlinePlanning(params) {
  return request({
    url: '/port-services/v1/coastline-planning/export-coastline-planning',
    method: 'get',
    params
  })
}

/**
 * 批量导入岸线规划文件信息
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/port-services/v1/coastline-planning/bulk-import',
    method: 'post',
    data
  })
}
