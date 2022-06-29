import request from '@/utils/request'

/**
 * 删除教育培训详情
 * @param {*} params
 */
export function trainingSituationDelete(params) {
  return request({
    url: `/general-services/v1/trainingSituation/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询教育培训详情
 * @param {*} params
 */
export function trainingSituatioPageList(params) {
  return request({
    url: '/general-services/v1/trainingSituation/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询教育培训详情
 * @param {*} params
 */
export function trainingSituationQuery(params) {
  return request({
    url: '/general-services/v1/trainingSituation/query',
    method: 'get',
    params
  })
}

/**
 * 保存教育培训详情
 * @param {*} data
 */
export function trainingSituationSave(data) {
  return request({
    url: '/general-services/v1/trainingSituation/save',
    method: 'put',
    data
  })
}

/**
 * 修改培训情况
 * @param {*} data
 */
export function updateSituation(data) {
  return request({
    url: '/general-services/v1/trainingSituation/update',
    method: 'put',
    data
  })
}
