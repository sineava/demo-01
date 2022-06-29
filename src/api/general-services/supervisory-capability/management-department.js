import request from '@/utils/request'

/**
 * 根据管理部门机构编号删除
 * @param {*} params
 */
export function deleteManagementDepartmentById(params) {
  return request({
    url: `/general-services/v1/managementDepartment/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 查询管理机构具体信息
 * @param {*} params
 */
export function getManagementDepartmentById(params) {
  return request({
    url: '/general-services/v1/managementDepartment/query',
    method: 'get',
    params
  })
}

/**
 * 新增管理部门机构信息
 * @param {*} data
 */
export function addManagementDepartment(data) {
  return request({
    url: '/general-services/v1/managementDepartment/saveInfo',
    method: 'post',
    data
  })
}

/**
 * 通过管理部门名称模糊查询部门
 * @param {*} params
 */
export function selectDeptsLike(params) {
  return request({
    url: '/general-services/v1/managementDepartment/selectDepartments',
    method: 'get',
    params
  })
}

/**
 * 通过管理部门名称模糊查管理部门编号
 * @param {*} params
 */
export function getManagementDepartmentLikeName(params) {
  return request({
    url: '/general-services/v1/managementDepartment/selectDepartments',
    method: 'get',
    params
  })
}

/**
 * 修改管理部门机构信息
 * @param {*} data
 */
export function updateDept(data) {
  return request({
    url: '/general-services/v1/managementDepartment/update',
    method: 'put',
    data
  })
}

/**
 * 修改管理部门状态
 * @param {*} params
 */
export function updateState(params) {
  return request({
    url: '/general-services/v1/managementDepartment/update-state',
    method: 'put',
    params
  })
}

/**
 * 管理机构树状查询
 * @param {*} params
 */
export function getManagementDepartmentSelectList(params) {
  return request({
    url: '/general-services/v1/managementDepartment/selectList',
    method: 'get',
    params
  })
}

/**
 * 查询管理机构集合
 * @param {*} params
 */
export function getOrganList(params) {
  return request({
    url: '/general-services/v1/managementDepartment/selectList',
    method: 'get',
    params
  })
}

/**
 * 导出数据查询
 * @param {*} params
 */
export function exportList(params) {
  return request({
    url: '/general-services/v1/managementDepartment/export-list',
    method: 'get',
    params
  })
}

/**
 * 管理部门-更新
 * @param {*} data
 */
export function updateBatch(data) {
  return request({
    url: '/general-services/v1/managementDepartment/batch-update',
    method: 'post',
    data
  })
}
