import request from '@/utils/request'

/**
 * 移除节假日上报数据
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/s-report/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 节假日上报分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/s-report/page-list',
    method: 'get',
    params
  })
}

/**
 * 节假日上报详情
 * @param {*} params
 */
export function queryInfo(params) {
  return request({
    url: '/wyx-channel-services/v1/s-report/query-info',
    method: 'get',
    params
  })
}

/**
 * 节假日数据上报
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/s-report/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改节假日上报数据
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/s-report/update-info',
    method: 'put',
    data
  })
}
