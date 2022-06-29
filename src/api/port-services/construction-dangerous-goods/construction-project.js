import request from '@/utils/request'

/**
 * 删除信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/port-services/v1/construction-project/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/port-services/v1/construction-project/pageList',
    method: 'get',
    params
  })
}

/**
 * 分页查询-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/port-services/v1/construction-project/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 查询详情
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: '/port-services/v1/construction-project/query',
    method: 'get',
    params
  })
}

/**
 * 添加建设项目信息
 * @param {*} data
 */
export function saveProject(data) {
  return request({
    url: '/port-services/v1/construction-project/save',
    method: 'post',
    data
  })
}

/**
 * 修改建设项目信息
 * @param {*} data
 */
export function updateProject(data) {
  return request({
    url: '/port-services/v1/construction-project/update',
    method: 'put',
    data
  })
}

/**
 * 批量导入建设项目信息
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/port-services/v1/construction-project/bulk-import',
    method: 'post',
    data
  })
}

/**
 * 批量导出
 * @param {*} params
 */
export function exportList(params) {
  return request({
    url: '/port-services/v1/construction-project/export-list',
    method: 'get',
    params
  })
}

/**
 * 专项统计-分页查询
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/port-services/v1/construction-project/statistical-page',
    method: 'get',
    params
  })
}
