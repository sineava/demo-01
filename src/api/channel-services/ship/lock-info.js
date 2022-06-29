import request from '@/utils/request'

/**
 * 删除船舶过闸信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/lock-info/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 船舶过闸-分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/lock-info/page-list',
    method: 'get',
    params
  })
}

/**
 * 过闸信息-闸机信息详情查询
 * @param {*} params
 */
export function getMachineDetail(params) {
  return request({
    url: '/wyx-channel-services/v1/lock-info/query-lock-age-info',
    method: 'get',
    params
  })
}

/**
 * 过闸信息-船舶详情
 * @param {*} params
 */
export function getShipDetail(params) {
  return request({
    url: '/wyx-channel-services/v1/lock-info/query-lock-ship-info',
    method: 'get',
    params
  })
}

/**
 * 新建船舶过闸信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/lock-info/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改船舶过闸信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/lock-info/update-info',
    method: 'put',
    data
  })
}
