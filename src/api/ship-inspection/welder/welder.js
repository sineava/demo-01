import request from '@/utils/request'

/**
 * 焊工证书分页查询
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: `/ship-inspection/v1/welder/page-list`,
    method: 'get',
    params
  })
}

/**
 * 批量导入航工证书
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/ship-inspection/v1/welder/bulk-import',
    method: 'post',
    data
  })
}

/**
 * 批量导出航工证书
 * @param {*} params
 */
export function exportList(params) {
  return request({
    url: '/ship-inspection/v1/welder/export-list',
    method: 'get',
    params
  })
}

/**
 * 焊工证书信息详情
 * @param {*} params
 */
export function getInfo(params) {
  return request({
    url: `/ship-inspection/v1/welder/find-info`,
    method: 'get',
    params
  })
}

/**
 * 删除焊工信息
 * @param {*} id
 */
export function deleteData(id) {
  return request({
    url: `/ship-inspection/v1/welder/delete/${id}`,
    method: 'DELETE',
  })
}

/**
 * 新增焊工证书信息
 * @param {*} data
 */
export function addData(data) {
  return request({
    url: `/ship-inspection/v1/welder/save-info`,
    method: 'POST',
    data
  })
}

/**
 * 修改焊工证书信息
 * @param {*} data
 */
export function updateData(data) {
  return request({
    url: `/ship-inspection/v1/welder/update-info`,
    method: 'PUT',
    data
  })
}

/**
 * 查询企业名称
 * @param {*} data
 */
export function queryEnterprise(params) {
  return request({
    url: `/ship-inspection/v1/welder/enterprise-list`,
    method: 'get',
    params
  })
}

/**
 * 逾期数量查询
 * @param {*} data
 */
 export function queryOverdue() {
  return request({
    url: `/ship-inspection/v1/welder/overdue`,
    method: 'get'
  })
}