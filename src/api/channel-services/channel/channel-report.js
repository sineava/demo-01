import request from '@/utils/request'

/**
 * 删除上传要求
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/channel-report/delete-info/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询-上传要求列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/channel-report/page-list',
    method: 'get',
    params
  })
}

/**
 * 上传要求-详情查询
 * @param {*} params
 */
export function queryInfo(params) {
  return request({
    url: '/wyx-channel-services/v1/channel-report/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增上传要求
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/channel-report/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改上传要求
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/channel-report/update-info',
    method: 'put',
    data
  })
}
