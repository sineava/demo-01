import request from '@/utils/request'

/**
 * 删除应急演练计划详情
 * @param {*} params
 */
export function deleteExercise(params) {
  return request({
    url: `/wyx-emergency-services/v1/exercise-case/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 查询未演练的应急演练计划
 * @param {*} params
 */
export function findNoDrills(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/find-no-drills',
    method: 'get',
    params
  })
}

/**
 * 应急演练详情分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/page-list',
    method: 'get',
    params
  })
}

/**
 * 应急演练详情分页查询-综合查询
 * @param {*} params
 */
export function getInPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 根据计划编号查询应急演练详情
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增应急演练详情(已选计划)
 * @param {*} data
 */
export function saveCaseExistEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/save-case-exist-entity',
    method: 'post',
    data
  })
}

/**
 * 新增应急演练详情(未选计划)
 * @param {*} data
 */
export function saveCaseNoExistEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/save-case-no-exist-entity',
    method: 'post',
    data
  })
}

/**
 * 修改应急演练详情
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/exercise-case/update-info',
    method: 'put',
    data
  })
}
