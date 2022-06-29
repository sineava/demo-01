import request from '@/utils/request'

/**
 * 机构所属企业名称查询
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/general-services/v1/external/query-enterprise',
    method: 'get',
    params
  })
}

/**
 * 机构所属企业名称查询
 * @param {*} params
 */
export function getOrgList(params) {
  return request({
    url: '/general-services/v1/external/query-organization-list',
    method: 'get',
    params
  })
}

/**
 * 机构所属所有企业名称查询
 * @param {*} params
 */
export function getAllOrgList(params) {
  return request({
    url: '/general-services/v1/external/org-list',
    method: 'get',
    params
  })
}

