import request from '@/utils/request'

/**
 * 删除危险化学品信息
 * @param {*} id
 */
export function deleteHazardousChemical(id) {
  return request({
    url: `/general-services/v1/hazardousChemical/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 分页查询危险化学品
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/hazardousChemical/pageList',
    method: 'get',
    params
  })
}

/**
 * 新增危险化学品信息
 * @param {*} data
 */
export function saveHazardousChemical(data) {
  return request({
    url: '/general-services/v1/hazardousChemical/save',
    method: 'post',
    data
  })
}

/**
 * 修改危险化学品信息
 * @param {*} data
 */
export function updateHazardousChemical(data) {
  return request({
    url: '/general-services/v1/hazardousChemical/update',
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
    url: '/general-services/v1/hazardousChemical/export-list',
    method: 'get',
    params
  })
}

/**
 * 批量导入危险化学品列表
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/general-services/v1/hazardousChemical/bulk-import',
    method: 'post',
    data
  })
}
