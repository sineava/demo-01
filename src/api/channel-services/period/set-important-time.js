import request from '@/utils/request'

/**
 * 删除节假日记录
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/set-important-time/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 手动执行任务
 * @param {*} params
 */
export function manualPush(params) {
  return request({
    url: '/wyx-channel-services/v1/set-important-time/manual-push',
    method: 'get',
    params
  })
}

/**
 * 分页查询节假日列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/set-important-time/page-list',
    method: 'get',
    params
  })
}

/**
 * 新增节假日信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/set-important-time/save-info',
    method: 'post',
    data
  })
}

/**
 * 查询定时任务列表
 * @param {*} params
 */
export function selectJobs(params) {
  return request({
    url: '/wyx-channel-services/v1/set-important-time/select-jobs',
    method: 'get',
    params
  })
}

/**
 * 修改重要时段信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/set-important-time/update-info',
    method: 'put',
    data
  })
}
