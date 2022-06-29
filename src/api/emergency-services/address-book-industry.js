import request from '@/utils/request'

/**
 * 行业端-删除应急通讯录记录
 * @param {*} params
 */
export function deleteIndustry(params) {
  return request({
    url: `/wyx-emergency-services/v1/address-book-industry/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 行业端-分页查询应急通讯录列表
 * @param {*} params
 */
export function getPageList(params) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-industry/pageList',
    method: 'get',
    params
  })
}

/**
 * 行业端-应急通讯录详情查询
 * @param {*} params
 */
export function queryDetail(params) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-industry/query',
    method: 'get',
    params
  })
}

/**
 * 行业端-新增应急通讯录记录
 * @param {*} data
 */
export function saveEntity(data) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-industry/saveEntity',
    method: 'post',
    data
  })
}

/**
 * 行业端-修改应急通讯录记录
 * @param {*} data
 */
export function updateById(data) {
  return request({
    url: '/wyx-emergency-services/v1/address-book-industry/updateById',
    method: 'put',
    data
  })
}
