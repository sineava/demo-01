import request from '@/utils/request'

/**
 * 企业端-删除应急通讯录记录
 * @param {*} params
 */
export function deleteEnterprise(params) {
  return request({
    url: `/wyx-emergency-services/v1/address-book-enterprise/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 企业端-分页查询应急通讯录列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-enterprise/pageList',
    method: 'get',
    params
  })
}

/**
 * 企业端-应急通讯录详情查询
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-enterprise/query',
    method: 'get',
    params
  })
}

/**
 * 企业端-新增应急通讯录记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-enterprise/saveEntity',
    method: 'post',
    data
  })
}

/**
 * 企业端-修改应急通讯录记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-enterprise/updateById',
    method: 'put',
    data
  })
}
