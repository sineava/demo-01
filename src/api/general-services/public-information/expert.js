import request from '@/utils/request'

/**
 * 批量导入专家列表
 * @param {*} data
 */
export function bulkImport(data) {
  return request({
    url: '/general-services/v1/expert/bulk-import',
    method: 'post',
    data
  })
}

/**
 * 删除专家信息
 * @param {*} id
 */
export function deleteExpert(id) {
  return request({
    url: `/general-services/v1/expert/delete/${id}`,
    method: 'delete'
  })
}

/**
 * 分页查询专家资料信息
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/expert/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询专家详情信息
 * @returns {*} params
 */
export function getExpertById(params) {
  return request({
    url: '/general-services/v1/expert/query',
    method: 'get',
    params
  })
}

/**
 * 新增专家信息
 * @param {*} params
 */
export function saveExpert(data) {
  return request({
    url: '/general-services/v1/expert/save',
    method: 'post',
    data
  })
}

/**
 * 修改专家信息
 * @param {*} params
 */
export function updateExpert(data) {
  return request({
    url: '/general-services/v1/expert/update',
    method: 'post',
    data
  })
}
