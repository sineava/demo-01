import request from '@/utils/request'

/**
 * 节假日上报分页查询
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/period/page-list',
    method: 'get',
    params
  })
}

/**
 * 审批信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/period/update-info',
    method: 'put',
    data
  })
}
