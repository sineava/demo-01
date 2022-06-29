import request from '@/utils/request'

/**
 * 分页查询安全监督检查结果公开信息列表
 * @param {*} params
 */
export function pageList(params) {
  return request({
    url: '/general-services/v1/safety-public/pageList',
    method: 'get',
    params
  })
}

/**
 * 删除安全监督检查结果公开信息
 * @param {*} id
 */
export function deletePublic(id) {
  return request({
    url: `/general-services/v1/safety-public/delete/${id}`,
    method: 'DELETE'
  })
}

/**
 * 安全监督检查结果公开信息详情
 * @param {*} id
 */
export function findByPublicInfo(id) {
  return request({
    url: `/general-services/v1/safety-public/findByPublicInfo/${id}`,
    method: 'get'
  })
}

/**
 * 添加安全监督检查结果公开信息
 * @param {*} data
 */
export function addPublic(data) {
  return request({
    url: '/general-services/v1/safety-public/add',
    method: 'POST',
    data
  })
}

/**
 * 修改安全监督检查结果公开信息
 * @param {*} data
 */
export function updatePublic(data) {
  return request({
    url: '/general-services/v1/safety-public/update',
    method: 'PUT',
    data
  })
}

/**
 * 管理机构树状查询
 * @param {*} params
 */
export function selectManagementDepartment(params) {
  return request({
    url: '/general-services/v1/managementDepartment/selectList',
    method: 'get',
    params
  })
}
