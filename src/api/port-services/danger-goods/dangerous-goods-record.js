import request from '@/utils/request'

/**
 * 添加港口危险货物存量货物记录表
 * @param {*} data
 */
export function addGoods(data) {
  return request({
    url: '/port-services/v1/dangerous-goods-record/add',
    method: 'post',
    data
  })
}

/**
 * 删除港口危险货物存量货物记录表
 * @param {*} params
 */
export function deleteGoods(params) {
  return request({
    url: `/port-services/v1/dangerous-goods-record/delete/${params.id}`,
    method: 'delete',
    params
  })
}

/**
 * 获取当前货物清单存量信息 添加或者修改时必须要调用
 * @param {*} params
 */
export function getGoods(params) {
  return request({
    url: `/port-services/v1/dangerous-goods-record/get-stock-info/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 危险货物存量货物记录信息详情（通用）
 * @param {*} params
 */
export function getDetail(params) {
  return request({
    url: `/port-services/v1/dangerous-goods-record/get/${params.id}`,
    method: 'get',
    params
  })
}

/**
 * 分页查询港口危险货物存量货物记录表（通用）
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/port-services/v1/dangerous-goods-record/list',
    method: 'get',
    params
  })
}

/**
 * 综合查询-港口危险货物存量货物记录表
 * @param {*} params
 */
export function getInList(params) {
  return request({
    url: '/port-services/v1/dangerous-goods-record/integrated-query-page',
    method: 'get',
    params
  })
}

/**
 * 修改 港口危险货物存量货物记录表
 * @param {*} data
 */
export function updateGoods(data) {
  return request({
    url: '/port-services/v1/dangerous-goods-record/update',
    method: 'post',
    data
  })
}
