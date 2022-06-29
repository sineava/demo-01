import request from '@/utils/request'

/**
 * 删除管理人员信息
 * @param {*} params
 */
export function deleteById(params) {
  return request({
    url: `/general-services/v1/managementPerson/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 管理人员分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/managementPerson/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询管理人员详细信息
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: '/general-services/v1/managementPerson/query',
    method: 'get',
    params
  })
}

/**
 * 新增管理人员信息
 * @param {*} data
 */
export function saveManagementPerson(data) {
  return request({
    url: '/general-services/v1/managementPerson/saveInfo',
    method: 'post',
    data
  })
}

/**
 * 通过管理部门编号查询部门下人员列表
 * @param {*} params
 */
export function managementPersonQuery(params) {
  return request({
    url: '/general-services/v1/managementPerson/selectPersons',
    method: 'get',
    params
  })
}

/**
 * 修改管理人员信息
 * @param {*} data
 */
export function updatePerson(data) {
  return request({
    url: '/general-services/v1/managementPerson/update',
    method: 'post',
    data
  })
}

/**
 * 批量导入监管人员信息
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/general-services/v1/managementPerson/bulk-import',
    method: 'post',
    data
  })
}

/**
 * 管理人员列表查询
 * @param {*} params
 */
export function exportList(params) {
  return request({
    url: '/general-services/v1/managementPerson/export-list',
    method: 'get',
    params
  })
}

/**
 * 管理人员数据统计-分页查询-专题统计
 * @param {*} params
 */
export function getStatisticalPageList(params) {
  return request({
    url: '/general-services/v1/managementPerson/page-statistical-list',
    method: 'get',
    params
  })
}

/**
 * 管理人员-更新
 * @param {*} params
 */
export function updateBatch(data) {
  return request({
    url: '/general-services/v1/managementPerson/batch-update',
    method: 'post',
    data
  })
}
