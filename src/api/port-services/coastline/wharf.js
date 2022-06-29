import request from '@/utils/request'

/**
 * 添加码头信息
 * @param {*} data
 */
export function addWharf(data) {
  return request({
    url: '/port-services/v1/wharf/add',
    method: 'post',
    data
  })
}

/**
 * 删除码头信息
 * @param {*} params
 */
export function deleteWharf(params) {
  return request({
    url: `/port-services/v1/wharf/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 码头详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/wharf/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 分页查询码头列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/wharf/page-list',
    method: 'get',
    params
  })
}

/**
 * 查询所有码头列表
 * @param {*} params
 */
export function getAllList(params) {
  return request({
    url: '/port-services/v1/port-area/wharf-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询码头列表-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/wharf/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 修改码头信息
 * @param {*} data
 */
export function updateWhatarf(data) {
  return request({
    url: '/port-services/v1/wharf/update',
    method: 'post',
    data
  })
}

/**
 * 查询码头所在区域列表
 * @param {*} params
 */
export function getArea(params) {
  return request({
    url: '/port-services/v1/wharf/wharf-area-list',
    method: 'get',
    params
  })
}

/**
 * 导出码头信息列表
 * @param {*} params
 */
export function exportWharfInfo(params) {
  return request({
    url: '/port-services/v1/wharf/export-wharf-info',
    method: 'get',
    params
  })
}

/**
 * 批量导入码头信息
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/port-services/v1/wharf/bulk-import',
    method: 'post',
    data
  })
}

