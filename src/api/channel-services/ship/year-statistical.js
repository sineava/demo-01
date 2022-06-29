import request from '@/utils/request'

/**
 * 删除船闸通航统计
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/year-statistical/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 船闸通行情况统计-年列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/year-statistical/page-List',
    method: 'get',
    params
  })
}

/**
 * 船闸通行情况统计-月列表
 * @param {*} params
 */
export function getMonthInfo(params) {
  return request({
    url: '/wyx-channel-services/v1/year-statistical/query-info',
    method: 'get',
    params
  })
}

/**
 * 船闸通行情况统计-年报表
 * @param {*} params
 */
export function getYearInfo(params) {
  return request({
    url: '/wyx-channel-services/v1/year-statistical/query-year-info',
    method: 'get',
    params
  })
}

/**
 * 添加船闸通航统计
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/year-statistical/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改船闸通航统计
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/year-statistical/update-info',
    method: 'put',
    data
  })
}
