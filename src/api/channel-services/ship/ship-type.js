import request from '@/utils/request'

/**
 * 删除船舶分类信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/ship-type/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 模糊查询船舶分类列表
 * @param {*} params
 */
export function selectLikeShipCategory(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type/like-name-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询船舶分类信息
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/ship-type/page-list',
    method: 'get',
    params
  })
}

/**
 * 新增船舶分类信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/ship-type/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改船舶分类信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/ship-type/update-info',
    method: 'put',
    data
  })
}
