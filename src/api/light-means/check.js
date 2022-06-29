import request from '@/utils/request'

/**
 * 获取盘点计划列表
 * @param {*} params
 */
export function getList(params) {
  return request({
    url: '/ship-inspection/v1/assets-inventory-copy/query-page',
    method: 'get',
    params
  })
}
/**
 * 获取盘点计划计划详情
 * @param {*} params
 */
export function getInventory(params) {
  return request({
    url: '/ship-inspection/v1/assets-inventory-copy/query-info',
    method: 'get',
    params
  })
}
/**
 * 获取盘点计划计划盘点计划明细卡片信息
 * @param {*} params
 */
export function getInventoryCards(params) {
  return request({
    url: '/ship-inspection/v1/assets-card-copy/inventory-cards-page',
    method: 'get',
    params
  })
}

/**
 * 添加盘点计划
 * @param {*} params
 */
export function addInventory(data) {
  return request({
    url: '/ship-inspection/v1/assets-inventory-copy/insert-info',
    method: 'post',
    data
  })
}

/**
 * 修改盘点计划
 * @param {*} params
 */
export function putInventory(data) {
  return request({
    url: '/ship-inspection/v1/assets-inventory-copy/update-info',
    method: 'put',
    data
  })
}

/**
 * 删除盘点计划
 * @param {*} params
 */
export function delinventory(data) {
  return request({
    url: `/ship-inspection/v1/assets-inventory-copy/delete-info/${data.id}`,
    method: 'DELETE',
    data
  })
}

/**
 * 完成盘点
 * @param {*} params
 */
export function completeInventory(data) {
  return request({
    url: '/ship-inspection/v1/assets-inventory-copy/complete-info',
    method: 'put',
    data
  })
}

/**
 * 盘点状态修改
 * @param {*} params
 */
export function stateInventory(data) {
  return request({
    url: '/ship-inspection/v1/assets-inventory-copy/update-state',
    method: 'put',
    data
  })
}

