import request from '@/utils/request'

/**
 * 分页查询法律法规文件
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/lawRegulation/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询法律法规详情信息
 * @param {*} params
 */
export function getLawDetail(params) {
  return request({
    url: '/general-services/v1/lawRegulation/query',
    method: 'get',
    params
  })
}

/**
 * 删除法律法规信息
 * @param {*} id
 */
export function deleteLawRegulation(id) {
  return request({
    url: `/general-services/v1/lawRegulation/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 新增修改法律法规信息
 * @param {*} data
 */
export function addLawRegulation(data) {
  return request({
    url: '/general-services/v1/lawRegulation/save',
    method: 'post',
    data
  })
}
/**
 * 修改法律法规信息
 * @param {*} data
 */
export function updateLawRegulation(data) {
  return request({
    url: '/general-services/v1/lawRegulation/update',
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
    url: '/general-services/v1/lawRegulation/export-list',
    method: 'get',
    params
  })
}

/**
 * 批量导入法律法规列表
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/general-services/v1/lawRegulation/bulk-import',
    method: 'post',
    data
  })
}

/**
 * 查询法律法规类型
 * @param {*} params
 */
export function getLayType(params) {
  return request({
    url: '/general-services/v1/law-regulation-type/select-list',
    method: 'get',
    params
  })
}

/**
 * 删除法律法规类型
 * @param {*} id
 */
export function deleteLawType(id) {
  return request({
    url: `/general-services/v1/law-regulation-type/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 新增法律法规类型
 * @param {*} data
 */
export function addLawType(data) {
  return request({
    url: '/general-services/v1/law-regulation-type/save-IN',
    method: 'post',
    data
  })
}
/**
 * 修改法律法规类型
 * @param {*} data
 */
export function updateLawType(data) {
  return request({
    url: '/general-services/v1/law-regulation-type/update',
    method: 'post',
    data
  })
}
