import request from '@/utils/request'

/**
 * 删除应急演练计划
 * @param {*} params
 */
export function deleteExercise(params) {
  return request({
    url: `/wyx-emergency-services/v1/exercise-plan/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 应急演练计划分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/page-list',
    method: 'get',
    params
  })
}

/**
 * 应急演练计划分页查询-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 根据计划编号查询应急演练计划
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/query-info',
    method: 'get',
    params
  })
}

/**
 * 查询版本历史记录
 * @param {*} params
 */
export function queryVersionDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/version-info',
    method: 'get',
    params
  })
}

/**
 * 发布应急演练计划
 * @param {*} params
 */
export function releaseExercise(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/release',
    method: 'put',
    params
  })
}

/**
 * 新增应急演练计划
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改应急演练计划
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/update-info',
    method: 'put',
    data
  })
}

/**
 * 变更应急演练计划
 * @param {*} data
 */
export function changeEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-plan/version-change',
    method: 'put',
    data
  })
}

