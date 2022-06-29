import request from '@/utils/request'

/**
 * 查询企业组织机构 树结构信息
 * @param {*} params
 */
export function findByEnOrganizationList(params) {
  return request({
    url: '/general-services/v1/enterpriseOrganization/findByEnOrganizationList',
    method: 'get',
    params
  })
}

/**
 * 企业端 分页查询企业组织机构列表信息
 * @param {*} params
 */
export function pageEnList(params) {
  return request({
    url: '/general-services/v1/enterpriseOrganization/pageEnList',
    method: 'get',
    params
  })
}

/**
 * (企业端)添加企业组织机构信息
 * @param {*} data
 */
export function addEnterpriseOrganization(data) {
  return request({
    url: '/general-services/v1/enterpriseOrganization/add',
    method: 'POST',
    data
  })
}

/**
 * (企业端)修改企业组织机构信息
 * @param {*} data
 */
export function updateEnterpriseOrganization(data) {
  return request({
    url: '/general-services/v1/enterpriseOrganization/update',
    method: 'PUT',
    data
  })
}

/**
 * (企业端)删除组织机构信息
 * @param {*} id
 */
export function deleteEnterpriseOrganization(id) {
  return request({
    url: `/general-services/v1/enterpriseOrganization/delete/${id}`,
    method: 'DELETE'
  })
}
