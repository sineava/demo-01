import request from '@/utils/request'

/**
 * 添加泊位信息
 * @param {*} data
 */
export function addBerth(data) {
  return request({
    url: '/port-services/v1/berth/add',
    method: 'post',
    data
  })
}

/**
 * 获取企业关联泊位的码头信息
 * @param {*} params
 */
export function getWharf(params) {
  return request({
    url: `/port-services/v1/wharf/en-wharf-list`,
    method: 'get',
    params
  })
}

/**
 * 删除泊位信息
 * @param {*} id
 */
export function deleteBerth(id) {
  return request({
    url: `/port-services/v1/berth/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 泊位详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/berth/get/${params.id}`,
    method: 'get',
    params
  })
}
/**
 * 查询-港区/作业区/码头/泊位
 * @param {*} params
 */
export function getBerthTypes(params) {
  return request({
    url: `/port-services/v1/berth/berth-types`,
    method: 'get',
    params
  })
}

/**
 * 分页泊位列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/berth/page-list',
    method: 'get',
    params
  })
}

/**
 * 分页泊位列表-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/berth/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 修改泊位信息
 * @param {*} data
 */
export function updateBerth(data) {
  return request({
    url: `/port-services/v1/berth/update`,
    method: 'put',
    data
  })
}

/**
 * 批量导出泊位信息列表
 * @param {*} params
 */
export function exportBerthInfo(params) {
  return request({
    url: `/port-services/v1/berth/export-berth-info`,
    method: 'get',
    params
  })
}

/**
 * 批量导入泊位信息
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: `/port-services/v1/berth/bulk-import`,
    method: 'post',
    data
  })
}
