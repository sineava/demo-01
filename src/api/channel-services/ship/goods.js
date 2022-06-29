import request from '@/utils/request'

/**
 * 删除货物信息
 * @param {*} params
 */
export function deleteInfo(params) {
  return request({
    url: `/wyx-channel-services/v1/goods/delete/${params.id}`,
    method: 'delete'
  })
}

/**
 * 模糊查询货物信息
 * @param {*} params
 */
export function selectLike(params) {
  return request({
    url: '/wyx-channel-services/v1/goods/like-name-list',
    method: 'get',
    params
  })
}

/**
 * 分页查询货物信息
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-channel-services/v1/goods/page-list',
    method: 'get',
    params
  })
}

/**
 * 新增货物信息
 * @param {*} data
 */
export function saveInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/goods/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改货物信息
 * @param {*} data
 */
export function updateInfo(data) {
  return request({
    url: '/wyx-channel-services/v1/goods/update-info',
    method: 'put',
    data
  })
}

/**
 * 查询所有货物分类列表
 */
export function getGoodsList() {
  return request({
    url: '/wyx-channel-services/v1/goods/type-list',
    method: 'get'
  })
}
