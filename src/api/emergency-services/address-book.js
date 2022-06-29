import request from '@/utils/request'

/**
 * 删除应急通讯录记录
 * @param {*} params
 */
export function deleteBook(params) {
  return request({
    url: `/wyx-emergency-services/v1/address-book/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 分页查询应急通讯录列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/address-book/page-list',
    method: 'get',
    params
  })
}

/**
 * 应急通讯录详情查询
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/address-book/query-info',
    method: 'get',
    params
  })
}

/**
 * 新增应急通讯录记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/address-book/save-info',
    method: 'post',
    data
  })
}

/**
 * 修改应急通讯录记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/address-book/update-info',
    method: 'put',
    data
  })
}
