import request from '@/utils/request'

/**
 * 管理部门新地址
 * @param {*} params
 */
export function getManagementDepartmentSelectList(params) {
  return request({
    url: '/general-services/v1/managementDepartment/synthesis-list',
    method: 'get',
    params
  })
}

/**
 * 管理人员新地址
 * @param {*} params
 */
export function getManagementPersonList(params) {
  return request({
    url: '/general-services/v1/managementPerson/synthesis-page',
    method: 'get',
    params
  })
}

/**
 * 管理制度新地址
 * @param {*} params
 */
export function getRegimeList(params) {
  return request({
    url: '/general-services/v1/managementRegime/synthesis-page',
    method: 'get',
    params
  })
}

/**
 * 教育培训新地址
 * @param {*} params
 */
export function getTrainList(params) {
  return request({
    url: '/general-services/v1/management-training/synthesis-page',
    method: 'get',
    params
  })
}

/**
 * 监管装备新地址
 * @param {*} params
 */
export function getEquipList(params) {
  return request({
    url: '/general-services/v1/equipment/synthesis-page',
    method: 'get',
    params
  })
}

/**
 * 查询检查单位
 * @param {*} params
 */
export function getSelectDepartments(params) {
  return request({
    url: '/general-services/v1/managementDepartment/selectDepartments',
    method: 'get',
    params
  })
}
