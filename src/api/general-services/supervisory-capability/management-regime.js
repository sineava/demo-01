import request from '@/utils/request'

/**
 * 删除管理部门制度信息
 * @param {*} params
 */
export function deleteManagementRegime(params) {
  return request({
    url: `/general-services/v1/managementRegime/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 分页查询管理部门制度信息
 * @param {*} params
 */
export function managementRegimePageList(params) {
  return request({
    url: '/general-services/v1/managementRegime/pageList',
    method: 'get',
    params
  })
}

/**
 * 分页查询管理部门制度信息-专题统计
 * @param {*} params
 */
 export function managementRegimeStatisticalPage(params) {
  return request({
    url: '/general-services/v1/managementRegime/statistical-page',
    method: 'get',
    params
  })
}


/**
 * 查询管理部门制度详情
 * @param {*} params
 */
export function managementRegimeQuery(params) {
  return request({
    url: '/general-services/v1/managementRegime/query',
    method: 'get',
    params
  })
}

/**
 * 新增修改管理部门制度详情
 * @param {*} data
 */
export function managementRegimeSave(data) {
  return request({
    url: '/general-services/v1/managementRegime/save',
    method: 'post',
    data
  })
}

/**
 * 修改管理部门制度详情
 * @param {*} data
 */
export function updateRegime(data) {
  return request({
    url: '/general-services/v1/managementRegime/update',
    method: 'post',
    data
  })
}

/**
 * 批量导出-管理部门制度-专题统计
 * @param {*} params
 */
export function exportTopicList(params) {
  return request({
    url: '/general-services/v1/managementRegime/export-list',
    method: 'get',
    params
  })
}
