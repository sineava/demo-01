import request from '@/utils/request'

/**
 * 管理人员数据统计
 * @param {*} params
 */
export function getInBasic(params) {
  return request({
    url: '/general-services/v1/manager-statistics/integrated-query-basic',
    method: 'get',
    params
  })
}

/**
 * 管理部门机构数据
 * @param {*} params
 */
export function getInDept(params) {
  return request({
    url: '/general-services/v1/manager-statistics/integrated-query-department',
    method: 'get',
    params
  })
}

/**
 * 管理制度
 * @param {*} params
 */
export function getInRegime(params) {
  return request({
    url: '/general-services/v1/manager-statistics/integrated-query-regime',
    method: 'get',
    params
  })
}

/**
 * 管理教育培训
 * @param {*} params
 */
export function getInTrain(params) {
  return request({
    url: '/general-services/v1/manager-statistics/integrated-query-planning',
    method: 'get',
    params
  })
}

/**
 * 管理部门监管装备
 * @param {*} params
 */
export function getInEquip(params) {
  return request({
    url: '/general-services/v1/manager-statistics/integrated-query-equipment',
    method: 'get',
    params
  })
}
