import request from '@/utils/request'

/**
 * 删除大坝信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/dam/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 模糊查询大坝列表
 * @param {*} params
 */
export function selectLike(params) {
  return request({
    url: '/wyx-channel-services/v1/dam/like-name-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询大坝信息
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/dam/page-list',
    method: 'get',
    params
  })
}

/**
 * 新增大坝信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/dam/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改大坝信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/dam/update-info',
    method: 'put',
    data
  })
}
