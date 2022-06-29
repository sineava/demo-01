import request from '@/utils/request'

/**
 * 分页查询教育培训计划
 * @param {*} params
 */
export function getTrainingPlanningPageList(params) {
  return request({
    url: '/general-services/v1/trainingPlanning/pageList',
    method: 'get',
    params
  })
}

/**
 * 查询教育培训计划详情
 * @param {*} params
 */
export function getTrainingPlanningById(params) {
  return request({
    url: '/general-services/v1/trainingPlanning/query',
    method: 'get',
    params
  })
}

/**
 * 模糊查询教育培训计划列表
 * @param {*} params
 */
export function getLikeList(params) {
  return request({
    url: '/general-services/v1/trainingPlanning/likePlanName',
    method: 'get',
    params
  })
}

/**
 * 保存教育培训计划
 * @param {*} data
 */
export function saveTrainingPlanning(data) {
  return request({
    url: '/general-services/v1/trainingPlanning/save',
    method: 'post',
    data
  })
}

/**
 * 删除教育培训计划
 * @param {*} params
 */
export function deleteTrainingPlanning(params) {
  return request({
    url: `/general-services/v1/trainingPlanning/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 模糊查询教育培训计划列表
 * @param {*} params
 */
export function getTrainingPlanningLikePlanName(params) {
  return request({
    url: '/general-services/v1/trainingPlanning/likePlanName',
    method: 'get',
    params
  })
}

/**
 * 修改教育培训计划
 * @param {*} data
 */
export function updateTraining(data) {
  return request({
    url: '/general-services/v1/trainingPlanning/update',
    method: 'put',
    data
  })
}
