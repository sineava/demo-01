import request from '@/utils/request'

/**
 * @description 公务船舶-删除
 */
export function deleteInfo(id) {
  return request({
    url: `/ship-inspection/v1/official-business-ship/delete-info/${id}`,
    method: 'delete'
  })
}

/**
 * @description 公务船舶-分页数据
 */
export function getPageList(params) {
  return request({
    url: `/ship-inspection/v1/official-business-ship/page-list`,
    method: 'get',
    params
  })
}

/**
 * @description 公务船舶-详情
 */
export function getInfo(params) {
  return request({
    url: `/ship-inspection/v1/official-business-ship/query-info`,
    method: 'get',
    params
  })
}

/**
 * @description 公务船舶-保存
 */
export function addInfo(data) {
  return request({
    url: `/ship-inspection/v1/official-business-ship/save-info`,
    method: 'post',
    data
  })
}

/**
 * @description 公务船舶-修改
 */
export function updateInfo(data) {
  return request({
    url: `/ship-inspection/v1/official-business-ship/update-info`,
    method: 'put',
    data
  })
}