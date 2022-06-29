import request from '@/utils/request'

/**
 * 删除教育培训信息
 * @param {*} params
 */
export function deleteTraining(params) {
  return request({
    url: `/general-services/v1/management-training/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询监管部门教育培训列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/general-services/v1/management-training/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询教育培训详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/general-services/v1/management-training/query',
    method: 'get',
    params
  })
}

/**
 * 新增教育培训信息
 * @param {*} data
 */
export function saveTraining(data) {
  return request({
    url: '/general-services/v1/management-training/save',
    method: 'post',
    data
  })
}

/**
 * 修改教育培训信息
 * @param {*} data
 */
export function updateTraining(data) {
  return request({
    url: '/general-services/v1/management-training/update',
    method: 'post',
    data
  })
}

/**
 * 教育培训列表-分页-专题统计
 * @param {*} params
 */
export function getTopicList(params) {
  return request({
    url: '/general-services/v1/management-training/statistical-page',
    method: 'get',
    params
  })
}

/**
 * 教育培训列表-导出-专题统计
 * @param {*} params
 */
export function getTopicExport(params) {
  return request({
    url: '/general-services/v1/management-training/export-list',
    method: 'get',
    params
  })
}
